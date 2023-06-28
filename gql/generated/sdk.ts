import { GraphQLClient } from "graphql-request";
import * as Dom from "graphql-request/dist/types.dom";
import gql from "graphql-tag";
export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
  DateTime: any;
  Decimal: any;
  /** The `JSON` scalar type represents JSON values as specified by [ECMA-404](http://www.ecma-international.org/publications/files/ECMA-ST/ECMA-404.pdf). */
  JSON: any;
  /** The `Upload` scalar type represents a file upload. */
  Upload: any;
};

export type Amenity = {
  __typename?: "Amenity";
  apartments?: Maybe<Array<Apartment>>;
  apartmentsCount?: Maybe<Scalars["Int"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  description?: Maybe<Scalars["String"]>;
  displayName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  image?: Maybe<CloudinaryImage_File>;
  isVerified?: Maybe<Scalars["Boolean"]>;
  name?: Maybe<Scalars["String"]>;
  rawText?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  type?: Maybe<AmenityTypeType>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type AmenityApartmentsArgs = {
  orderBy?: Array<ApartmentOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: ApartmentWhereInput;
};

export type AmenityApartmentsCountArgs = {
  where?: ApartmentWhereInput;
};

export type AmenityCreateInput = {
  apartments?: InputMaybe<ApartmentRelateToManyForCreateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["Upload"]>;
  isVerified?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  rawText?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<AmenityTypeType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type AmenityManyRelationFilter = {
  every?: InputMaybe<AmenityWhereInput>;
  none?: InputMaybe<AmenityWhereInput>;
  some?: InputMaybe<AmenityWhereInput>;
};

export type AmenityOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  displayName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isVerified?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  rawText?: InputMaybe<OrderDirection>;
  source?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type AmenityRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<AmenityWhereUniqueInput>>;
  create?: InputMaybe<Array<AmenityCreateInput>>;
};

export type AmenityRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<AmenityWhereUniqueInput>>;
  create?: InputMaybe<Array<AmenityCreateInput>>;
  disconnect?: InputMaybe<Array<AmenityWhereUniqueInput>>;
  set?: InputMaybe<Array<AmenityWhereUniqueInput>>;
};

export enum AmenityTypeType {
  Accessibility = "ACCESSIBILITY",
  Apartment = "APARTMENT",
  Appliances = "APPLIANCES",
  Building = "BUILDING",
  Community = "COMMUNITY",
  Cooling = "COOLING",
  Fitness = "FITNESS",
  Flooring = "FLOORING",
  Heating = "HEATING",
  Laundry = "LAUNDRY",
  Other = "OTHER",
  Outdoor = "OUTDOOR",
  Parking = "PARKING",
  Pets = "PETS",
  Security = "SECURITY"
}

export type AmenityTypeTypeNullableFilter = {
  equals?: InputMaybe<AmenityTypeType>;
  in?: InputMaybe<Array<AmenityTypeType>>;
  not?: InputMaybe<AmenityTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<AmenityTypeType>>;
};

export type AmenityUpdateArgs = {
  data: AmenityUpdateInput;
  where: AmenityWhereUniqueInput;
};

export type AmenityUpdateInput = {
  apartments?: InputMaybe<ApartmentRelateToManyForUpdateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  description?: InputMaybe<Scalars["String"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  image?: InputMaybe<Scalars["Upload"]>;
  isVerified?: InputMaybe<Scalars["Boolean"]>;
  name?: InputMaybe<Scalars["String"]>;
  rawText?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<AmenityTypeType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type AmenityWhereInput = {
  AND?: InputMaybe<Array<AmenityWhereInput>>;
  NOT?: InputMaybe<Array<AmenityWhereInput>>;
  OR?: InputMaybe<Array<AmenityWhereInput>>;
  apartments?: InputMaybe<ApartmentManyRelationFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  description?: InputMaybe<StringFilter>;
  displayName?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  isVerified?: InputMaybe<BooleanFilter>;
  name?: InputMaybe<StringFilter>;
  rawText?: InputMaybe<StringFilter>;
  source?: InputMaybe<StringFilter>;
  type?: InputMaybe<AmenityTypeTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type AmenityWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Apartment = {
  __typename?: "Apartment";
  amenities?: Maybe<Array<Amenity>>;
  amenitiesCount?: Maybe<Scalars["Int"]>;
  apartmentListUrl?: Maybe<Scalars["String"]>;
  area?: Maybe<Scalars["String"]>;
  bathrooms?: Maybe<Scalars["Int"]>;
  bedrooms?: Maybe<Scalars["Int"]>;
  city?: Maybe<Scalars["String"]>;
  commision?: Maybe<Scalars["Float"]>;
  contactName?: Maybe<Scalars["String"]>;
  country?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  daysOnMarket?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  email?: Maybe<Scalars["String"]>;
  favorites?: Maybe<Array<Favorite>>;
  favoritesCount?: Maybe<Scalars["Int"]>;
  floorPlans?: Maybe<Array<FloorPlan>>;
  floorPlansCount?: Maybe<Scalars["Int"]>;
  id: Scalars["ID"];
  images?: Maybe<Array<ApartmentImage>>;
  imagesCount?: Maybe<Scalars["Int"]>;
  lat?: Maybe<Scalars["Float"]>;
  listAgentEmail?: Maybe<Scalars["String"]>;
  listAgentMobile?: Maybe<Scalars["String"]>;
  listAgentName?: Maybe<Scalars["String"]>;
  listPrice?: Maybe<Scalars["Float"]>;
  lng?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
  neighborhood?: Maybe<Scalars["String"]>;
  petFriendly?: Maybe<Scalars["Boolean"]>;
  phone?: Maybe<Scalars["String"]>;
  pool?: Maybe<Scalars["Boolean"]>;
  primaryScraper?: Maybe<ApartmentPrimaryScraperType>;
  propertyType?: Maybe<Scalars["String"]>;
  roomsCount?: Maybe<Scalars["Int"]>;
  sourceId?: Maybe<Scalars["String"]>;
  state?: Maybe<Scalars["String"]>;
  street?: Maybe<Scalars["String"]>;
  unitsCount?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  website?: Maybe<Scalars["String"]>;
  zillowUrl?: Maybe<Scalars["String"]>;
  zip?: Maybe<Scalars["String"]>;
};

export type ApartmentAmenitiesArgs = {
  orderBy?: Array<AmenityOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: AmenityWhereInput;
};

export type ApartmentAmenitiesCountArgs = {
  where?: AmenityWhereInput;
};

export type ApartmentFavoritesArgs = {
  orderBy?: Array<FavoriteOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FavoriteWhereInput;
};

export type ApartmentFavoritesCountArgs = {
  where?: FavoriteWhereInput;
};

export type ApartmentFloorPlansArgs = {
  orderBy?: Array<FloorPlanOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FloorPlanWhereInput;
};

export type ApartmentFloorPlansCountArgs = {
  where?: FloorPlanWhereInput;
};

export type ApartmentImagesArgs = {
  orderBy?: Array<ApartmentImageOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: ApartmentImageWhereInput;
};

export type ApartmentImagesCountArgs = {
  where?: ApartmentImageWhereInput;
};

export type ApartmentCreateInput = {
  amenities?: InputMaybe<AmenityRelateToManyForCreateInput>;
  apartmentListUrl?: InputMaybe<Scalars["String"]>;
  area?: InputMaybe<Scalars["String"]>;
  bathrooms?: InputMaybe<Scalars["Int"]>;
  bedrooms?: InputMaybe<Scalars["Int"]>;
  city?: InputMaybe<Scalars["String"]>;
  commision?: InputMaybe<Scalars["Float"]>;
  contactName?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  daysOnMarket?: InputMaybe<Scalars["Int"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  favorites?: InputMaybe<FavoriteRelateToManyForCreateInput>;
  floorPlans?: InputMaybe<FloorPlanRelateToManyForCreateInput>;
  images?: InputMaybe<ApartmentImageRelateToManyForCreateInput>;
  lat?: InputMaybe<Scalars["Float"]>;
  listAgentEmail?: InputMaybe<Scalars["String"]>;
  listAgentMobile?: InputMaybe<Scalars["String"]>;
  listAgentName?: InputMaybe<Scalars["String"]>;
  listPrice?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  neighborhood?: InputMaybe<Scalars["String"]>;
  petFriendly?: InputMaybe<Scalars["Boolean"]>;
  phone?: InputMaybe<Scalars["String"]>;
  pool?: InputMaybe<Scalars["Boolean"]>;
  primaryScraper?: InputMaybe<ApartmentPrimaryScraperType>;
  propertyType?: InputMaybe<Scalars["String"]>;
  roomsCount?: InputMaybe<Scalars["Int"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<Scalars["String"]>;
  street?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  website?: InputMaybe<Scalars["String"]>;
  zillowUrl?: InputMaybe<Scalars["String"]>;
  zip?: InputMaybe<Scalars["String"]>;
};

export type ApartmentImage = {
  __typename?: "ApartmentImage";
  apartment?: Maybe<Apartment>;
  cloudinaryImage?: Maybe<CloudinaryImage_File>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  default?: Maybe<Scalars["Boolean"]>;
  id: Scalars["ID"];
  imageUrl?: Maybe<Scalars["String"]>;
  isAdminUploaded?: Maybe<Scalars["Boolean"]>;
  order?: Maybe<Scalars["Int"]>;
  sourceKey?: Maybe<Scalars["String"]>;
  type?: Maybe<ApartmentImageTypeType>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url?: Maybe<Scalars["String"]>;
};

export type ApartmentImageCreateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForCreateInput>;
  cloudinaryImage?: InputMaybe<Scalars["Upload"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  default?: InputMaybe<Scalars["Boolean"]>;
  isAdminUploaded?: InputMaybe<Scalars["Boolean"]>;
  order?: InputMaybe<Scalars["Int"]>;
  sourceKey?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ApartmentImageTypeType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type ApartmentImageManyRelationFilter = {
  every?: InputMaybe<ApartmentImageWhereInput>;
  none?: InputMaybe<ApartmentImageWhereInput>;
  some?: InputMaybe<ApartmentImageWhereInput>;
};

export type ApartmentImageOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  default?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  isAdminUploaded?: InputMaybe<OrderDirection>;
  order?: InputMaybe<OrderDirection>;
  sourceKey?: InputMaybe<OrderDirection>;
  type?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
};

export type ApartmentImageRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ApartmentImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ApartmentImageCreateInput>>;
};

export type ApartmentImageRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ApartmentImageWhereUniqueInput>>;
  create?: InputMaybe<Array<ApartmentImageCreateInput>>;
  disconnect?: InputMaybe<Array<ApartmentImageWhereUniqueInput>>;
  set?: InputMaybe<Array<ApartmentImageWhereUniqueInput>>;
};

export enum ApartmentImageTypeType {
  Amenities = "AMENITIES",
  Architecture = "ARCHITECTURE",
  Convertible = "CONVERTIBLE",
  Exteriors = "EXTERIORS",
  Floorplans = "FLOORPLANS",
  Interiors = "INTERIORS",
  Lifestyle = "LIFESTYLE",
  Neighborhood = "NEIGHBORHOOD",
  Onebedroom = "ONEBEDROOM",
  Other = "OTHER",
  Penthouse = "PENTHOUSE",
  Residences = "RESIDENCES",
  Threebedroom = "THREEBEDROOM",
  Twobedroom = "TWOBEDROOM"
}

export type ApartmentImageTypeTypeNullableFilter = {
  equals?: InputMaybe<ApartmentImageTypeType>;
  in?: InputMaybe<Array<ApartmentImageTypeType>>;
  not?: InputMaybe<ApartmentImageTypeTypeNullableFilter>;
  notIn?: InputMaybe<Array<ApartmentImageTypeType>>;
};

export type ApartmentImageUpdateArgs = {
  data: ApartmentImageUpdateInput;
  where: ApartmentImageWhereUniqueInput;
};

export type ApartmentImageUpdateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForUpdateInput>;
  cloudinaryImage?: InputMaybe<Scalars["Upload"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  default?: InputMaybe<Scalars["Boolean"]>;
  isAdminUploaded?: InputMaybe<Scalars["Boolean"]>;
  order?: InputMaybe<Scalars["Int"]>;
  sourceKey?: InputMaybe<Scalars["String"]>;
  type?: InputMaybe<ApartmentImageTypeType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  url?: InputMaybe<Scalars["String"]>;
};

export type ApartmentImageWhereInput = {
  AND?: InputMaybe<Array<ApartmentImageWhereInput>>;
  NOT?: InputMaybe<Array<ApartmentImageWhereInput>>;
  OR?: InputMaybe<Array<ApartmentImageWhereInput>>;
  apartment?: InputMaybe<ApartmentWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  default?: InputMaybe<BooleanFilter>;
  id?: InputMaybe<IdFilter>;
  isAdminUploaded?: InputMaybe<BooleanFilter>;
  order?: InputMaybe<IntNullableFilter>;
  sourceKey?: InputMaybe<StringFilter>;
  type?: InputMaybe<ApartmentImageTypeTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
};

export type ApartmentImageWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type ApartmentManyRelationFilter = {
  every?: InputMaybe<ApartmentWhereInput>;
  none?: InputMaybe<ApartmentWhereInput>;
  some?: InputMaybe<ApartmentWhereInput>;
};

export type ApartmentOrderByInput = {
  apartmentListUrl?: InputMaybe<OrderDirection>;
  area?: InputMaybe<OrderDirection>;
  bathrooms?: InputMaybe<OrderDirection>;
  bedrooms?: InputMaybe<OrderDirection>;
  city?: InputMaybe<OrderDirection>;
  commision?: InputMaybe<OrderDirection>;
  contactName?: InputMaybe<OrderDirection>;
  country?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  daysOnMarket?: InputMaybe<OrderDirection>;
  description?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lat?: InputMaybe<OrderDirection>;
  listAgentEmail?: InputMaybe<OrderDirection>;
  listAgentMobile?: InputMaybe<OrderDirection>;
  listAgentName?: InputMaybe<OrderDirection>;
  listPrice?: InputMaybe<OrderDirection>;
  lng?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  neighborhood?: InputMaybe<OrderDirection>;
  petFriendly?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  pool?: InputMaybe<OrderDirection>;
  primaryScraper?: InputMaybe<OrderDirection>;
  propertyType?: InputMaybe<OrderDirection>;
  roomsCount?: InputMaybe<OrderDirection>;
  sourceId?: InputMaybe<OrderDirection>;
  state?: InputMaybe<OrderDirection>;
  street?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  website?: InputMaybe<OrderDirection>;
  zillowUrl?: InputMaybe<OrderDirection>;
  zip?: InputMaybe<OrderDirection>;
};

export enum ApartmentPrimaryScraperType {
  ApartmentList = "apartmentList",
  Zillow = "zillow"
}

export type ApartmentPrimaryScraperTypeNullableFilter = {
  equals?: InputMaybe<ApartmentPrimaryScraperType>;
  in?: InputMaybe<Array<ApartmentPrimaryScraperType>>;
  not?: InputMaybe<ApartmentPrimaryScraperTypeNullableFilter>;
  notIn?: InputMaybe<Array<ApartmentPrimaryScraperType>>;
};

export type ApartmentRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<ApartmentWhereUniqueInput>>;
  create?: InputMaybe<Array<ApartmentCreateInput>>;
};

export type ApartmentRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<ApartmentWhereUniqueInput>>;
  create?: InputMaybe<Array<ApartmentCreateInput>>;
  disconnect?: InputMaybe<Array<ApartmentWhereUniqueInput>>;
  set?: InputMaybe<Array<ApartmentWhereUniqueInput>>;
};

export type ApartmentRelateToOneForCreateInput = {
  connect?: InputMaybe<ApartmentWhereUniqueInput>;
  create?: InputMaybe<ApartmentCreateInput>;
};

export type ApartmentRelateToOneForUpdateInput = {
  connect?: InputMaybe<ApartmentWhereUniqueInput>;
  create?: InputMaybe<ApartmentCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]>;
};

export type ApartmentUpdateArgs = {
  data: ApartmentUpdateInput;
  where: ApartmentWhereUniqueInput;
};

export type ApartmentUpdateInput = {
  amenities?: InputMaybe<AmenityRelateToManyForUpdateInput>;
  apartmentListUrl?: InputMaybe<Scalars["String"]>;
  area?: InputMaybe<Scalars["String"]>;
  bathrooms?: InputMaybe<Scalars["Int"]>;
  bedrooms?: InputMaybe<Scalars["Int"]>;
  city?: InputMaybe<Scalars["String"]>;
  commision?: InputMaybe<Scalars["Float"]>;
  contactName?: InputMaybe<Scalars["String"]>;
  country?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  daysOnMarket?: InputMaybe<Scalars["Int"]>;
  description?: InputMaybe<Scalars["String"]>;
  email?: InputMaybe<Scalars["String"]>;
  favorites?: InputMaybe<FavoriteRelateToManyForUpdateInput>;
  floorPlans?: InputMaybe<FloorPlanRelateToManyForUpdateInput>;
  images?: InputMaybe<ApartmentImageRelateToManyForUpdateInput>;
  lat?: InputMaybe<Scalars["Float"]>;
  listAgentEmail?: InputMaybe<Scalars["String"]>;
  listAgentMobile?: InputMaybe<Scalars["String"]>;
  listAgentName?: InputMaybe<Scalars["String"]>;
  listPrice?: InputMaybe<Scalars["Float"]>;
  lng?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  neighborhood?: InputMaybe<Scalars["String"]>;
  petFriendly?: InputMaybe<Scalars["Boolean"]>;
  phone?: InputMaybe<Scalars["String"]>;
  pool?: InputMaybe<Scalars["Boolean"]>;
  primaryScraper?: InputMaybe<ApartmentPrimaryScraperType>;
  propertyType?: InputMaybe<Scalars["String"]>;
  roomsCount?: InputMaybe<Scalars["Int"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  state?: InputMaybe<Scalars["String"]>;
  street?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  website?: InputMaybe<Scalars["String"]>;
  zillowUrl?: InputMaybe<Scalars["String"]>;
  zip?: InputMaybe<Scalars["String"]>;
};

export type ApartmentWhereInput = {
  AND?: InputMaybe<Array<ApartmentWhereInput>>;
  NOT?: InputMaybe<Array<ApartmentWhereInput>>;
  OR?: InputMaybe<Array<ApartmentWhereInput>>;
  amenities?: InputMaybe<AmenityManyRelationFilter>;
  apartmentListUrl?: InputMaybe<StringFilter>;
  area?: InputMaybe<StringFilter>;
  bathrooms?: InputMaybe<IntNullableFilter>;
  bedrooms?: InputMaybe<IntNullableFilter>;
  city?: InputMaybe<StringFilter>;
  commision?: InputMaybe<FloatNullableFilter>;
  contactName?: InputMaybe<StringFilter>;
  country?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  daysOnMarket?: InputMaybe<IntNullableFilter>;
  description?: InputMaybe<StringFilter>;
  email?: InputMaybe<StringFilter>;
  favorites?: InputMaybe<FavoriteManyRelationFilter>;
  floorPlans?: InputMaybe<FloorPlanManyRelationFilter>;
  id?: InputMaybe<IdFilter>;
  images?: InputMaybe<ApartmentImageManyRelationFilter>;
  lat?: InputMaybe<FloatNullableFilter>;
  listAgentEmail?: InputMaybe<StringFilter>;
  listAgentMobile?: InputMaybe<StringFilter>;
  listAgentName?: InputMaybe<StringFilter>;
  listPrice?: InputMaybe<FloatNullableFilter>;
  lng?: InputMaybe<FloatNullableFilter>;
  name?: InputMaybe<StringFilter>;
  neighborhood?: InputMaybe<StringFilter>;
  petFriendly?: InputMaybe<BooleanFilter>;
  phone?: InputMaybe<StringFilter>;
  pool?: InputMaybe<BooleanFilter>;
  primaryScraper?: InputMaybe<ApartmentPrimaryScraperTypeNullableFilter>;
  propertyType?: InputMaybe<StringNullableFilter>;
  roomsCount?: InputMaybe<IntNullableFilter>;
  sourceId?: InputMaybe<StringFilter>;
  state?: InputMaybe<StringFilter>;
  street?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  website?: InputMaybe<StringFilter>;
  zillowUrl?: InputMaybe<StringFilter>;
  zip?: InputMaybe<StringFilter>;
};

export type ApartmentWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
  website?: InputMaybe<Scalars["String"]>;
};

export type AuthenticatedItem = User;

export type BooleanFilter = {
  equals?: InputMaybe<Scalars["Boolean"]>;
  not?: InputMaybe<BooleanFilter>;
};

/**
 * Mirrors the formatting options [Cloudinary provides](https://cloudinary.com/documentation/image_transformation_reference).
 * All options are strings as they ultimately end up in a URL.
 */
export type CloudinaryImageFormat = {
  angle?: InputMaybe<Scalars["String"]>;
  aspect_ratio?: InputMaybe<Scalars["String"]>;
  background?: InputMaybe<Scalars["String"]>;
  border?: InputMaybe<Scalars["String"]>;
  color?: InputMaybe<Scalars["String"]>;
  color_space?: InputMaybe<Scalars["String"]>;
  crop?: InputMaybe<Scalars["String"]>;
  default_image?: InputMaybe<Scalars["String"]>;
  delay?: InputMaybe<Scalars["String"]>;
  density?: InputMaybe<Scalars["String"]>;
  dpr?: InputMaybe<Scalars["String"]>;
  effect?: InputMaybe<Scalars["String"]>;
  fetch_format?: InputMaybe<Scalars["String"]>;
  flags?: InputMaybe<Scalars["String"]>;
  format?: InputMaybe<Scalars["String"]>;
  gravity?: InputMaybe<Scalars["String"]>;
  height?: InputMaybe<Scalars["String"]>;
  opacity?: InputMaybe<Scalars["String"]>;
  overlay?: InputMaybe<Scalars["String"]>;
  page?: InputMaybe<Scalars["String"]>;
  /** Rewrites the filename to be this pretty string. Do not include `/` or `.` */
  prettyName?: InputMaybe<Scalars["String"]>;
  quality?: InputMaybe<Scalars["String"]>;
  radius?: InputMaybe<Scalars["String"]>;
  transformation?: InputMaybe<Scalars["String"]>;
  underlay?: InputMaybe<Scalars["String"]>;
  width?: InputMaybe<Scalars["String"]>;
  x?: InputMaybe<Scalars["String"]>;
  y?: InputMaybe<Scalars["String"]>;
  zoom?: InputMaybe<Scalars["String"]>;
};

export type CloudinaryImage_File = {
  __typename?: "CloudinaryImage_File";
  encoding?: Maybe<Scalars["String"]>;
  filename?: Maybe<Scalars["String"]>;
  id?: Maybe<Scalars["ID"]>;
  mimetype?: Maybe<Scalars["String"]>;
  originalFilename?: Maybe<Scalars["String"]>;
  publicUrl?: Maybe<Scalars["String"]>;
  publicUrlTransformed?: Maybe<Scalars["String"]>;
};

export type CloudinaryImage_FilePublicUrlTransformedArgs = {
  transformation?: InputMaybe<CloudinaryImageFormat>;
};

export type CreateEnquiryArgs = {
  apartmentId?: InputMaybe<Scalars["ID"]>;
  email: Scalars["String"];
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  message?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  preferredTime?: InputMaybe<Scalars["DateTime"]>;
};

export type CreateInitialUserInput = {
  email?: InputMaybe<Scalars["String"]>;
  firstName?: InputMaybe<Scalars["String"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  password?: InputMaybe<Scalars["String"]>;
};

export type DateTimeFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type DateTimeNullableFilter = {
  equals?: InputMaybe<Scalars["DateTime"]>;
  gt?: InputMaybe<Scalars["DateTime"]>;
  gte?: InputMaybe<Scalars["DateTime"]>;
  in?: InputMaybe<Array<Scalars["DateTime"]>>;
  lt?: InputMaybe<Scalars["DateTime"]>;
  lte?: InputMaybe<Scalars["DateTime"]>;
  not?: InputMaybe<DateTimeNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["DateTime"]>>;
};

export type DecimalFilter = {
  equals?: InputMaybe<Scalars["Decimal"]>;
  gt?: InputMaybe<Scalars["Decimal"]>;
  gte?: InputMaybe<Scalars["Decimal"]>;
  in?: InputMaybe<Array<Scalars["Decimal"]>>;
  lt?: InputMaybe<Scalars["Decimal"]>;
  lte?: InputMaybe<Scalars["Decimal"]>;
  not?: InputMaybe<DecimalFilter>;
  notIn?: InputMaybe<Array<Scalars["Decimal"]>>;
};

export type Enquiry = {
  __typename?: "Enquiry";
  apartment?: Maybe<Apartment>;
  assignedTo?: Maybe<User>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  message?: Maybe<Scalars["String"]>;
  preferredTime?: Maybe<Scalars["DateTime"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user?: Maybe<User>;
};

export type EnquiryCreateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForCreateInput>;
  assignedTo?: InputMaybe<UserRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  message?: InputMaybe<Scalars["String"]>;
  preferredTime?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type EnquiryManyRelationFilter = {
  every?: InputMaybe<EnquiryWhereInput>;
  none?: InputMaybe<EnquiryWhereInput>;
  some?: InputMaybe<EnquiryWhereInput>;
};

export type EnquiryOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  message?: InputMaybe<OrderDirection>;
  preferredTime?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type EnquiryRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<EnquiryWhereUniqueInput>>;
  create?: InputMaybe<Array<EnquiryCreateInput>>;
};

export type EnquiryRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<EnquiryWhereUniqueInput>>;
  create?: InputMaybe<Array<EnquiryCreateInput>>;
  disconnect?: InputMaybe<Array<EnquiryWhereUniqueInput>>;
  set?: InputMaybe<Array<EnquiryWhereUniqueInput>>;
};

export type EnquiryUpdateArgs = {
  data: EnquiryUpdateInput;
  where: EnquiryWhereUniqueInput;
};

export type EnquiryUpdateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForUpdateInput>;
  assignedTo?: InputMaybe<UserRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  message?: InputMaybe<Scalars["String"]>;
  preferredTime?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type EnquiryWhereInput = {
  AND?: InputMaybe<Array<EnquiryWhereInput>>;
  NOT?: InputMaybe<Array<EnquiryWhereInput>>;
  OR?: InputMaybe<Array<EnquiryWhereInput>>;
  apartment?: InputMaybe<ApartmentWhereInput>;
  assignedTo?: InputMaybe<UserWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  message?: InputMaybe<StringFilter>;
  preferredTime?: InputMaybe<DateTimeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type EnquiryWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type Favorite = {
  __typename?: "Favorite";
  apartment?: Maybe<Apartment>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  updatedAt?: Maybe<Scalars["DateTime"]>;
  user?: Maybe<User>;
};

export type FavoriteCreateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForCreateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type FavoriteManyRelationFilter = {
  every?: InputMaybe<FavoriteWhereInput>;
  none?: InputMaybe<FavoriteWhereInput>;
  some?: InputMaybe<FavoriteWhereInput>;
};

export type FavoriteOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type FavoriteRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<FavoriteWhereUniqueInput>>;
  create?: InputMaybe<Array<FavoriteCreateInput>>;
};

export type FavoriteRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<FavoriteWhereUniqueInput>>;
  create?: InputMaybe<Array<FavoriteCreateInput>>;
  disconnect?: InputMaybe<Array<FavoriteWhereUniqueInput>>;
  set?: InputMaybe<Array<FavoriteWhereUniqueInput>>;
};

