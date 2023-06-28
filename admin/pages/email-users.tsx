/** @jsxRuntime classic */
/** @jsx jsx */
// eslint-disable-next-line @typescript-eslint/no-unused-vars
import { jsx } from "@keystone-ui/core";
import { PageContainer } from "@keystone-6/core/admin-ui/components";
import { DatePicker } from "@keystone-ui/fields";
import { Heading } from "@keystone-ui/core";
import { Apartment } from "../../gql/generated/sdk";
import { LoadingDots } from "@keystone-ui/loading";
import { useEffect, useState } from "react";
import { useToasts } from "@keystone-ui/toast";
import { getAllApartments, getUsers, searchApartments, sendPromotionEmailToUsers } from "../../api";
// import Apartments from "../components/search/Apartments";
import Select from "react-select";
import { ApartmentFilters } from "../dto";
import ApartmentResults from "../components/apartment-results";

// interface AmenitiesForFilterModel {
//   id: number;
//   name: string;
// }

// interface ApartmentsListItemProps {
//   apartment: Apartment;
//   index: number;
//   setHoveredApartmentID?: (id?: Apartment["id"]) => void;
// }

export default function Page() {
  const allBeds = Array.from(new Array(5), (_, i) => ({
    value: i,
    label: i === 0 ? "Studio" : `${i} Bed`
  }));

  const allBaths = Array.from(new Array(4), (_, i) => ({
    value: i,
    label: `${i} Bath`
  }));
  // let minPrice = 0;
  const { addToast } = useToasts();
  const [initialLoading, setInitialLoading] = useState(false);
  const [resultsLoading, setResultsLoading] = useState(false);
  const [sendEmailLoading, setSendEmailLoading] = useState(false);
  const [allApartments, setAllApartments] = useState<Apartment[]>([]);
  const [selectedAptIds, setSelectedAptIds] = useState<Map<string, boolean>>(new Map());
  // const [apartments, setApartments] = useState<Apartment[]>([]);
  const [areas, setAreas] = useState<{ value: string; label: string }[]>([]);
  const [selectedFilters, setSelectedFilters] = useState<{
    beds?: { value: number; label: string };
    baths?: { value: number; label: string };
  }>({});
  const [allUsers, setAllUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedUsers, setSelectedUsers] = useState<{ value: string; label: string }[]>([]);
  const [selectedAreas, setSelectedAreas] = useState<{ value: string; label: string }[]>([]);
  const [moveInDate, setMoveInDate] = useState<string>("");
  const [minPrice, setMinPrice] = useState<number | null>(null);
  const [maxPrice, setMaxPrice] = useState<number | null>(null);

  useEffect(() => {
    const setInitialData = async () => {
      setInitialLoading(true);
      const aptRes = await getAllApartments();
      const apts = aptRes?.apartments;
      // const amenities = await getAllAmenities();
      const uniqAreas: { value: string; label: string }[] = [];
      const uniqueAreas = new Set(apts?.map((apartment) => apartment.area) ?? []);
      Array.from(uniqueAreas).forEach((area) => {
        if (area) {
          uniqAreas.push({
            value: area,
            label: area
          });
        }
      });
      setAreas(uniqAreas);

      const mp = allApartments?.reduce((min, apartment) => {
        if (apartment.minPrice && apartment.minPrice < min) {
          min = apartment.minPrice;
        }
        return min;
      }, 0);
      setMinPrice(mp);

      const usersRes = await getUsers();
      const users = usersRes?.users;
      setAllUsers(users?.map((user) => ({ value: user.id, label: user.fullName ?? "" ?? user.email ?? user.phone ?? "" })) ?? []);

      // minPrice =
      //   apts?.reduce((min, apartment) => {
      //     if (apartment.minPrice && apartment.minPrice < min) {
      //       min = apartment.minPrice;
      //     }
      //     return min;
      //   }, 0) ?? 0;

      // setApartments(apts ?? []);
      setInitialLoading(false);
    };

    setInitialData();
  }, []);

  const search = () => {
    const filter: ApartmentFilters = {
      areas: selectedAreas.map((area) => area.value),
      beds: selectedFilters.beds?.value,
      baths: selectedFilters.baths?.value,
      priceFrom: minPrice ?? undefined,
      priceTo: maxPrice ?? undefined
    };
    setResultsLoading(true);

    searchApartments(filter)
      .then((res) => {
        const apts = res?.apartments ?? [];
        const selectedApartmentMap = new Map();
        apts.forEach((apt) => selectedApartmentMap.set(apt.id, false));
        setAllApartments(res?.apartments ?? []);
        setSelectedAptIds(selectedApartmentMap);
        setResultsLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setResultsLoading(false);
      });
  };

  const selectApartment = (id: string) => {
    const newSelectedApartments = new Map(selectedAptIds);
    newSelectedApartments.set(id, !newSelectedApartments.get(id));
    setSelectedAptIds(newSelectedApartments);
  };

  const sendEmail = () => {
    if (initialLoading || resultsLoading || sendEmailLoading) {
      return;
    }
    const selectedApartmentIds = Array.from(selectedAptIds.entries())
      .filter((entry) => entry[1])
      .map((entry) => entry[0]);
    if (selectedApartmentIds.length === 0) {
      addToast({ title: "Please select apartments", tone: "negative" });
      return;
    }
    const selectedApartments = allApartments.filter((apt) => selectedApartmentIds.includes(apt.id));
    if (selectedApartments.filter((apt) => apt.images?.[0]?.cloudinaryImage?.publicUrlTransformed ?? apt.images?.[0]?.url).length == 0) {
      addToast({ title: "No apartments found!", tone: "help" });
      return;
    }
    if (selectedUsers.length === 0) {
      addToast({ title: "Please select users", tone: "negative" });
      return;
    }

    const userIds = selectedUsers.map((user) => user.value);
    const apartmentIds = selectedApartments
      .filter((apt) => apt.images?.[0]?.cloudinaryImage?.publicUrlTransformed ?? apt.images?.[0]?.url)
      .map((apt) => apt.id);

    setSelectedUsers([]);
    setSendEmailLoading(true);
    sendPromotionEmailToUsers({
      userIds,
      apartmentIds,
      beds: selectedFilters.beds?.value,
      baths: selectedFilters.baths?.value,
      location: selectedAreas.map((area) => area.value),
      priceFrom: minPrice ?? undefined,
      priceTo: maxPrice ?? undefined
    })
      .then((res) => {
        if (res.sendPromotionalEmail) {
          addToast({ title: "Emails sent successfully!", tone: "positive" });
        } else {
          addToast({ title: "Something went wrong!", tone: "negative" });
        }
        setSelectedUsers([]);
        setSendEmailLoading(false);
      })
      .catch((err) => {
        console.error(err);
        addToast({ title: "Something went wrong!", tone: "negative" });
        setSendEmailLoading(false);
      });
  };

  if (initialLoading) {
    return (
      <PageContainer header={<Heading type='h3'>{"Email Users"}</Heading>}>
        <LoadingDots label='Loading...' size='large' />
      </PageContainer>
    );
  }

  return (
    <PageContainer header={<Heading type='h3'>{"Email Users"}</Heading>}>
      <div
        style={{
          paddingTop: "1rem",
          paddingBottom: "1rem"
        }}
      >
        <div
          style={{
            // display: "flex",
            // justifyContent: "flex-start",
            display: "grid",
            gridTemplateColumns: "1fr 1fr 1fr 1fr 1fr 1fr 1fr",
            gap: "1rem",
            paddingRight: "1rem"
          }}
        >
          <div>
            Areas
            <Select
              name='areas'
              options={areas}
              isMulti
              value={selectedAreas ?? []}
              onChange={(data) => {
                if (data) {
                  const usrs: { value: string; label: string }[] = [];
                  data.map((d) => {
                    usrs.push({ value: d.value, label: d.label });
                  });
                  setSelectedAreas(usrs);
                }
              }}
              placeholder={"---"}
            />
          </div>
          <div>
            Beds
            <Select
              name='beds'
              options={allBeds}
              value={selectedFilters?.beds}
              onChange={(data) => {
                if (data && typeof data != "string") {
                  setSelectedFilters({ ...selectedFilters, beds: data });
                }
              }}
              placeholder={"---"}
            />
          </div>
          <div>
            Baths
            <Select
              name='baths'
              options={allBaths}
              value={selectedFilters?.baths}
              onChange={(data) => {
                if (data && typeof data != "string") {
                  setSelectedFilters({ ...selectedFilters, baths: data });
                }
              }}
              placeholder={"---"}
            />
          </div>
          <div>
            Move In Date
            <DatePicker onUpdate={setMoveInDate} value={moveInDate} onClear={() => setMoveInDate("")} />
          </div>
          <div>
            Min Price
            <input
              style={{
                border: "1px solid #ccc",
                height: "2.3rem",

                width: "75%",
                margin: "auto",
                borderRadius: "5px"
              }}
              type='number'
              value={minPrice ?? undefined}
              onChange={(e) => {
                setMinPrice(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value));
              }}
              placeholder='Min'
            />
          </div>
          <div>
            Max Price
            <input
              style={{
                border: "1px solid #ccc",
                height: "2.3rem",

                width: "75%",
                margin: "auto",
                borderRadius: "5px"
              }}
              type='number'
              value={maxPrice ?? undefined}
              onChange={(e) => {
                setMaxPrice(isNaN(Number(e.target.value)) ? 0 : Number(e.target.value));
              }}
              placeholder='Max'
            />
          </div>
          <div
            style={{
              paddingTop: "1.4rem"
            }}
          >
            <button
              onClick={search}
              style={{
                display: "block",
                cursor: "pointer",
                backgroundColor: "#2563eb",
                color: "white",
                borderRadius: "5px",
                padding: "0.5rem 1rem"
              }}
            >
              Search
            </button>
          </div>
        </div>
        <br />
        <div
          style={{
            display: "flex",
            justifyContent: "flex-start",
            gap: "2rem"
          }}
        >
          <div
            style={{
              minWidth: "40%"
            }}
          >
            <Select
              name='users'
              options={allUsers}
              isMulti
              value={selectedUsers}
              onChange={(data) => {
                if (data) {
                  const usrs: { value: string; label: string }[] = [];
                  data.map((d) => {
                    usrs.push({ value: d.value, label: d.label });
                  });
                  setSelectedUsers(usrs);
                }
              }}
              placeholder={"Select Users"}
            />
          </div>
          <button
            onClick={sendEmail}
            style={{
              display: "block",
              cursor: "pointer",
              backgroundColor: "#2563eb",
              color: "white",
              borderRadius: "5px",
              padding: "5px 10px"
            }}
            disabled={selectedUsers.length === 0 || resultsLoading || initialLoading || sendEmailLoading}
          >
            Send Email
          </button>
        </div>
      </div>
      {resultsLoading ? (
        <LoadingDots label='Fetching results' />
      ) : (
        <ApartmentResults
          allApartments={allApartments.filter((apt) => apt.images?.[0]?.cloudinaryImage?.publicUrlTransformed ?? apt.images?.[0]?.url)}
          selectedApartments={selectedAptIds}
          selectApartment={selectApartment}
        />
      )}
    </PageContainer>
  );
}
