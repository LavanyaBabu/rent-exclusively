import { User, Enquiry, Apartment } from "@prisma/client";
import axios from "axios";
import { MutationCreateUserArgs } from "../../gql/generated/sdk";

const EVENTS_URL = "https://api.followupboss.com/v1/events";
const PEOPLE_URL = "https://api.followupboss.com/v1/people";
const WEBHOOKS_URL = "https://api.followupboss.com/v1/webhooks";
const API_KEY = "fka_0fGcew81yUWBHykqq3Py8W4Xwkx9GkqELq";
// const X_SYSTEM = "RentExclusively";
// const X_SYSTEM_KEY = "ed08882d6b153a0d900e9dc9cde25830";

export type EventsPayload = {
  source: string;
  system: string;
  type:
    | "Registration"
    | "Inquiry"
    | "Property Inquiry"
    | "General Inquiry"
    | "Viewed Property"
    | "Saved Property"
    | "Property Search"
    | "Saved Property Search";
  message: string;
  description: string;
  person: Person;
  property?: Property;
  propertySearch?: PropertySearch;
  pageTitle?: string; // This field is to be used with the "Viewed Page" event type and indicates the title of the page viewed. Example "Contact Us"
  pageUrl?: string; // This field is to be used with the Viewed Page event type and indicates the url of the page viewed. Example "http://www.cltrealestate.com/contactus"
  pageDuration?: number; // This field is to be used with the Viewed Page event type and indicates the duration of the visitor on the page viewed given in seconds.
  pageReferrer?: string; // This field is to be used with the Viewed Page event type and indicates the referrer url where the visitor came from. Example https://www.google.com.
};

type Property = {
  street: string;
  city: string;
  state: string;
  code: string;
  country: string;
  price?: number; // The asking price or price estimate for the property
  url: string; // A URL for the property provided by the lead source
  bedrooms?: number;
  bathrooms?: number;
  type: string; //A freeform description of property type (e.g. "Bungalow" or "Apartment")
  area?: number; // Area of the property in sqft.
};

export type PropertySearch = {
  type?: string; // The type of property the contact was searching for. Example Residential, Lot, Apartment
  neighborhood?: string; // The contact was looking for properties in this neighborhood
  city?: string; // The contact was looking for properties in this city
  state?: string; // The contact was looking for properties in this state
  country?: string; // The contact was looking for properties in this country
  minPrice?: number; // The minimum price the contact was looking for
  maxPrice?: number; // The maximum price the contact was looking for
  minBedrooms?: number; // The minimum number of bedrooms the contact was looking for
  maxBedrooms?: number; // The maximum number of bedrooms the contact was looking for
  minBathrooms?: number; // The minimum number of bathrooms the contact was looking for
  maxBathrooms?: number; // The maximum number of bathrooms the contact was looking for
};

export type Person = {
  contacted?: boolean;
  emails?: Array<{
    isPrimary: boolean;
    value: string;
    type: string;
  }>;
  phones?: Array<{
    isPrimary: boolean;
    value: string;
    type: string;
  }>;
  addresses?: {
    n: {
      type: string;
      street: string;
      city: string;
      state: string;
      code: string;
      country: string;
    };
  };
  tags?: Array<string>;
  firstName?: string;
  lastName?: string;
  source?: string;
  id?: number | null;
  sourceUrl?: string;
  assignedTo?: string;
  assignedUserId?: number;
  stage?: "Lead" | "Trash";
};

const getPersonFromUser = (user: User): Person => {
  return {
    contacted: false,
    emails: [
      {
        isPrimary: true,
        value: user.email,
        type: "work"
      }
    ],
    phones: [
      {
        isPrimary: true,
        value: user.phone,
        type: "work"
      }
    ],
    tags: ["RentExclusively"],
    firstName: user.firstName,
    lastName: user.lastName,
    source: "rentexclusively.com",
    sourceUrl: "https://admin.rentexclusively.com/users/" + user.id,
    stage: "Lead",
    id: user.followUpBossId
  };
};