export type FavoriteUpdateArgs = {
  data: FavoriteUpdateInput;
  where: FavoriteWhereUniqueInput;
};

export type FavoriteUpdateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForUpdateInput>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type FavoriteWhereInput = {
  AND?: InputMaybe<Array<FavoriteWhereInput>>;
  NOT?: InputMaybe<Array<FavoriteWhereInput>>;
  OR?: InputMaybe<Array<FavoriteWhereInput>>;
  apartment?: InputMaybe<ApartmentWhereInput>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type FavoriteWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type FloatFilter = {
  equals?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<Scalars["Float"]>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatFilter>;
  notIn?: InputMaybe<Array<Scalars["Float"]>>;
};

export type FloatNullableFilter = {
  equals?: InputMaybe<Scalars["Float"]>;
  gt?: InputMaybe<Scalars["Float"]>;
  gte?: InputMaybe<Scalars["Float"]>;
  in?: InputMaybe<Array<Scalars["Float"]>>;
  lt?: InputMaybe<Scalars["Float"]>;
  lte?: InputMaybe<Scalars["Float"]>;
  not?: InputMaybe<FloatNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Float"]>>;
};

export type FloorPlan = {
  __typename?: "FloorPlan";
  apartment?: Maybe<Apartment>;
  bathrooms?: Maybe<Scalars["Float"]>;
  bedrooms?: Maybe<Scalars["Float"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  dataDump?: Maybe<Scalars["JSON"]>;
  floorPlanImage?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  imageUrl?: Maybe<Scalars["String"]>;
  maxPrice?: Maybe<Scalars["Float"]>;
  minPrice?: Maybe<Scalars["Float"]>;
  name?: Maybe<Scalars["String"]>;
  source?: Maybe<Scalars["String"]>;
  sourceId?: Maybe<Scalars["String"]>;
  squareFootage?: Maybe<Scalars["Float"]>;
  squareFootageMax?: Maybe<Scalars["Float"]>;
  title?: Maybe<Scalars["String"]>;
  units?: Maybe<Array<Unit>>;
  unitsCount?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type FloorPlanUnitsArgs = {
  orderBy?: Array<UnitOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: UnitWhereInput;
};

export type FloorPlanUnitsCountArgs = {
  where?: UnitWhereInput;
};

export type FloorPlanCreateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForCreateInput>;
  bathrooms?: InputMaybe<Scalars["Float"]>;
  bedrooms?: InputMaybe<Scalars["Float"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  dataDump?: InputMaybe<Scalars["JSON"]>;
  floorPlanImage?: InputMaybe<Scalars["String"]>;
  maxPrice?: InputMaybe<Scalars["Float"]>;
  minPrice?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  squareFootage?: InputMaybe<Scalars["Float"]>;
  squareFootageMax?: InputMaybe<Scalars["Float"]>;
  title?: InputMaybe<Scalars["String"]>;
  units?: InputMaybe<UnitRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type FloorPlanManyRelationFilter = {
  every?: InputMaybe<FloorPlanWhereInput>;
  none?: InputMaybe<FloorPlanWhereInput>;
  some?: InputMaybe<FloorPlanWhereInput>;
};

export type FloorPlanOrderByInput = {
  bathrooms?: InputMaybe<OrderDirection>;
  bedrooms?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  floorPlanImage?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  maxPrice?: InputMaybe<OrderDirection>;
  minPrice?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  source?: InputMaybe<OrderDirection>;
  sourceId?: InputMaybe<OrderDirection>;
  squareFootage?: InputMaybe<OrderDirection>;
  squareFootageMax?: InputMaybe<OrderDirection>;
  title?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type FloorPlanRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<FloorPlanWhereUniqueInput>>;
  create?: InputMaybe<Array<FloorPlanCreateInput>>;
};

export type FloorPlanRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<FloorPlanWhereUniqueInput>>;
  create?: InputMaybe<Array<FloorPlanCreateInput>>;
  disconnect?: InputMaybe<Array<FloorPlanWhereUniqueInput>>;
  set?: InputMaybe<Array<FloorPlanWhereUniqueInput>>;
};

export type FloorPlanRelateToOneForCreateInput = {
  connect?: InputMaybe<FloorPlanWhereUniqueInput>;
  create?: InputMaybe<FloorPlanCreateInput>;
};

export type FloorPlanRelateToOneForUpdateInput = {
  connect?: InputMaybe<FloorPlanWhereUniqueInput>;
  create?: InputMaybe<FloorPlanCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]>;
};

export type FloorPlanUpdateArgs = {
  data: FloorPlanUpdateInput;
  where: FloorPlanWhereUniqueInput;
};

export type FloorPlanUpdateInput = {
  apartment?: InputMaybe<ApartmentRelateToOneForUpdateInput>;
  bathrooms?: InputMaybe<Scalars["Float"]>;
  bedrooms?: InputMaybe<Scalars["Float"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  dataDump?: InputMaybe<Scalars["JSON"]>;
  floorPlanImage?: InputMaybe<Scalars["String"]>;
  maxPrice?: InputMaybe<Scalars["Float"]>;
  minPrice?: InputMaybe<Scalars["Float"]>;
  name?: InputMaybe<Scalars["String"]>;
  source?: InputMaybe<Scalars["String"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  squareFootage?: InputMaybe<Scalars["Float"]>;
  squareFootageMax?: InputMaybe<Scalars["Float"]>;
  title?: InputMaybe<Scalars["String"]>;
  units?: InputMaybe<UnitRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type FloorPlanWhereInput = {
  AND?: InputMaybe<Array<FloorPlanWhereInput>>;
  NOT?: InputMaybe<Array<FloorPlanWhereInput>>;
  OR?: InputMaybe<Array<FloorPlanWhereInput>>;
  apartment?: InputMaybe<ApartmentWhereInput>;
  bathrooms?: InputMaybe<FloatFilter>;
  bedrooms?: InputMaybe<FloatFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  floorPlanImage?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  maxPrice?: InputMaybe<FloatNullableFilter>;
  minPrice?: InputMaybe<FloatFilter>;
  name?: InputMaybe<StringFilter>;
  source?: InputMaybe<StringFilter>;
  sourceId?: InputMaybe<StringFilter>;
  squareFootage?: InputMaybe<FloatFilter>;
  squareFootageMax?: InputMaybe<FloatFilter>;
  title?: InputMaybe<StringFilter>;
  units?: InputMaybe<UnitManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type FloorPlanWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type IdFilter = {
  equals?: InputMaybe<Scalars["ID"]>;
  gt?: InputMaybe<Scalars["ID"]>;
  gte?: InputMaybe<Scalars["ID"]>;
  in?: InputMaybe<Array<Scalars["ID"]>>;
  lt?: InputMaybe<Scalars["ID"]>;
  lte?: InputMaybe<Scalars["ID"]>;
  not?: InputMaybe<IdFilter>;
  notIn?: InputMaybe<Array<Scalars["ID"]>>;
};

export type IntFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type IntNullableFilter = {
  equals?: InputMaybe<Scalars["Int"]>;
  gt?: InputMaybe<Scalars["Int"]>;
  gte?: InputMaybe<Scalars["Int"]>;
  in?: InputMaybe<Array<Scalars["Int"]>>;
  lt?: InputMaybe<Scalars["Int"]>;
  lte?: InputMaybe<Scalars["Int"]>;
  not?: InputMaybe<IntNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["Int"]>>;
};

export type KeystoneAdminMeta = {
  __typename?: "KeystoneAdminMeta";
  enableSessionItem: Scalars["Boolean"];
  enableSignout: Scalars["Boolean"];
  list?: Maybe<KeystoneAdminUiListMeta>;
  lists: Array<KeystoneAdminUiListMeta>;
};

export type KeystoneAdminMetaListArgs = {
  key: Scalars["String"];
};

export type KeystoneAdminUiFieldMeta = {
  __typename?: "KeystoneAdminUIFieldMeta";
  createView: KeystoneAdminUiFieldMetaCreateView;
  customViewsIndex?: Maybe<Scalars["Int"]>;
  description?: Maybe<Scalars["String"]>;
  fieldMeta?: Maybe<Scalars["JSON"]>;
  isFilterable: Scalars["Boolean"];
  isOrderable: Scalars["Boolean"];
  itemView?: Maybe<KeystoneAdminUiFieldMetaItemView>;
  label: Scalars["String"];
  listView: KeystoneAdminUiFieldMetaListView;
  path: Scalars["String"];
  search?: Maybe<QueryMode>;
  viewsIndex: Scalars["Int"];
};

export type KeystoneAdminUiFieldMetaItemViewArgs = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type KeystoneAdminUiFieldMetaCreateView = {
  __typename?: "KeystoneAdminUIFieldMetaCreateView";
  fieldMode: KeystoneAdminUiFieldMetaCreateViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaCreateViewFieldMode {
  Edit = "edit",
  Hidden = "hidden"
}

export type KeystoneAdminUiFieldMetaItemView = {
  __typename?: "KeystoneAdminUIFieldMetaItemView";
  fieldMode?: Maybe<KeystoneAdminUiFieldMetaItemViewFieldMode>;
};

export enum KeystoneAdminUiFieldMetaItemViewFieldMode {
  Edit = "edit",
  Hidden = "hidden",
  Read = "read"
}

export type KeystoneAdminUiFieldMetaListView = {
  __typename?: "KeystoneAdminUIFieldMetaListView";
  fieldMode: KeystoneAdminUiFieldMetaListViewFieldMode;
};

export enum KeystoneAdminUiFieldMetaListViewFieldMode {
  Hidden = "hidden",
  Read = "read"
}

export type KeystoneAdminUiListMeta = {
  __typename?: "KeystoneAdminUIListMeta";
  description?: Maybe<Scalars["String"]>;
  fields: Array<KeystoneAdminUiFieldMeta>;
  hideCreate: Scalars["Boolean"];
  hideDelete: Scalars["Boolean"];
  initialColumns: Array<Scalars["String"]>;
  initialSort?: Maybe<KeystoneAdminUiSort>;
  isHidden: Scalars["Boolean"];
  itemQueryName: Scalars["String"];
  key: Scalars["String"];
  label: Scalars["String"];
  labelField: Scalars["String"];
  listQueryName: Scalars["String"];
  pageSize: Scalars["Int"];
  path: Scalars["String"];
  plural: Scalars["String"];
  singular: Scalars["String"];
};

export type KeystoneAdminUiSort = {
  __typename?: "KeystoneAdminUISort";
  direction: KeystoneAdminUiSortDirection;
  field: Scalars["String"];
};

export enum KeystoneAdminUiSortDirection {
  Asc = "ASC",
  Desc = "DESC"
}

export type KeystoneMeta = {
  __typename?: "KeystoneMeta";
  adminMeta: KeystoneAdminMeta;
};

export type Mutation = {
  __typename?: "Mutation";
  /** Assign Enquiry To Logged In User */
  assignEnquiryToUser?: Maybe<Enquiry>;
  authenticateUserWithPassword?: Maybe<UserAuthenticationWithPasswordResult>;
  createAmenities?: Maybe<Array<Maybe<Amenity>>>;
  createAmenity?: Maybe<Amenity>;
  createApartment?: Maybe<Apartment>;
  createApartmentImage?: Maybe<ApartmentImage>;
  createApartmentImages?: Maybe<Array<Maybe<ApartmentImage>>>;
  createApartments?: Maybe<Array<Maybe<Apartment>>>;
  createEnquiries?: Maybe<Array<Maybe<Enquiry>>>;
  createEnquiry?: Maybe<Enquiry>;
  createFavorite?: Maybe<Favorite>;
  createFavorites?: Maybe<Array<Maybe<Favorite>>>;
  createFloorPlan?: Maybe<FloorPlan>;
  createFloorPlans?: Maybe<Array<Maybe<FloorPlan>>>;
  createInitialUser: UserAuthenticationWithPasswordSuccess;
  createRental?: Maybe<Rental>;
  createRentals?: Maybe<Array<Maybe<Rental>>>;
  createRole?: Maybe<Role>;
  createRoles?: Maybe<Array<Maybe<Role>>>;
  createSearch?: Maybe<Search>;
  createSearches?: Maybe<Array<Maybe<Search>>>;
  createUnit?: Maybe<Unit>;
  createUnits?: Maybe<Array<Maybe<Unit>>>;
  createUser?: Maybe<User>;
  /** Create Enquiry */
  createUserEnquiry?: Maybe<Enquiry>;
  createUserPasswordCreateToken?: Maybe<UserPasswordCreateToken>;
  createUserPasswordCreateTokens?: Maybe<Array<Maybe<UserPasswordCreateToken>>>;
  createUsers?: Maybe<Array<Maybe<User>>>;
  deleteAmenities?: Maybe<Array<Maybe<Amenity>>>;
  deleteAmenity?: Maybe<Amenity>;
  deleteApartment?: Maybe<Apartment>;
  deleteApartmentImage?: Maybe<ApartmentImage>;
  deleteApartmentImages?: Maybe<Array<Maybe<ApartmentImage>>>;
  deleteApartments?: Maybe<Array<Maybe<Apartment>>>;
  deleteEnquiries?: Maybe<Array<Maybe<Enquiry>>>;
  deleteEnquiry?: Maybe<Enquiry>;
  deleteFavorite?: Maybe<Favorite>;
  deleteFavorites?: Maybe<Array<Maybe<Favorite>>>;
  deleteFloorPlan?: Maybe<FloorPlan>;
  deleteFloorPlans?: Maybe<Array<Maybe<FloorPlan>>>;
  deleteRental?: Maybe<Rental>;
  deleteRentals?: Maybe<Array<Maybe<Rental>>>;
  deleteRole?: Maybe<Role>;
  deleteRoles?: Maybe<Array<Maybe<Role>>>;
  deleteSearch?: Maybe<Search>;
  deleteSearches?: Maybe<Array<Maybe<Search>>>;
  deleteUnit?: Maybe<Unit>;
  deleteUnits?: Maybe<Array<Maybe<Unit>>>;
  deleteUser?: Maybe<User>;
  deleteUserPasswordCreateToken?: Maybe<UserPasswordCreateToken>;
  deleteUserPasswordCreateTokens?: Maybe<Array<Maybe<UserPasswordCreateToken>>>;
  deleteUsers?: Maybe<Array<Maybe<User>>>;
  endSession: Scalars["Boolean"];
  followUpBossPeopleCreated?: Maybe<Scalars["Boolean"]>;
  redeemUserPasswordResetToken?: Maybe<RedeemUserPasswordResetTokenResult>;
  registerPropertySearched?: Maybe<Scalars["Boolean"]>;
  /** Follow Up Boss */
  registerPropertyViewed?: Maybe<Scalars["Boolean"]>;
  registerWebhooks?: Maybe<Scalars["Boolean"]>;
  /** Remove assigned Enquiry from Logged In User */
  removeEnquiryFromUser?: Maybe<Enquiry>;
  /** Send Promotional Email */
  sendPromotionalEmail?: Maybe<Scalars["Boolean"]>;
  sendUserPasswordResetLink: Scalars["Boolean"];
  /** Sync cloudinary images */
  syncCloudinaryImages?: Maybe<Scalars["Boolean"]>;
  updateAmenities?: Maybe<Array<Maybe<Amenity>>>;
  updateAmenity?: Maybe<Amenity>;
  updateApartment?: Maybe<Apartment>;
  updateApartmentImage?: Maybe<ApartmentImage>;
  updateApartmentImages?: Maybe<Array<Maybe<ApartmentImage>>>;
  updateApartments?: Maybe<Array<Maybe<Apartment>>>;
  updateEnquiries?: Maybe<Array<Maybe<Enquiry>>>;
  updateEnquiry?: Maybe<Enquiry>;
  updateFavorite?: Maybe<Favorite>;
  updateFavorites?: Maybe<Array<Maybe<Favorite>>>;
  updateFloorPlan?: Maybe<FloorPlan>;
  updateFloorPlans?: Maybe<Array<Maybe<FloorPlan>>>;
  /** Update Apartment Images Order */
  updateImagesOrder?: Maybe<Scalars["Boolean"]>;
  updateRental?: Maybe<Rental>;
  updateRentals?: Maybe<Array<Maybe<Rental>>>;
  updateRole?: Maybe<Role>;
  updateRoles?: Maybe<Array<Maybe<Role>>>;
  updateSearch?: Maybe<Search>;
  updateSearches?: Maybe<Array<Maybe<Search>>>;
  updateUnit?: Maybe<Unit>;
  updateUnits?: Maybe<Array<Maybe<Unit>>>;
  updateUser?: Maybe<User>;
  updateUserPasswordCreateToken?: Maybe<UserPasswordCreateToken>;
  updateUserPasswordCreateTokens?: Maybe<Array<Maybe<UserPasswordCreateToken>>>;
  updateUsers?: Maybe<Array<Maybe<User>>>;
  /** User Create Password */
  userCreatePassword?: Maybe<User>;
};

export type MutationAssignEnquiryToUserArgs = {
  enquiryId: Scalars["ID"];
};

export type MutationAuthenticateUserWithPasswordArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
};

export type MutationCreateAmenitiesArgs = {
  data: Array<AmenityCreateInput>;
};

export type MutationCreateAmenityArgs = {
  data: AmenityCreateInput;
};

export type MutationCreateApartmentArgs = {
  data: ApartmentCreateInput;
};

export type MutationCreateApartmentImageArgs = {
  data: ApartmentImageCreateInput;
};

export type MutationCreateApartmentImagesArgs = {
  data: Array<ApartmentImageCreateInput>;
};

export type MutationCreateApartmentsArgs = {
  data: Array<ApartmentCreateInput>;
};

export type MutationCreateEnquiriesArgs = {
  data: Array<EnquiryCreateInput>;
};

export type MutationCreateEnquiryArgs = {
  data: EnquiryCreateInput;
};

export type MutationCreateFavoriteArgs = {
  data: FavoriteCreateInput;
};

export type MutationCreateFavoritesArgs = {
  data: Array<FavoriteCreateInput>;
};

export type MutationCreateFloorPlanArgs = {
  data: FloorPlanCreateInput;
};

export type MutationCreateFloorPlansArgs = {
  data: Array<FloorPlanCreateInput>;
};

export type MutationCreateInitialUserArgs = {
  data: CreateInitialUserInput;
};

export type MutationCreateRentalArgs = {
  data: RentalCreateInput;
};

export type MutationCreateRentalsArgs = {
  data: Array<RentalCreateInput>;
};

export type MutationCreateRoleArgs = {
  data: RoleCreateInput;
};

export type MutationCreateRolesArgs = {
  data: Array<RoleCreateInput>;
};

export type MutationCreateSearchArgs = {
  data: SearchCreateInput;
};

export type MutationCreateSearchesArgs = {
  data: Array<SearchCreateInput>;
};

export type MutationCreateUnitArgs = {
  data: UnitCreateInput;
};

export type MutationCreateUnitsArgs = {
  data: Array<UnitCreateInput>;
};

export type MutationCreateUserArgs = {
  data: UserCreateInput;
};

export type MutationCreateUserEnquiryArgs = {
  data?: InputMaybe<CreateEnquiryArgs>;
};

export type MutationCreateUserPasswordCreateTokenArgs = {
  data: UserPasswordCreateTokenCreateInput;
};

export type MutationCreateUserPasswordCreateTokensArgs = {
  data: Array<UserPasswordCreateTokenCreateInput>;
};

export type MutationCreateUsersArgs = {
  data: Array<UserCreateInput>;
};

export type MutationDeleteAmenitiesArgs = {
  where: Array<AmenityWhereUniqueInput>;
};

export type MutationDeleteAmenityArgs = {
  where: AmenityWhereUniqueInput;
};

export type MutationDeleteApartmentArgs = {
  where: ApartmentWhereUniqueInput;
};

export type MutationDeleteApartmentImageArgs = {
  where: ApartmentImageWhereUniqueInput;
};

export type MutationDeleteApartmentImagesArgs = {
  where: Array<ApartmentImageWhereUniqueInput>;
};

export type MutationDeleteApartmentsArgs = {
  where: Array<ApartmentWhereUniqueInput>;
};

export type MutationDeleteEnquiriesArgs = {
  where: Array<EnquiryWhereUniqueInput>;
};

export type MutationDeleteEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};

export type MutationDeleteFavoriteArgs = {
  where: FavoriteWhereUniqueInput;
};

export type MutationDeleteFavoritesArgs = {
  where: Array<FavoriteWhereUniqueInput>;
};

export type MutationDeleteFloorPlanArgs = {
  where: FloorPlanWhereUniqueInput;
};

export type MutationDeleteFloorPlansArgs = {
  where: Array<FloorPlanWhereUniqueInput>;
};

export type MutationDeleteRentalArgs = {
  where: RentalWhereUniqueInput;
};

export type MutationDeleteRentalsArgs = {
  where: Array<RentalWhereUniqueInput>;
};

export type MutationDeleteRoleArgs = {
  where: RoleWhereUniqueInput;
};

export type MutationDeleteRolesArgs = {
  where: Array<RoleWhereUniqueInput>;
};

export type MutationDeleteSearchArgs = {
  where: SearchWhereUniqueInput;
};

export type MutationDeleteSearchesArgs = {
  where: Array<SearchWhereUniqueInput>;
};

export type MutationDeleteUnitArgs = {
  where: UnitWhereUniqueInput;
};

export type MutationDeleteUnitsArgs = {
  where: Array<UnitWhereUniqueInput>;
};

export type MutationDeleteUserArgs = {
  where: UserWhereUniqueInput;
};

export type MutationDeleteUserPasswordCreateTokenArgs = {
  where: UserPasswordCreateTokenWhereUniqueInput;
};

export type MutationDeleteUserPasswordCreateTokensArgs = {
  where: Array<UserPasswordCreateTokenWhereUniqueInput>;
};

export type MutationDeleteUsersArgs = {
  where: Array<UserWhereUniqueInput>;
};

export type MutationFollowUpBossPeopleCreatedArgs = {
  userIds: Array<Scalars["String"]>;
};

export type MutationRedeemUserPasswordResetTokenArgs = {
  email: Scalars["String"];
  password: Scalars["String"];
  token: Scalars["String"];
};

export type MutationRegisterPropertySearchedArgs = {
  searchUrl: Scalars["String"];
};

export type MutationRegisterPropertyViewedArgs = {
  apartmentId: Scalars["ID"];
};

export type MutationRemoveEnquiryFromUserArgs = {
  enquiryId: Scalars["ID"];
};

export type MutationSendPromotionalEmailArgs = {
  data: PromotionEmailInput;
};

export type MutationSendUserPasswordResetLinkArgs = {
  email: Scalars["String"];
};

export type MutationUpdateAmenitiesArgs = {
  data: Array<AmenityUpdateArgs>;
};

export type MutationUpdateAmenityArgs = {
  data: AmenityUpdateInput;
  where: AmenityWhereUniqueInput;
};

export type MutationUpdateApartmentArgs = {
  data: ApartmentUpdateInput;
  where: ApartmentWhereUniqueInput;
};

export type MutationUpdateApartmentImageArgs = {
  data: ApartmentImageUpdateInput;
  where: ApartmentImageWhereUniqueInput;
};

export type MutationUpdateApartmentImagesArgs = {
  data: Array<ApartmentImageUpdateArgs>;
};

export type MutationUpdateApartmentsArgs = {
  data: Array<ApartmentUpdateArgs>;
};

export type MutationUpdateEnquiriesArgs = {
  data: Array<EnquiryUpdateArgs>;
};

export type MutationUpdateEnquiryArgs = {
  data: EnquiryUpdateInput;
  where: EnquiryWhereUniqueInput;
};

export type MutationUpdateFavoriteArgs = {
  data: FavoriteUpdateInput;
  where: FavoriteWhereUniqueInput;
};

export type MutationUpdateFavoritesArgs = {
  data: Array<FavoriteUpdateArgs>;
};

export type MutationUpdateFloorPlanArgs = {
  data: FloorPlanUpdateInput;
  where: FloorPlanWhereUniqueInput;
};

export type MutationUpdateFloorPlansArgs = {
  data: Array<FloorPlanUpdateArgs>;
};

export type MutationUpdateImagesOrderArgs = {
  images: Array<Scalars["ID"]>;
};

export type MutationUpdateRentalArgs = {
  data: RentalUpdateInput;
  where: RentalWhereUniqueInput;
};

export type MutationUpdateRentalsArgs = {
  data: Array<RentalUpdateArgs>;
};

export type MutationUpdateRoleArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type MutationUpdateRolesArgs = {
  data: Array<RoleUpdateArgs>;
};

export type MutationUpdateSearchArgs = {
  data: SearchUpdateInput;
  where: SearchWhereUniqueInput;
};

export type MutationUpdateSearchesArgs = {
  data: Array<SearchUpdateArgs>;
};

export type MutationUpdateUnitArgs = {
  data: UnitUpdateInput;
  where: UnitWhereUniqueInput;
};

export type MutationUpdateUnitsArgs = {
  data: Array<UnitUpdateArgs>;
};

export type MutationUpdateUserArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type MutationUpdateUserPasswordCreateTokenArgs = {
  data: UserPasswordCreateTokenUpdateInput;
  where: UserPasswordCreateTokenWhereUniqueInput;
};

export type MutationUpdateUserPasswordCreateTokensArgs = {
  data: Array<UserPasswordCreateTokenUpdateArgs>;
};

export type MutationUpdateUsersArgs = {
  data: Array<UserUpdateArgs>;
};

export type MutationUserCreatePasswordArgs = {
  password: Scalars["String"];
  passwordCreateUUID: Scalars["String"];
};

export type NestedStringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type NestedStringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export enum OrderDirection {
  Asc = "asc",
  Desc = "desc"
}

export type PasswordFilter = {
  isSet: Scalars["Boolean"];
};

export enum PasswordResetRedemptionErrorCode {
  Failure = "FAILURE",
  TokenExpired = "TOKEN_EXPIRED",
  TokenRedeemed = "TOKEN_REDEEMED"
}

export type PasswordState = {
  __typename?: "PasswordState";
  isSet: Scalars["Boolean"];
};

export type PromotionEmailInput = {
  apartmentIds: Array<Scalars["ID"]>;
  baths?: InputMaybe<Scalars["Int"]>;
  beds?: InputMaybe<Scalars["Int"]>;
  location?: InputMaybe<Array<InputMaybe<Scalars["String"]>>>;
  priceFrom?: InputMaybe<Scalars["Int"]>;
  priceTo?: InputMaybe<Scalars["Int"]>;
  userIds: Array<Scalars["ID"]>;
};

export type Query = {
  __typename?: "Query";
  amenities?: Maybe<Array<Amenity>>;
  amenitiesCount?: Maybe<Scalars["Int"]>;
  amenity?: Maybe<Amenity>;
  apartment?: Maybe<Apartment>;
  apartmentImage?: Maybe<ApartmentImage>;
  apartmentImages?: Maybe<Array<ApartmentImage>>;
  apartmentImagesCount?: Maybe<Scalars["Int"]>;
  apartments?: Maybe<Array<Apartment>>;
  apartmentsCount?: Maybe<Scalars["Int"]>;
  authenticatedItem?: Maybe<AuthenticatedItem>;
  enquiries?: Maybe<Array<Enquiry>>;
  enquiriesCount?: Maybe<Scalars["Int"]>;
  enquiry?: Maybe<Enquiry>;
  favorite?: Maybe<Favorite>;
  favorites?: Maybe<Array<Favorite>>;
  favoritesCount?: Maybe<Scalars["Int"]>;
  floorPlan?: Maybe<FloorPlan>;
  floorPlans?: Maybe<Array<FloorPlan>>;
  floorPlansCount?: Maybe<Scalars["Int"]>;
  /** Get Logged In User's Assigned Enquiries */
  getMyAssignedEnquiries?: Maybe<Array<Enquiry>>;
  /** Get Logged In Users Favorites */
  getMyFavorites?: Maybe<Array<Favorite>>;
  /** Get Logged In Users Searches */
  getMySearches?: Maybe<Array<Search>>;
  /** Get All Unassigned Enquiries */
  getUnAssignedEnquiries?: Maybe<Array<Enquiry>>;
  keystone: KeystoneMeta;
  rental?: Maybe<Rental>;
  rentals?: Maybe<Array<Rental>>;
  rentalsCount?: Maybe<Scalars["Int"]>;
  role?: Maybe<Role>;
  roles?: Maybe<Array<Role>>;
  rolesCount?: Maybe<Scalars["Int"]>;
  search?: Maybe<Search>;
  searches?: Maybe<Array<Search>>;
  searchesCount?: Maybe<Scalars["Int"]>;
  unit?: Maybe<Unit>;
  units?: Maybe<Array<Unit>>;
  unitsCount?: Maybe<Scalars["Int"]>;
  user?: Maybe<User>;
  userPasswordCreateToken?: Maybe<UserPasswordCreateToken>;
  userPasswordCreateTokens?: Maybe<Array<UserPasswordCreateToken>>;
  userPasswordCreateTokensCount?: Maybe<Scalars["Int"]>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars["Int"]>;
  validateUserPasswordResetToken?: Maybe<ValidateUserPasswordResetTokenResult>;
};

export type QueryAmenitiesArgs = {
  orderBy?: Array<AmenityOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: AmenityWhereInput;
};

export type QueryAmenitiesCountArgs = {
  where?: AmenityWhereInput;
};

export type QueryAmenityArgs = {
  where: AmenityWhereUniqueInput;
};

export type QueryApartmentArgs = {
  where: ApartmentWhereUniqueInput;
};

export type QueryApartmentImageArgs = {
  where: ApartmentImageWhereUniqueInput;
};

export type QueryApartmentImagesArgs = {
  orderBy?: Array<ApartmentImageOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: ApartmentImageWhereInput;
};

export type QueryApartmentImagesCountArgs = {
  where?: ApartmentImageWhereInput;
};

export type QueryApartmentsArgs = {
  orderBy?: Array<ApartmentOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: ApartmentWhereInput;
};

export type QueryApartmentsCountArgs = {
  where?: ApartmentWhereInput;
};

export type QueryEnquiriesArgs = {
  orderBy?: Array<EnquiryOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: EnquiryWhereInput;
};

export type QueryEnquiriesCountArgs = {
  where?: EnquiryWhereInput;
};

export type QueryEnquiryArgs = {
  where: EnquiryWhereUniqueInput;
};

export type QueryFavoriteArgs = {
  where: FavoriteWhereUniqueInput;
};

export type QueryFavoritesArgs = {
  orderBy?: Array<FavoriteOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FavoriteWhereInput;
};

export type QueryFavoritesCountArgs = {
  where?: FavoriteWhereInput;
};

export type QueryFloorPlanArgs = {
  where: FloorPlanWhereUniqueInput;
};

export type QueryFloorPlansArgs = {
  orderBy?: Array<FloorPlanOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FloorPlanWhereInput;
};

export type QueryFloorPlansCountArgs = {
  where?: FloorPlanWhereInput;
};

export type QueryGetMyFavoritesArgs = {
  orderBy?: Array<FavoriteOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FavoriteWhereInput;
};

export type QueryGetMySearchesArgs = {
  orderBy?: Array<SearchOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: SearchWhereInput;
};

export type QueryRentalArgs = {
  where: RentalWhereUniqueInput;
};

export type QueryRentalsArgs = {
  orderBy?: Array<RentalOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: RentalWhereInput;
};

export type QueryRentalsCountArgs = {
  where?: RentalWhereInput;
};

export type QueryRoleArgs = {
  where: RoleWhereUniqueInput;
};

export type QueryRolesArgs = {
  orderBy?: Array<RoleOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: RoleWhereInput;
};

export type QueryRolesCountArgs = {
  where?: RoleWhereInput;
};

export type QuerySearchArgs = {
  where: SearchWhereUniqueInput;
};

export type QuerySearchesArgs = {
  orderBy?: Array<SearchOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: SearchWhereInput;
};

export type QuerySearchesCountArgs = {
  where?: SearchWhereInput;
};

export type QueryUnitArgs = {
  where: UnitWhereUniqueInput;
};

export type QueryUnitsArgs = {
  orderBy?: Array<UnitOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: UnitWhereInput;
};

export type QueryUnitsCountArgs = {
  where?: UnitWhereInput;
};

export type QueryUserArgs = {
  where: UserWhereUniqueInput;
};

export type QueryUserPasswordCreateTokenArgs = {
  where: UserPasswordCreateTokenWhereUniqueInput;
};

export type QueryUserPasswordCreateTokensArgs = {
  orderBy?: Array<UserPasswordCreateTokenOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: UserPasswordCreateTokenWhereInput;
};

export type QueryUserPasswordCreateTokensCountArgs = {
  where?: UserPasswordCreateTokenWhereInput;
};

export type QueryUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: UserWhereInput;
};

export type QueryUsersCountArgs = {
  where?: UserWhereInput;
};

export type QueryValidateUserPasswordResetTokenArgs = {
  email: Scalars["String"];
  token: Scalars["String"];
};

export enum QueryMode {
  Default = "default",
  Insensitive = "insensitive"
}

export type RedeemUserPasswordResetTokenResult = {
  __typename?: "RedeemUserPasswordResetTokenResult";
  code: PasswordResetRedemptionErrorCode;
  message: Scalars["String"];
};

export type Rental = {
  __typename?: "Rental";
  MLSId?: Maybe<Scalars["String"]>;
  address?: Maybe<Scalars["String"]>;
  airConditioned?: Maybe<Scalars["Boolean"]>;
  appxSf?: Maybe<Scalars["String"]>;
  availFurnished?: Maybe<Scalars["Boolean"]>;
  availableAsOf?: Maybe<Scalars["DateTime"]>;
  bathrooms?: Maybe<Scalars["Int"]>;
  bedrooms?: Maybe<Scalars["Int"]>;
  broker?: Maybe<Scalars["String"]>;
  coopComp?: Maybe<Scalars["String"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  elementarySchool?: Maybe<Scalars["String"]>;
  exposure?: Maybe<Scalars["String"]>;
  feesNApprovals?: Maybe<Scalars["String"]>;
  garageOnSite?: Maybe<Scalars["Boolean"]>;
  garageOwnership?: Maybe<Scalars["Boolean"]>;
  garageType?: Maybe<Scalars["String"]>;
  heating?: Maybe<Scalars["Boolean"]>;
  highSchool?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  juniorHigh?: Maybe<Scalars["String"]>;
  listBroker?: Maybe<Scalars["String"]>;
  listDate?: Maybe<Scalars["DateTime"]>;
  maxPetWeight?: Maybe<Scalars["Decimal"]>;
  mktTime?: Maybe<Scalars["String"]>;
  monthlyRentIncl?: Maybe<Scalars["Boolean"]>;
  parkingFee?: Maybe<Scalars["Int"]>;
  parkingIncluded?: Maybe<Scalars["Boolean"]>;
  petsAllowed?: Maybe<Scalars["Boolean"]>;
  remarks?: Maybe<Scalars["String"]>;
  rentPrice?: Maybe<Scalars["Decimal"]>;
  shortTermLease?: Maybe<Scalars["Boolean"]>;
  spaces?: Maybe<Scalars["String"]>;
  status?: Maybe<RentalStatusType>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  yearBuilt?: Maybe<Scalars["Int"]>;
};

export type RentalCreateInput = {
  MLSId?: InputMaybe<Scalars["String"]>;
  address?: InputMaybe<Scalars["String"]>;
  airConditioned?: InputMaybe<Scalars["Boolean"]>;
  appxSf?: InputMaybe<Scalars["String"]>;
  availFurnished?: InputMaybe<Scalars["Boolean"]>;
  availableAsOf?: InputMaybe<Scalars["DateTime"]>;
  bathrooms?: InputMaybe<Scalars["Int"]>;
  bedrooms?: InputMaybe<Scalars["Int"]>;
  broker?: InputMaybe<Scalars["String"]>;
  coopComp?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  elementarySchool?: InputMaybe<Scalars["String"]>;
  exposure?: InputMaybe<Scalars["String"]>;
  feesNApprovals?: InputMaybe<Scalars["String"]>;
  garageOnSite?: InputMaybe<Scalars["Boolean"]>;
  garageOwnership?: InputMaybe<Scalars["Boolean"]>;
  garageType?: InputMaybe<Scalars["String"]>;
  heating?: InputMaybe<Scalars["Boolean"]>;
  highSchool?: InputMaybe<Scalars["String"]>;
  juniorHigh?: InputMaybe<Scalars["String"]>;
  listBroker?: InputMaybe<Scalars["String"]>;
  listDate?: InputMaybe<Scalars["DateTime"]>;
  maxPetWeight?: InputMaybe<Scalars["Decimal"]>;
  mktTime?: InputMaybe<Scalars["String"]>;
  monthlyRentIncl?: InputMaybe<Scalars["Boolean"]>;
  parkingFee?: InputMaybe<Scalars["Int"]>;
  parkingIncluded?: InputMaybe<Scalars["Boolean"]>;
  petsAllowed?: InputMaybe<Scalars["Boolean"]>;
  remarks?: InputMaybe<Scalars["String"]>;
  rentPrice?: InputMaybe<Scalars["Decimal"]>;
  shortTermLease?: InputMaybe<Scalars["Boolean"]>;
  spaces?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<RentalStatusType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  yearBuilt?: InputMaybe<Scalars["Int"]>;
};

export type RentalOrderByInput = {
  MLSId?: InputMaybe<OrderDirection>;
  address?: InputMaybe<OrderDirection>;
  airConditioned?: InputMaybe<OrderDirection>;
  appxSf?: InputMaybe<OrderDirection>;
  availFurnished?: InputMaybe<OrderDirection>;
  availableAsOf?: InputMaybe<OrderDirection>;
  bathrooms?: InputMaybe<OrderDirection>;
  bedrooms?: InputMaybe<OrderDirection>;
  broker?: InputMaybe<OrderDirection>;
  coopComp?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  elementarySchool?: InputMaybe<OrderDirection>;
  exposure?: InputMaybe<OrderDirection>;
  feesNApprovals?: InputMaybe<OrderDirection>;
  garageOnSite?: InputMaybe<OrderDirection>;
  garageOwnership?: InputMaybe<OrderDirection>;
  garageType?: InputMaybe<OrderDirection>;
  heating?: InputMaybe<OrderDirection>;
  highSchool?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  juniorHigh?: InputMaybe<OrderDirection>;
  listBroker?: InputMaybe<OrderDirection>;
  listDate?: InputMaybe<OrderDirection>;
  maxPetWeight?: InputMaybe<OrderDirection>;
  mktTime?: InputMaybe<OrderDirection>;
  monthlyRentIncl?: InputMaybe<OrderDirection>;
  parkingFee?: InputMaybe<OrderDirection>;
  parkingIncluded?: InputMaybe<OrderDirection>;
  petsAllowed?: InputMaybe<OrderDirection>;
  remarks?: InputMaybe<OrderDirection>;
  rentPrice?: InputMaybe<OrderDirection>;
  shortTermLease?: InputMaybe<OrderDirection>;
  spaces?: InputMaybe<OrderDirection>;
  status?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  yearBuilt?: InputMaybe<OrderDirection>;
};

export enum RentalStatusType {
  Actv = "ACTV",
  Auct = "AUCT",
  Bomk = "BOMK",
  Canc = "CANC",
  Clsd = "CLSD",
  Ctg = "CTG",
  Exp = "EXP",
  New = "NEW",
  Pchg = "PCHG",
  Pend = "PEND",
  PrivActv = "PRIV_ACTV",
  PrivCanc = "PRIV_CANC",
  PrivCtg = "PRIV_CTG",
  PrivExp = "PRIV_EXP",
  PrivPend = "PRIV_PEND",
  Ract = "RACT",
  Rntd = "RNTD",
  Temp = "TEMP"
}

export type RentalStatusTypeNullableFilter = {
  equals?: InputMaybe<RentalStatusType>;
  in?: InputMaybe<Array<RentalStatusType>>;
  not?: InputMaybe<RentalStatusTypeNullableFilter>;
  notIn?: InputMaybe<Array<RentalStatusType>>;
};

export type RentalUpdateArgs = {
  data: RentalUpdateInput;
  where: RentalWhereUniqueInput;
};

export type RentalUpdateInput = {
  MLSId?: InputMaybe<Scalars["String"]>;
  address?: InputMaybe<Scalars["String"]>;
  airConditioned?: InputMaybe<Scalars["Boolean"]>;
  appxSf?: InputMaybe<Scalars["String"]>;
  availFurnished?: InputMaybe<Scalars["Boolean"]>;
  availableAsOf?: InputMaybe<Scalars["DateTime"]>;
  bathrooms?: InputMaybe<Scalars["Int"]>;
  bedrooms?: InputMaybe<Scalars["Int"]>;
  broker?: InputMaybe<Scalars["String"]>;
  coopComp?: InputMaybe<Scalars["String"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  elementarySchool?: InputMaybe<Scalars["String"]>;
  exposure?: InputMaybe<Scalars["String"]>;
  feesNApprovals?: InputMaybe<Scalars["String"]>;
  garageOnSite?: InputMaybe<Scalars["Boolean"]>;
  garageOwnership?: InputMaybe<Scalars["Boolean"]>;
  garageType?: InputMaybe<Scalars["String"]>;
  heating?: InputMaybe<Scalars["Boolean"]>;
  highSchool?: InputMaybe<Scalars["String"]>;
  juniorHigh?: InputMaybe<Scalars["String"]>;
  listBroker?: InputMaybe<Scalars["String"]>;
  listDate?: InputMaybe<Scalars["DateTime"]>;
  maxPetWeight?: InputMaybe<Scalars["Decimal"]>;
  mktTime?: InputMaybe<Scalars["String"]>;
  monthlyRentIncl?: InputMaybe<Scalars["Boolean"]>;
  parkingFee?: InputMaybe<Scalars["Int"]>;
  parkingIncluded?: InputMaybe<Scalars["Boolean"]>;
  petsAllowed?: InputMaybe<Scalars["Boolean"]>;
  remarks?: InputMaybe<Scalars["String"]>;
  rentPrice?: InputMaybe<Scalars["Decimal"]>;
  shortTermLease?: InputMaybe<Scalars["Boolean"]>;
  spaces?: InputMaybe<Scalars["String"]>;
  status?: InputMaybe<RentalStatusType>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  yearBuilt?: InputMaybe<Scalars["Int"]>;
};

export type RentalWhereInput = {
  AND?: InputMaybe<Array<RentalWhereInput>>;
  MLSId?: InputMaybe<StringFilter>;
  NOT?: InputMaybe<Array<RentalWhereInput>>;
  OR?: InputMaybe<Array<RentalWhereInput>>;
  address?: InputMaybe<StringFilter>;
  airConditioned?: InputMaybe<BooleanFilter>;
  appxSf?: InputMaybe<StringFilter>;
  availFurnished?: InputMaybe<BooleanFilter>;
  availableAsOf?: InputMaybe<DateTimeNullableFilter>;
  bathrooms?: InputMaybe<IntFilter>;
  bedrooms?: InputMaybe<IntFilter>;
  broker?: InputMaybe<StringFilter>;
  coopComp?: InputMaybe<StringFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  elementarySchool?: InputMaybe<StringFilter>;
  exposure?: InputMaybe<StringFilter>;
  feesNApprovals?: InputMaybe<StringFilter>;
  garageOnSite?: InputMaybe<BooleanFilter>;
  garageOwnership?: InputMaybe<BooleanFilter>;
  garageType?: InputMaybe<StringFilter>;
  heating?: InputMaybe<BooleanFilter>;
  highSchool?: InputMaybe<StringFilter>;
  id?: InputMaybe<IdFilter>;
  juniorHigh?: InputMaybe<StringFilter>;
  listBroker?: InputMaybe<StringFilter>;
  listDate?: InputMaybe<DateTimeNullableFilter>;
  maxPetWeight?: InputMaybe<DecimalFilter>;
  mktTime?: InputMaybe<StringFilter>;
  monthlyRentIncl?: InputMaybe<BooleanFilter>;
  parkingFee?: InputMaybe<IntFilter>;
  parkingIncluded?: InputMaybe<BooleanFilter>;
  petsAllowed?: InputMaybe<BooleanFilter>;
  remarks?: InputMaybe<StringFilter>;
  rentPrice?: InputMaybe<DecimalFilter>;
  shortTermLease?: InputMaybe<BooleanFilter>;
  spaces?: InputMaybe<StringFilter>;
  status?: InputMaybe<RentalStatusTypeNullableFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  yearBuilt?: InputMaybe<IntFilter>;
};

export type RentalWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type Role = {
  __typename?: "Role";
  canManageContent?: Maybe<Scalars["Boolean"]>;
  canManageLeads?: Maybe<Scalars["Boolean"]>;
  canManageUsers?: Maybe<Scalars["Boolean"]>;
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  users?: Maybe<Array<User>>;
  usersCount?: Maybe<Scalars["Int"]>;
};

export type RoleUsersArgs = {
  orderBy?: Array<UserOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: UserWhereInput;
};

export type RoleUsersCountArgs = {
  where?: UserWhereInput;
};

export type RoleCreateInput = {
  canManageContent?: InputMaybe<Scalars["Boolean"]>;
  canManageLeads?: InputMaybe<Scalars["Boolean"]>;
  canManageUsers?: InputMaybe<Scalars["Boolean"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  users?: InputMaybe<UserRelateToManyForCreateInput>;
};

export type RoleOrderByInput = {
  canManageContent?: InputMaybe<OrderDirection>;
  canManageLeads?: InputMaybe<OrderDirection>;
  canManageUsers?: InputMaybe<OrderDirection>;
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type RoleRelateToOneForCreateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
};

export type RoleRelateToOneForUpdateInput = {
  connect?: InputMaybe<RoleWhereUniqueInput>;
  create?: InputMaybe<RoleCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]>;
};

export type RoleUpdateArgs = {
  data: RoleUpdateInput;
  where: RoleWhereUniqueInput;
};

export type RoleUpdateInput = {
  canManageContent?: InputMaybe<Scalars["Boolean"]>;
  canManageLeads?: InputMaybe<Scalars["Boolean"]>;
  canManageUsers?: InputMaybe<Scalars["Boolean"]>;
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  users?: InputMaybe<UserRelateToManyForUpdateInput>;
};

export type RoleWhereInput = {
  AND?: InputMaybe<Array<RoleWhereInput>>;
  NOT?: InputMaybe<Array<RoleWhereInput>>;
  OR?: InputMaybe<Array<RoleWhereInput>>;
  canManageContent?: InputMaybe<BooleanFilter>;
  canManageLeads?: InputMaybe<BooleanFilter>;
  canManageUsers?: InputMaybe<BooleanFilter>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  users?: InputMaybe<UserManyRelationFilter>;
};

export type RoleWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
  name?: InputMaybe<Scalars["String"]>;
};

export type Search = {
  __typename?: "Search";
  createdAt?: Maybe<Scalars["DateTime"]>;
  displayName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  url?: Maybe<Scalars["String"]>;
  user?: Maybe<User>;
};

export type SearchCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  url?: InputMaybe<Scalars["String"]>;
  user?: InputMaybe<UserRelateToOneForCreateInput>;
};

export type SearchManyRelationFilter = {
  every?: InputMaybe<SearchWhereInput>;
  none?: InputMaybe<SearchWhereInput>;
  some?: InputMaybe<SearchWhereInput>;
};

export type SearchOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  url?: InputMaybe<OrderDirection>;
};

export type SearchRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  create?: InputMaybe<Array<SearchCreateInput>>;
};

export type SearchRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  create?: InputMaybe<Array<SearchCreateInput>>;
  disconnect?: InputMaybe<Array<SearchWhereUniqueInput>>;
  set?: InputMaybe<Array<SearchWhereUniqueInput>>;
};

export type SearchUpdateArgs = {
  data: SearchUpdateInput;
  where: SearchWhereUniqueInput;
};

export type SearchUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  name?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  url?: InputMaybe<Scalars["String"]>;
  user?: InputMaybe<UserRelateToOneForUpdateInput>;
};

