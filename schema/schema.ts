import { Favorite, Search, User, UserPasswordCreateToken, Role } from "./lists/user-lists";
import { Rental } from "./lists/rentals";
import { Apartment, ApartmentImage, FloorPlan, Amenity, Unit } from "./lists/content-lists";
import { Enquiry } from "./lists/customer-lists";

export { extendGraphqlSchema } from "./gql-extension";
export const lists = {
  Enquiry,
  User,
  Apartment,
  ApartmentImage,
  FloorPlan,
  Rental,
  Favorite,
  Search,
  Amenity,
  UserPasswordCreateToken,
  Role,
  Unit
};