export const getUsersFromPersonIds = async (ids: string[]): Promise<Person[]> => {
  try {
    const people = await axios.get(PEOPLE_URL + "?id=" + ids.join(","), {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64")
      }
    });
    return people.data.people;
  } catch (error) {
    console.error(error);
    return [];
  }
};

export const getUserFromPerson = (person: Person): MutationCreateUserArgs => {
  return {
    data: {
      email: person.emails?.[0].value as string,
      firstName: person.firstName as string,
      lastName: person.lastName as string,
      followUpBossId: person.id as number,
      phone: person.phones?.[0].value as string
    }
  };
};

const getPropertyFromApartment = (apartment: Apartment): Property => {
  return {
    street: apartment.street,
    city: apartment.city,
    state: apartment.state,
    code: apartment.zip,
    country: "USA",
    url: "https://rentexclusively.com/apartments/" + apartment.id,
    type: "Apartment"
  };
};

export const registerUser = async (user: User): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Registration",
    message: "New user registration",
    description: "New user registration",
    person: getPersonFromUser(user)
  };

  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering user in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerContactUsEnquiry = async (enq: Enquiry, user: User): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "General Inquiry",
    message: enq.message,
    description: "User contact us enquiry",
    person: getPersonFromUser(user)
  };

  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering enquiry in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerEnquiry = async (enq: Enquiry, user: User, apartment: Apartment): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Property Inquiry",
    message: enq.message,
    description: "User enquiry",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };

  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering enquiry in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerFavorite = async (user: User, apartment: Apartment): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Saved Property",
    message: "User favorited property",
    description: "User favorited property",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering favorite in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerSavedPropertySearch = async (user: User, search: PropertySearch): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Saved Property Search",
    message: "User saved property search",
    description: "User saved property search",
    person: getPersonFromUser(user),
    propertySearch: search
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering property search in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerPropertyView = async (user: User, apartment: Apartment): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Viewed Property",
    message: "User viewed property",
    description: "User viewed property",
    person: getPersonFromUser(user),
    property: getPropertyFromApartment(apartment)
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering favorite in follow up boss");
    console.error(error);
    return null;
  }
};

export const registerPropertySearch = async (user: User, search: PropertySearch): Promise<any> => {
  const payload: EventsPayload = {
    source: "rentexclusively.com",
    system: "rentexclusively.com",
    type: "Property Search",
    message: "User Property Search",
    description: "User Property Search",
    person: getPersonFromUser(user),
    propertySearch: search
  };
  try {
    return await createEvent(payload);
  } catch (error) {
    console.error("Errored out while registering property search in follow up boss");
    console.error(error);
    return null;
  }
};

export const createEvent = async (payload: EventsPayload): Promise<any> => {
  const res = await axios.post(EVENTS_URL, payload, {
    headers: {
      "Content-Type": "application/json",
      Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64")
    }
  });
  return res.data;
};

export const registerWebhooks = async () => {
  try {
    const payload = {
      event: "peopleCreated",
      url: "https://admin.rentexclusively.com/api/callbacks/fub/peopleCreated"
    };
    // look for existing webhooks
    let res = await axios.get(WEBHOOKS_URL + "?system=RentExclusively", {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64"),
        "X-System-Key": "ed08882d6b153a0d900e9dc9cde25830"
      }
    });
    const existingWebhooks = res.data?.webhooks ?? [];
    // check if webhook already exists, url and event and status must be active
    const webhookExists = existingWebhooks.find(
      (webhook: any) => webhook.url === payload.url && webhook.event === payload.event && webhook.status === "Active"
    );
    if (webhookExists) {
      console.log("Webhook already exists");
      return;
    }

    res = await axios.post(WEBHOOKS_URL + "?system=RentExclusively", payload, {
      headers: {
        "Content-Type": "application/json",
        Authorization: "Basic " + Buffer.from(API_KEY + ":").toString("base64"),
        "X-System-Key": "ed08882d6b153a0d900e9dc9cde25830"
      }
    });
    return res.data;
  } catch (error) {
    console.error("Errored out while registering webhooks in follow up boss");
    console.error(error);
    return null;
  }
};