export type SearchWhereInput = {
  AND?: InputMaybe<Array<SearchWhereInput>>;
  NOT?: InputMaybe<Array<SearchWhereInput>>;
  OR?: InputMaybe<Array<SearchWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  url?: InputMaybe<StringFilter>;
  user?: InputMaybe<UserWhereInput>;
};

export type SearchWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type StringFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type StringNullableFilter = {
  contains?: InputMaybe<Scalars["String"]>;
  endsWith?: InputMaybe<Scalars["String"]>;
  equals?: InputMaybe<Scalars["String"]>;
  gt?: InputMaybe<Scalars["String"]>;
  gte?: InputMaybe<Scalars["String"]>;
  in?: InputMaybe<Array<Scalars["String"]>>;
  lt?: InputMaybe<Scalars["String"]>;
  lte?: InputMaybe<Scalars["String"]>;
  mode?: InputMaybe<QueryMode>;
  not?: InputMaybe<NestedStringNullableFilter>;
  notIn?: InputMaybe<Array<Scalars["String"]>>;
  startsWith?: InputMaybe<Scalars["String"]>;
};

export type Unit = {
  __typename?: "Unit";
  applyOnlineUrl?: Maybe<Scalars["String"]>;
  availability?: Maybe<Scalars["String"]>;
  availableOn?: Maybe<Scalars["DateTime"]>;
  displayName?: Maybe<Scalars["String"]>;
  floorPlan?: Maybe<FloorPlan>;
  id: Scalars["ID"];
  name?: Maybe<Scalars["String"]>;
  price?: Maybe<Scalars["Float"]>;
  source?: Maybe<Scalars["String"]>;
  sourceId?: Maybe<Scalars["String"]>;
  squareFootage?: Maybe<Scalars["Float"]>;
};

export type UnitCreateInput = {
  applyOnlineUrl?: InputMaybe<Scalars["String"]>;
  availability?: InputMaybe<Scalars["String"]>;
  availableOn?: InputMaybe<Scalars["DateTime"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  floorPlan?: InputMaybe<FloorPlanRelateToOneForCreateInput>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  source?: InputMaybe<Scalars["String"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  squareFootage?: InputMaybe<Scalars["Float"]>;
};

export type UnitManyRelationFilter = {
  every?: InputMaybe<UnitWhereInput>;
  none?: InputMaybe<UnitWhereInput>;
  some?: InputMaybe<UnitWhereInput>;
};

export type UnitOrderByInput = {
  applyOnlineUrl?: InputMaybe<OrderDirection>;
  availability?: InputMaybe<OrderDirection>;
  availableOn?: InputMaybe<OrderDirection>;
  displayName?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  name?: InputMaybe<OrderDirection>;
  price?: InputMaybe<OrderDirection>;
  source?: InputMaybe<OrderDirection>;
  sourceId?: InputMaybe<OrderDirection>;
  squareFootage?: InputMaybe<OrderDirection>;
};

export type UnitRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UnitWhereUniqueInput>>;
  create?: InputMaybe<Array<UnitCreateInput>>;
};

export type UnitRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UnitWhereUniqueInput>>;
  create?: InputMaybe<Array<UnitCreateInput>>;
  disconnect?: InputMaybe<Array<UnitWhereUniqueInput>>;
  set?: InputMaybe<Array<UnitWhereUniqueInput>>;
};

export type UnitUpdateArgs = {
  data: UnitUpdateInput;
  where: UnitWhereUniqueInput;
};

export type UnitUpdateInput = {
  applyOnlineUrl?: InputMaybe<Scalars["String"]>;
  availability?: InputMaybe<Scalars["String"]>;
  availableOn?: InputMaybe<Scalars["DateTime"]>;
  displayName?: InputMaybe<Scalars["String"]>;
  floorPlan?: InputMaybe<FloorPlanRelateToOneForUpdateInput>;
  name?: InputMaybe<Scalars["String"]>;
  price?: InputMaybe<Scalars["Float"]>;
  source?: InputMaybe<Scalars["String"]>;
  sourceId?: InputMaybe<Scalars["String"]>;
  squareFootage?: InputMaybe<Scalars["Float"]>;
};

export type UnitWhereInput = {
  AND?: InputMaybe<Array<UnitWhereInput>>;
  NOT?: InputMaybe<Array<UnitWhereInput>>;
  OR?: InputMaybe<Array<UnitWhereInput>>;
  applyOnlineUrl?: InputMaybe<StringFilter>;
  availability?: InputMaybe<StringFilter>;
  availableOn?: InputMaybe<DateTimeNullableFilter>;
  displayName?: InputMaybe<StringFilter>;
  floorPlan?: InputMaybe<FloorPlanWhereInput>;
  id?: InputMaybe<IdFilter>;
  name?: InputMaybe<StringFilter>;
  price?: InputMaybe<FloatNullableFilter>;
  source?: InputMaybe<StringFilter>;
  sourceId?: InputMaybe<StringFilter>;
  squareFootage?: InputMaybe<FloatNullableFilter>;
};

export type UnitWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
};

export type User = {
  __typename?: "User";
  createdAt?: Maybe<Scalars["DateTime"]>;
  email?: Maybe<Scalars["String"]>;
  enquiries?: Maybe<Array<Enquiry>>;
  enquiriesCount?: Maybe<Scalars["Int"]>;
  favorites?: Maybe<Array<Favorite>>;
  favoritesCount?: Maybe<Scalars["Int"]>;
  firstName?: Maybe<Scalars["String"]>;
  followUpBossId?: Maybe<Scalars["Int"]>;
  fullName?: Maybe<Scalars["String"]>;
  id: Scalars["ID"];
  lastName?: Maybe<Scalars["String"]>;
  managedEnquiries?: Maybe<Array<Enquiry>>;
  managedEnquiriesCount?: Maybe<Scalars["Int"]>;
  password?: Maybe<PasswordState>;
  passwordResetIssuedAt?: Maybe<Scalars["DateTime"]>;
  passwordResetRedeemedAt?: Maybe<Scalars["DateTime"]>;
  passwordResetToken?: Maybe<PasswordState>;
  phone?: Maybe<Scalars["String"]>;
  role?: Maybe<Role>;
  searches?: Maybe<Array<Search>>;
  searchesCount?: Maybe<Scalars["Int"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
};

export type UserEnquiriesArgs = {
  orderBy?: Array<EnquiryOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: EnquiryWhereInput;
};

export type UserEnquiriesCountArgs = {
  where?: EnquiryWhereInput;
};

export type UserFavoritesArgs = {
  orderBy?: Array<FavoriteOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: FavoriteWhereInput;
};

export type UserFavoritesCountArgs = {
  where?: FavoriteWhereInput;
};

export type UserManagedEnquiriesArgs = {
  orderBy?: Array<EnquiryOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: EnquiryWhereInput;
};

export type UserManagedEnquiriesCountArgs = {
  where?: EnquiryWhereInput;
};

export type UserSearchesArgs = {
  orderBy?: Array<SearchOrderByInput>;
  skip?: Scalars["Int"];
  take?: InputMaybe<Scalars["Int"]>;
  where?: SearchWhereInput;
};

export type UserSearchesCountArgs = {
  where?: SearchWhereInput;
};

export type UserAuthenticationWithPasswordFailure = {
  __typename?: "UserAuthenticationWithPasswordFailure";
  message: Scalars["String"];
};

export type UserAuthenticationWithPasswordResult = UserAuthenticationWithPasswordFailure | UserAuthenticationWithPasswordSuccess;

export type UserAuthenticationWithPasswordSuccess = {
  __typename?: "UserAuthenticationWithPasswordSuccess";
  item: User;
  sessionToken: Scalars["String"];
};

export type UserCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email?: InputMaybe<Scalars["String"]>;
  enquiries?: InputMaybe<EnquiryRelateToManyForCreateInput>;
  favorites?: InputMaybe<FavoriteRelateToManyForCreateInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  followUpBossId?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  managedEnquiries?: InputMaybe<EnquiryRelateToManyForCreateInput>;
  password?: InputMaybe<Scalars["String"]>;
  passwordResetIssuedAt?: InputMaybe<Scalars["DateTime"]>;
  passwordResetRedeemedAt?: InputMaybe<Scalars["DateTime"]>;
  passwordResetToken?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<RoleRelateToOneForCreateInput>;
  searches?: InputMaybe<SearchRelateToManyForCreateInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserManyRelationFilter = {
  every?: InputMaybe<UserWhereInput>;
  none?: InputMaybe<UserWhereInput>;
  some?: InputMaybe<UserWhereInput>;
};

export type UserOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  email?: InputMaybe<OrderDirection>;
  firstName?: InputMaybe<OrderDirection>;
  followUpBossId?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  lastName?: InputMaybe<OrderDirection>;
  passwordResetIssuedAt?: InputMaybe<OrderDirection>;
  passwordResetRedeemedAt?: InputMaybe<OrderDirection>;
  phone?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
};

export type UserPasswordCreateToken = {
  __typename?: "UserPasswordCreateToken";
  createdAt?: Maybe<Scalars["DateTime"]>;
  id: Scalars["ID"];
  redeemedAt?: Maybe<Scalars["DateTime"]>;
  token?: Maybe<Scalars["String"]>;
  updatedAt?: Maybe<Scalars["DateTime"]>;
  userId?: Maybe<Scalars["Int"]>;
};

export type UserPasswordCreateTokenCreateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  redeemedAt?: InputMaybe<Scalars["DateTime"]>;
  token?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  userId?: InputMaybe<Scalars["Int"]>;
};

export type UserPasswordCreateTokenOrderByInput = {
  createdAt?: InputMaybe<OrderDirection>;
  id?: InputMaybe<OrderDirection>;
  redeemedAt?: InputMaybe<OrderDirection>;
  token?: InputMaybe<OrderDirection>;
  updatedAt?: InputMaybe<OrderDirection>;
  userId?: InputMaybe<OrderDirection>;
};

export type UserPasswordCreateTokenUpdateArgs = {
  data: UserPasswordCreateTokenUpdateInput;
  where: UserPasswordCreateTokenWhereUniqueInput;
};

export type UserPasswordCreateTokenUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  redeemedAt?: InputMaybe<Scalars["DateTime"]>;
  token?: InputMaybe<Scalars["String"]>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
  userId?: InputMaybe<Scalars["Int"]>;
};

export type UserPasswordCreateTokenWhereInput = {
  AND?: InputMaybe<Array<UserPasswordCreateTokenWhereInput>>;
  NOT?: InputMaybe<Array<UserPasswordCreateTokenWhereInput>>;
  OR?: InputMaybe<Array<UserPasswordCreateTokenWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  id?: InputMaybe<IdFilter>;
  redeemedAt?: InputMaybe<DateTimeNullableFilter>;
  token?: InputMaybe<StringFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
  userId?: InputMaybe<IntFilter>;
};

export type UserPasswordCreateTokenWhereUniqueInput = {
  id?: InputMaybe<Scalars["ID"]>;
  token?: InputMaybe<Scalars["String"]>;
};

export type UserRelateToManyForCreateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
};

export type UserRelateToManyForUpdateInput = {
  connect?: InputMaybe<Array<UserWhereUniqueInput>>;
  create?: InputMaybe<Array<UserCreateInput>>;
  disconnect?: InputMaybe<Array<UserWhereUniqueInput>>;
  set?: InputMaybe<Array<UserWhereUniqueInput>>;
};

export type UserRelateToOneForCreateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
};

export type UserRelateToOneForUpdateInput = {
  connect?: InputMaybe<UserWhereUniqueInput>;
  create?: InputMaybe<UserCreateInput>;
  disconnect?: InputMaybe<Scalars["Boolean"]>;
};

export type UserUpdateArgs = {
  data: UserUpdateInput;
  where: UserWhereUniqueInput;
};

export type UserUpdateInput = {
  createdAt?: InputMaybe<Scalars["DateTime"]>;
  email?: InputMaybe<Scalars["String"]>;
  enquiries?: InputMaybe<EnquiryRelateToManyForUpdateInput>;
  favorites?: InputMaybe<FavoriteRelateToManyForUpdateInput>;
  firstName?: InputMaybe<Scalars["String"]>;
  followUpBossId?: InputMaybe<Scalars["Int"]>;
  lastName?: InputMaybe<Scalars["String"]>;
  managedEnquiries?: InputMaybe<EnquiryRelateToManyForUpdateInput>;
  password?: InputMaybe<Scalars["String"]>;
  passwordResetIssuedAt?: InputMaybe<Scalars["DateTime"]>;
  passwordResetRedeemedAt?: InputMaybe<Scalars["DateTime"]>;
  passwordResetToken?: InputMaybe<Scalars["String"]>;
  phone?: InputMaybe<Scalars["String"]>;
  role?: InputMaybe<RoleRelateToOneForUpdateInput>;
  searches?: InputMaybe<SearchRelateToManyForUpdateInput>;
  updatedAt?: InputMaybe<Scalars["DateTime"]>;
};

export type UserWhereInput = {
  AND?: InputMaybe<Array<UserWhereInput>>;
  NOT?: InputMaybe<Array<UserWhereInput>>;
  OR?: InputMaybe<Array<UserWhereInput>>;
  createdAt?: InputMaybe<DateTimeFilter>;
  email?: InputMaybe<StringFilter>;
  enquiries?: InputMaybe<EnquiryManyRelationFilter>;
  favorites?: InputMaybe<FavoriteManyRelationFilter>;
  firstName?: InputMaybe<StringFilter>;
  followUpBossId?: InputMaybe<IntNullableFilter>;
  id?: InputMaybe<IdFilter>;
  lastName?: InputMaybe<StringFilter>;
  managedEnquiries?: InputMaybe<EnquiryManyRelationFilter>;
  passwordResetIssuedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetRedeemedAt?: InputMaybe<DateTimeNullableFilter>;
  passwordResetToken?: InputMaybe<PasswordFilter>;
  phone?: InputMaybe<StringFilter>;
  role?: InputMaybe<RoleWhereInput>;
  searches?: InputMaybe<SearchManyRelationFilter>;
  updatedAt?: InputMaybe<DateTimeFilter>;
};

export type UserWhereUniqueInput = {
  email?: InputMaybe<Scalars["String"]>;
  id?: InputMaybe<Scalars["ID"]>;
};

export type ValidateUserPasswordResetTokenResult = {
  __typename?: "ValidateUserPasswordResetTokenResult";
  code: PasswordResetRedemptionErrorCode;
  message: Scalars["String"];
};

export type FloorPlanFieldsFragment = {
  __typename: "FloorPlan";
  id: string;
  bathrooms?: number | null;
  bedrooms?: number | null;
  floorPlanImage?: string | null;
  maxPrice?: number | null;
  minPrice?: number | null;
  name?: string | null;
  title?: string | null;
  squareFootage?: number | null;
  squareFootageMax?: number | null;
  unitsCount?: number | null;
};

export type ApartmentImageFieldsFragment = {
  __typename?: "ApartmentImage";
  id: string;
  default?: boolean | null;
  url?: string | null;
  type?: ApartmentImageTypeType | null;
  apartment?: { __typename?: "Apartment"; id: string } | null;
  cloudinaryImage?: { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null } | null;
};

export type UserFieldsFragment = {
  __typename?: "User";
  id: string;
  email?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  phone?: string | null;
  fullName?: string | null;
  role?: {
    __typename?: "Role";
    id: string;
    name?: string | null;
    canManageUsers?: boolean | null;
    canManageLeads?: boolean | null;
    canManageContent?: boolean | null;
  } | null;
};

export type EnquiryFieldsFragment = {
  __typename?: "Enquiry";
  id: string;
  message?: string | null;
  preferredTime?: any | null;
  createdAt?: any | null;
  updatedAt?: any | null;
  assignedTo?: {
    __typename?: "User";
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    fullName?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
      canManageUsers?: boolean | null;
      canManageLeads?: boolean | null;
      canManageContent?: boolean | null;
    } | null;
  } | null;
  user?: {
    __typename?: "User";
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    fullName?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
      canManageUsers?: boolean | null;
      canManageLeads?: boolean | null;
      canManageContent?: boolean | null;
    } | null;
  } | null;
  apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
};

export type ApartmentFieldsFragment = {
  __typename?: "Apartment";
  id: string;
  area?: string | null;
  city?: string | null;
  name?: string | null;
  street?: string | null;
  unitsCount?: number | null;
  minPrice?: number | null;
};

export type DeleteApartmentImageMutationVariables = Exact<{
  where: ApartmentImageWhereUniqueInput;
}>;

export type DeleteApartmentImageMutation = {
  __typename?: "Mutation";
  deleteApartmentImage?: {
    __typename?: "ApartmentImage";
    id: string;
    default?: boolean | null;
    url?: string | null;
    type?: ApartmentImageTypeType | null;
    apartment?: { __typename?: "Apartment"; id: string } | null;
    cloudinaryImage?: { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null } | null;
  } | null;
};

export type UpdateApartmentImageMutationVariables = Exact<{
  where: ApartmentImageWhereUniqueInput;
  data: ApartmentImageUpdateInput;
}>;

export type UpdateApartmentImageMutation = {
  __typename?: "Mutation";
  updateApartmentImage?: {
    __typename?: "ApartmentImage";
    id: string;
    default?: boolean | null;
    url?: string | null;
    type?: ApartmentImageTypeType | null;
    apartment?: { __typename?: "Apartment"; id: string } | null;
    cloudinaryImage?: { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null } | null;
  } | null;
};

export type AssignEnquiryToUserMutationVariables = Exact<{
  enquiryId: Scalars["ID"];
}>;

export type AssignEnquiryToUserMutation = {
  __typename?: "Mutation";
  assignEnquiryToUser?: {
    __typename?: "Enquiry";
    id: string;
    message?: string | null;
    preferredTime?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
  } | null;
};

export type RemoveEnquiryFromUserMutationVariables = Exact<{
  enquiryId: Scalars["ID"];
}>;

export type RemoveEnquiryFromUserMutation = {
  __typename?: "Mutation";
  removeEnquiryFromUser?: {
    __typename?: "Enquiry";
    id: string;
    message?: string | null;
    preferredTime?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
  } | null;
};

export type UpdateImagesOrderMutationVariables = Exact<{
  images: Array<Scalars["ID"]> | Scalars["ID"];
}>;

export type UpdateImagesOrderMutation = { __typename?: "Mutation"; updateImagesOrder?: boolean | null };

export type SendPromotionalEmailMutationVariables = Exact<{
  data: PromotionEmailInput;
}>;

export type SendPromotionalEmailMutation = { __typename?: "Mutation"; sendPromotionalEmail?: boolean | null };

export type FollowUpBossPeopleCreatedMutationVariables = Exact<{
  userIds: Array<Scalars["String"]> | Scalars["String"];
}>;

export type FollowUpBossPeopleCreatedMutation = { __typename?: "Mutation"; followUpBossPeopleCreated?: boolean | null };

export type FindApartmentImagesQueryVariables = Exact<{
  where: ApartmentImageWhereInput;
  orderBy: Array<ApartmentImageOrderByInput> | ApartmentImageOrderByInput;
}>;

export type FindApartmentImagesQuery = {
  __typename?: "Query";
  apartmentImages?: Array<{
    __typename?: "ApartmentImage";
    id: string;
    default?: boolean | null;
    url?: string | null;
    type?: ApartmentImageTypeType | null;
    apartment?: { __typename?: "Apartment"; id: string } | null;
    cloudinaryImage?: { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null } | null;
  }> | null;
};

export type FindFloorPlansQueryVariables = Exact<{
  where: FloorPlanWhereInput;
  orderBy: Array<FloorPlanOrderByInput> | FloorPlanOrderByInput;
}>;

export type FindFloorPlansQuery = {
  __typename?: "Query";
  floorPlans?: Array<{
    __typename: "FloorPlan";
    id: string;
    bathrooms?: number | null;
    bedrooms?: number | null;
    floorPlanImage?: string | null;
    maxPrice?: number | null;
    minPrice?: number | null;
    name?: string | null;
    title?: string | null;
    squareFootage?: number | null;
    squareFootageMax?: number | null;
    unitsCount?: number | null;
  }> | null;
};

export type AuthenticatedItemQueryVariables = Exact<{ [key: string]: never }>;

export type AuthenticatedItemQuery = {
  __typename?: "Query";
  authenticatedItem?: {
    __typename?: "User";
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    fullName?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
      canManageUsers?: boolean | null;
      canManageLeads?: boolean | null;
      canManageContent?: boolean | null;
    } | null;
  } | null;
};

export type GetEnquiryByIdQueryVariables = Exact<{
  id: Scalars["ID"];
}>;

export type GetEnquiryByIdQuery = {
  __typename?: "Query";
  enquiries?: Array<{
    __typename?: "Enquiry";
    id: string;
    message?: string | null;
    preferredTime?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
  }> | null;
};

export type GetUnassignedEnquiriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetUnassignedEnquiriesQuery = {
  __typename?: "Query";
  getUnAssignedEnquiries?: Array<{
    __typename?: "Enquiry";
    id: string;
    message?: string | null;
    preferredTime?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
  }> | null;
};

export type GetMyAssignedEnquiriesQueryVariables = Exact<{ [key: string]: never }>;

export type GetMyAssignedEnquiriesQuery = {
  __typename?: "Query";
  getMyAssignedEnquiries?: Array<{
    __typename?: "Enquiry";
    id: string;
    message?: string | null;
    preferredTime?: any | null;
    createdAt?: any | null;
    updatedAt?: any | null;
    assignedTo?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    user?: {
      __typename?: "User";
      id: string;
      email?: string | null;
      firstName?: string | null;
      lastName?: string | null;
      phone?: string | null;
      fullName?: string | null;
      role?: {
        __typename?: "Role";
        id: string;
        name?: string | null;
        canManageUsers?: boolean | null;
        canManageLeads?: boolean | null;
        canManageContent?: boolean | null;
      } | null;
    } | null;
    apartment?: { __typename?: "Apartment"; id: string; name?: string | null } | null;
  }> | null;
};

export type FavoritesQueryVariables = Exact<{
  where: FavoriteWhereInput;
  orderBy: Array<FavoriteOrderByInput> | FavoriteOrderByInput;
  imageOrderBy: Array<ApartmentImageOrderByInput> | ApartmentImageOrderByInput;
  take?: InputMaybe<Scalars["Int"]>;
}>;

export type FavoritesQuery = {
  __typename?: "Query";
  favorites?: Array<{
    __typename?: "Favorite";
    apartment?: {
      __typename?: "Apartment";
      id: string;
      area?: string | null;
      city?: string | null;
      name?: string | null;
      street?: string | null;
      unitsCount?: number | null;
      minPrice?: number | null;
      images?: Array<{
        __typename?: "ApartmentImage";
        id: string;
        url?: string | null;
        default?: boolean | null;
        order?: number | null;
        cloudinaryImage?: { __typename?: "CloudinaryImage_File"; publicUrlTransformed?: string | null } | null;
      }> | null;
    } | null;
  }> | null;
};

export type ApartmentQueryVariables = Exact<{
  where: ApartmentWhereUniqueInput;
}>;

export type ApartmentQuery = {
  __typename?: "Query";
  apartment?: {
    __typename?: "Apartment";
    id: string;
    area?: string | null;
    city?: string | null;
    name?: string | null;
    street?: string | null;
    unitsCount?: number | null;
    minPrice?: number | null;
  } | null;
};

export type SearchesQueryVariables = Exact<{
  where: SearchWhereInput;
}>;

export type SearchesQuery = {
  __typename?: "Query";
  searches?: Array<{ __typename?: "Search"; id: string; name?: string | null; url?: string | null }> | null;
};

export type AllApartmentsForFilterQueryVariables = Exact<{
  orderBy: Array<ApartmentOrderByInput> | ApartmentOrderByInput;
  imagesOrderBy: Array<ApartmentImageOrderByInput> | ApartmentImageOrderByInput;
}>;

export type AllApartmentsForFilterQuery = {
  __typename?: "Query";
  apartments?: Array<{
    __typename?: "Apartment";
    id: string;
    name?: string | null;
    description?: string | null;
    area?: string | null;
    neighborhood?: string | null;
    city?: string | null;
    lat?: number | null;
    lng?: number | null;
    minPrice?: number | null;
    unitsCount?: number | null;
    images?: Array<{
      __typename?: "ApartmentImage";
      id: string;
      url?: string | null;
      cloudinaryImage?: { __typename?: "CloudinaryImage_File"; id?: string | null; publicUrlTransformed?: string | null } | null;
    }> | null;
    amenities?: Array<{ __typename?: "Amenity"; id: string; displayName?: string | null }> | null;
  }> | null;
};

export type AmenitiesQueryVariables = Exact<{
  orderBy: Array<AmenityOrderByInput> | AmenityOrderByInput;
}>;

export type AmenitiesQuery = {
  __typename?: "Query";
  amenities?: Array<{ __typename?: "Amenity"; id: string; name?: string | null }> | null;
};

export type UserApartmentPromotionalEmailApartmentResultsQueryVariables = Exact<{
  aptWhere: ApartmentWhereInput;
  take?: InputMaybe<Scalars["Int"]>;
}>;

export type UserApartmentPromotionalEmailApartmentResultsQuery = {
  __typename?: "Query";
  apartments?: Array<{
    __typename?: "Apartment";
    id: string;
    name?: string | null;
    area?: string | null;
    lat?: number | null;
    lng?: number | null;
    unitsCount?: number | null;
    minPrice?: number | null;
    images?: Array<{
      __typename?: "ApartmentImage";
      id: string;
      url?: string | null;
      order?: number | null;
      cloudinaryImage?: { __typename?: "CloudinaryImage_File"; id?: string | null; publicUrlTransformed?: string | null } | null;
    }> | null;
  }> | null;
};

export type UsersQueryVariables = Exact<{ [key: string]: never }>;

export type UsersQuery = {
  __typename?: "Query";
  users?: Array<{
    __typename?: "User";
    id: string;
    email?: string | null;
    firstName?: string | null;
    lastName?: string | null;
    phone?: string | null;
    fullName?: string | null;
    role?: {
      __typename?: "Role";
      id: string;
      name?: string | null;
      canManageUsers?: boolean | null;
      canManageLeads?: boolean | null;
      canManageContent?: boolean | null;
    } | null;
  }> | null;
};

export const FloorPlanFieldsFragmentDoc = gql`
  fragment FloorPlanFields on FloorPlan {
    __typename
    id
    bathrooms
    bedrooms
    floorPlanImage
    maxPrice
    minPrice
    name
    title
    squareFootage
    squareFootageMax
    unitsCount
  }
`;
export const ApartmentImageFieldsFragmentDoc = gql`
  fragment ApartmentImageFields on ApartmentImage {
    id
    apartment {
      id
    }
    default
    url
    type
    cloudinaryImage {
      publicUrlTransformed
    }
  }
`;
export const UserFieldsFragmentDoc = gql`
  fragment UserFields on User {
    id
    email
    firstName
    lastName
    phone
    fullName
    role {
      id
      name
      canManageUsers
      canManageLeads
      canManageContent
    }
  }
`;
export const EnquiryFieldsFragmentDoc = gql`
  fragment EnquiryFields on Enquiry {
    id
    message
    preferredTime
    assignedTo {
      ...UserFields
    }
    user {
      ...UserFields
    }
    apartment {
      id
      name
    }
    createdAt
    updatedAt
  }
  ${UserFieldsFragmentDoc}
`;
export const ApartmentFieldsFragmentDoc = gql`
  fragment ApartmentFields on Apartment {
    id
    area
    city
    name
    street
    unitsCount
    minPrice
  }
`;
export const DeleteApartmentImageDocument = gql`
  mutation DeleteApartmentImage($where: ApartmentImageWhereUniqueInput!) {
    deleteApartmentImage(where: $where) {
      ...ApartmentImageFields
    }
  }
  ${ApartmentImageFieldsFragmentDoc}
`;
export const UpdateApartmentImageDocument = gql`
  mutation UpdateApartmentImage($where: ApartmentImageWhereUniqueInput!, $data: ApartmentImageUpdateInput!) {
    updateApartmentImage(where: $where, data: $data) {
      ...ApartmentImageFields
    }
  }
  ${ApartmentImageFieldsFragmentDoc}
`;
export const AssignEnquiryToUserDocument = gql`
  mutation AssignEnquiryToUser($enquiryId: ID!) {
    assignEnquiryToUser(enquiryId: $enquiryId) {
      ...EnquiryFields
    }
  }
  ${EnquiryFieldsFragmentDoc}
`;
export const RemoveEnquiryFromUserDocument = gql`
  mutation RemoveEnquiryFromUser($enquiryId: ID!) {
    removeEnquiryFromUser(enquiryId: $enquiryId) {
      ...EnquiryFields
    }
  }
  ${EnquiryFieldsFragmentDoc}
`;
export const UpdateImagesOrderDocument = gql`
  mutation UpdateImagesOrder($images: [ID!]!) {
    updateImagesOrder(images: $images)
  }
`;
export const SendPromotionalEmailDocument = gql`
  mutation SendPromotionalEmail($data: PromotionEmailInput!) {
    sendPromotionalEmail(data: $data)
  }
`;
export const FollowUpBossPeopleCreatedDocument = gql`
  mutation FollowUpBossPeopleCreated($userIds: [String!]!) {
    followUpBossPeopleCreated(userIds: $userIds)
  }
`;
export const FindApartmentImagesDocument = gql`
  query FindApartmentImages($where: ApartmentImageWhereInput!, $orderBy: [ApartmentImageOrderByInput!]!) {
    apartmentImages(where: $where, orderBy: $orderBy) {
      ...ApartmentImageFields
    }
  }
  ${ApartmentImageFieldsFragmentDoc}
`;
export const FindFloorPlansDocument = gql`
  query FindFloorPlans($where: FloorPlanWhereInput!, $orderBy: [FloorPlanOrderByInput!]!) {
    floorPlans(where: $where, orderBy: $orderBy) {
      ...FloorPlanFields
    }
  }
  ${FloorPlanFieldsFragmentDoc}
`;
export const AuthenticatedItemDocument = gql`
  query AuthenticatedItem {
    authenticatedItem {
      ... on User {
        ...UserFields
      }
    }
  }
  ${UserFieldsFragmentDoc}
`;
export const GetEnquiryByIdDocument = gql`
  query GetEnquiryByID($id: ID!) {
    enquiries(where: { id: { equals: $id } }) {
      ...EnquiryFields
    }
  }
  ${EnquiryFieldsFragmentDoc}
`;
export const GetUnassignedEnquiriesDocument = gql`
  query GetUnassignedEnquiries {
    getUnAssignedEnquiries {
      ...EnquiryFields
    }
  }
  ${EnquiryFieldsFragmentDoc}
`;
export const GetMyAssignedEnquiriesDocument = gql`
  query GetMyAssignedEnquiries {
    getMyAssignedEnquiries {
      ...EnquiryFields
    }
  }
  ${EnquiryFieldsFragmentDoc}
`;
export const FavoritesDocument = gql`
  query Favorites(
    $where: FavoriteWhereInput!
    $orderBy: [FavoriteOrderByInput!]!
    $imageOrderBy: [ApartmentImageOrderByInput!]!
    $take: Int
  ) {
    favorites(where: $where, orderBy: $orderBy) {
      apartment {
        ...ApartmentFields
        images(orderBy: $imageOrderBy, take: $take) {
          id
          cloudinaryImage {
            publicUrlTransformed
          }
          url
          default
          order
        }
      }
    }
  }
  ${ApartmentFieldsFragmentDoc}
`;
export const ApartmentDocument = gql`
  query Apartment($where: ApartmentWhereUniqueInput!) {
    apartment(where: $where) {
      ...ApartmentFields
    }
  }
  ${ApartmentFieldsFragmentDoc}
`;
export const SearchesDocument = gql`
  query Searches($where: SearchWhereInput!) {
    searches(where: $where) {
      id
      name
      url
    }
  }
`;
export const AllApartmentsForFilterDocument = gql`
  query AllApartmentsForFilter($orderBy: [ApartmentOrderByInput!]!, $imagesOrderBy: [ApartmentImageOrderByInput!]!) {
    apartments(orderBy: $orderBy) {
      id
      name
      description
      area
      neighborhood
      city
      lat
      lng
      minPrice
      unitsCount
      images(orderBy: $imagesOrderBy) {
        id
        cloudinaryImage {
          id
          publicUrlTransformed
        }
        url
      }
      amenities {
        id
        displayName
      }
    }
  }
`;
export const AmenitiesDocument = gql`
  query Amenities($orderBy: [AmenityOrderByInput!]!) {
    amenities(orderBy: $orderBy) {
      id
      name
    }
  }
`;
export const UserApartmentPromotionalEmailApartmentResultsDocument = gql`
  query UserApartmentPromotionalEmailApartmentResults($aptWhere: ApartmentWhereInput!, $take: Int) {
    apartments(where: $aptWhere, take: $take) {
      id
      name
      area
      lat
      lng
      unitsCount
      minPrice
      images(orderBy: { order: asc }, take: 1) {
        id
        cloudinaryImage {
          id
          publicUrlTransformed
        }
        url
        order
      }
    }
  }
`;
export const UsersDocument = gql`
  query Users {
    users {
      ...UserFields
    }
  }
  ${UserFieldsFragmentDoc}
`;

export type SdkFunctionWrapper = <T>(
  action: (requestHeaders?: Record<string, string>) => Promise<T>,
  operationName: string,
  operationType?: string
) => Promise<T>;

const defaultWrapper: SdkFunctionWrapper = (action, _operationName, _operationType) => action();

export function getSdk(client: GraphQLClient, withWrapper: SdkFunctionWrapper = defaultWrapper) {
  return {
    DeleteApartmentImage(
      variables: DeleteApartmentImageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<DeleteApartmentImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<DeleteApartmentImageMutation>(DeleteApartmentImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "DeleteApartmentImage",
        "mutation"
      );
    },
    UpdateApartmentImage(
      variables: UpdateApartmentImageMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateApartmentImageMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateApartmentImageMutation>(UpdateApartmentImageDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "UpdateApartmentImage",
        "mutation"
      );
    },
    AssignEnquiryToUser(
      variables: AssignEnquiryToUserMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AssignEnquiryToUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AssignEnquiryToUserMutation>(AssignEnquiryToUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "AssignEnquiryToUser",
        "mutation"
      );
    },
    RemoveEnquiryFromUser(
      variables: RemoveEnquiryFromUserMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<RemoveEnquiryFromUserMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<RemoveEnquiryFromUserMutation>(RemoveEnquiryFromUserDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "RemoveEnquiryFromUser",
        "mutation"
      );
    },
    UpdateImagesOrder(
      variables: UpdateImagesOrderMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UpdateImagesOrderMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UpdateImagesOrderMutation>(UpdateImagesOrderDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "UpdateImagesOrder",
        "mutation"
      );
    },
    SendPromotionalEmail(
      variables: SendPromotionalEmailMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<SendPromotionalEmailMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SendPromotionalEmailMutation>(SendPromotionalEmailDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "SendPromotionalEmail",
        "mutation"
      );
    },
    FollowUpBossPeopleCreated(
      variables: FollowUpBossPeopleCreatedMutationVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FollowUpBossPeopleCreatedMutation> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FollowUpBossPeopleCreatedMutation>(FollowUpBossPeopleCreatedDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "FollowUpBossPeopleCreated",
        "mutation"
      );
    },
    FindApartmentImages(
      variables: FindApartmentImagesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<FindApartmentImagesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindApartmentImagesQuery>(FindApartmentImagesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "FindApartmentImages",
        "query"
      );
    },
    FindFloorPlans(variables: FindFloorPlansQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FindFloorPlansQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FindFloorPlansQuery>(FindFloorPlansDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "FindFloorPlans",
        "query"
      );
    },
    AuthenticatedItem(
      variables?: AuthenticatedItemQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AuthenticatedItemQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AuthenticatedItemQuery>(AuthenticatedItemDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "AuthenticatedItem",
        "query"
      );
    },
    GetEnquiryByID(variables: GetEnquiryByIdQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<GetEnquiryByIdQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetEnquiryByIdQuery>(GetEnquiryByIdDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "GetEnquiryByID",
        "query"
      );
    },
    GetUnassignedEnquiries(
      variables?: GetUnassignedEnquiriesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetUnassignedEnquiriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetUnassignedEnquiriesQuery>(GetUnassignedEnquiriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "GetUnassignedEnquiries",
        "query"
      );
    },
    GetMyAssignedEnquiries(
      variables?: GetMyAssignedEnquiriesQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<GetMyAssignedEnquiriesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<GetMyAssignedEnquiriesQuery>(GetMyAssignedEnquiriesDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "GetMyAssignedEnquiries",
        "query"
      );
    },
    Favorites(variables: FavoritesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<FavoritesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<FavoritesQuery>(FavoritesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "Favorites",
        "query"
      );
    },
    Apartment(variables: ApartmentQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<ApartmentQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<ApartmentQuery>(ApartmentDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "Apartment",
        "query"
      );
    },
    Searches(variables: SearchesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<SearchesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<SearchesQuery>(SearchesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "Searches",
        "query"
      );
    },
    AllApartmentsForFilter(
      variables: AllApartmentsForFilterQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<AllApartmentsForFilterQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AllApartmentsForFilterQuery>(AllApartmentsForFilterDocument, variables, {
            ...requestHeaders,
            ...wrappedRequestHeaders
          }),
        "AllApartmentsForFilter",
        "query"
      );
    },
    Amenities(variables: AmenitiesQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<AmenitiesQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<AmenitiesQuery>(AmenitiesDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "Amenities",
        "query"
      );
    },
    UserApartmentPromotionalEmailApartmentResults(
      variables: UserApartmentPromotionalEmailApartmentResultsQueryVariables,
      requestHeaders?: Dom.RequestInit["headers"]
    ): Promise<UserApartmentPromotionalEmailApartmentResultsQuery> {
      return withWrapper(
        (wrappedRequestHeaders) =>
          client.request<UserApartmentPromotionalEmailApartmentResultsQuery>(
            UserApartmentPromotionalEmailApartmentResultsDocument,
            variables,
            { ...requestHeaders, ...wrappedRequestHeaders }
          ),
        "UserApartmentPromotionalEmailApartmentResults",
        "query"
      );
    },
    Users(variables?: UsersQueryVariables, requestHeaders?: Dom.RequestInit["headers"]): Promise<UsersQuery> {
      return withWrapper(
        (wrappedRequestHeaders) => client.request<UsersQuery>(UsersDocument, variables, { ...requestHeaders, ...wrappedRequestHeaders }),
        "Users",
        "query"
      );
    }
  };
}
export type Sdk = ReturnType<typeof getSdk>;
