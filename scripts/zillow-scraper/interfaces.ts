export interface APIResponse {
  data: {
    building: Building;
  };
  errors: Array<{ message: string; path: string[] }>;
}

export interface Building {
  regionIds: RegionIds;
  adTargets: AdTargets;
  __typename: string;
  breadcrumbs?: BreadcrumbsEntity[] | null;
  buildingName: string;
  streetAddress: string;
  latitude: number;
  longitude: number;
  streetViewTileImageUrlLocationModuleLatLong: string;
  streetViewTileImageUrlLocationModuleAddress: string;
  lotId: string;
  streetViewMetadataUrlMediaWallLatLong: string;
  streetViewMetadataUrlMediaWallAddress: string;
  mapTileGoogleMapUrlLocationModule: string;
  mapTileGoogleMapUrlFullWidthMax: string;
  thumb?: ThumbEntityOrPhotosEntityOrPhoto[] | null;
  address: Address;
  streetViewTileImageUrlHalfWidthLatLong: string;
  streetViewTileImageUrlHalfWidthAddress: string;
  city: string;
  state: string;
  zipcode: string;
  isWaitlisted: boolean;
  contactInfo: ContactInfo;
  isLandlordLiaisonProgram: boolean;
  buildingType: string;
  isInstantTourEnabled: boolean;
  bestGuessTimezone: string;
  rentalInstantTour?: null;
  photoCount: number;
  amenitiesVRModels?: null;
  galleryPhotos?: GalleryPhotosEntity[] | null;
  galleryAmenityPhotos?: GalleryAmenityPhotosEntity[] | null;
  fullAddress: string;
  bdpUrl: string;
  zpid: string;
  buildingPhoneNumber: string;
  county: string;
  listingFeatureType: string;
  ungroupedUnits?: null;
  floorPlans?: FloorPlansEntity[] | null;
  isRentalsLeadCapMet?: null;
  buildingAttributes: BuildingAttributes;
  nearbyCities?: NearbyCitiesEntityOrNearbyNeighborhoodsEntityOrNearbyZipcodesEntity[] | null;
  nearbyNeighborhoods?: NearbyCitiesEntityOrNearbyNeighborhoodsEntityOrNearbyZipcodesEntity[] | null;
  country: string;
  nearbyZipcodes?: NearbyCitiesEntityOrNearbyNeighborhoodsEntityOrNearbyZipcodesEntity[] | null;
  nearbyBuildingLinks?: NearbyBuildingLinksEntity[] | null;
  amenitySummary: AmenitySummary;
  comps: Comps;
  isLowIncome: boolean;
  isSeniorHousing: boolean;
  isStudentHousing: boolean;
  ppcLink: PpcLink;
  reviewsInfo?: null;
  localProtections: LocalProtections;
  buildingRentalPremiumPackagesInfo?: BuildingRentalPremiumPackagesInfoEntity[] | null;
  schoolSearchUrl: SchoolSearchUrl;
  citySearchUrl: CitySearchUrl;
  assignedSchools?: AssignedSchoolsEntity[] | null;
  nearbyAmenities?: null[] | null;
  walkScore: WalkScore;
  transitScore: TransitScore;
  description: string;
  amenityDetails: AmenityDetails;
  homeInsights?: null;
  bestMatchedUnit: BestMatchedUnit;
  hasPublicVideo: boolean;
  photos?: PhotosEntityOrAmenityPhotosEntity[] | null;
  amenityPhotos?: PhotosEntityOrAmenityPhotosEntity[] | null;
  staticMap: string;
  staticMapSatellite: string;
  streetViewLatLong: string;
  streetViewAddress: string;
  thirdPartyVirtualTours?: null[] | null;
  videos?: null[] | null;
  currency: string;
  detailedPetPolicy: DetailedPetPolicy;
  specialOffers?: null[] | null;
  listingMetadata: ListingMetadata;
  screeningCriteria?: null;
  vaLoanStatus?: null;
  engrain?: null;
  homeTypes?: string[] | null;
  unitsVRModels?: null;
}
export interface RegionIds {
  city: number;
  __typename: string;
}
export interface AdTargets {
  premieragent: string;
  fsbid: string;
  aamgnrc1: string;
  city: string;
  state: string;
  zip: string;
  mlat: string;
  mlong: string;
  listtp: string;
  proptp: string;
  sqft: string;
  sqftrange: string;
  price: string;
  prange: string;
  bd: string;
  pid: string;
  ba: string;
}
export interface BreadcrumbsEntity {
  path: string;
  text: string;
  gaLabel: string;
  __typename: string;
}
export interface ThumbEntityOrPhotosEntityOrPhoto {
  url: string;
  __typename: string;
}
export interface Address {
  streetAddress: string;
  city: string;
  state: string;
  zipcode: string;
  __typename: string;
  neighborhood?: null;
}
export interface ContactInfo {
  contactType: string;
  __typename: string;
  rentalApplicationsAcceptedType: string;
  providerListingID: string;
}
export interface GalleryPhotosEntity {
  caption: string;
  mixedSources: MixedSources;
  url: string;
  __typename: string;
  sources?: WebpEntityOrJpegEntityOrSourcesEntity[] | null;
}
export interface MixedSources {
  webp?: WebpEntityOrJpegEntityOrSourcesEntity[] | null;
  jpeg?: WebpEntityOrJpegEntityOrSourcesEntity[] | null;
  __typename: string;
}
export interface WebpEntityOrJpegEntityOrSourcesEntity {
  url: string;
  width: number;
  __typename: string;
}
export interface GalleryAmenityPhotosEntity {
  caption: string;
  mixedSources: MixedSources;
  url: string;
  __typename: string;
}
export interface FloorPlansEntity {
  zpid: string;
  __typename: string;
  units?: UnitsEntity[] | null;
  floorplanVRModel?: null;
  minPrice: number;
  maxPrice: number;
  availableFrom: string;
  baths: number;
  beds: number;
  floorPlanUnitPhotos?: (FloorPlanUnitPhotosEntity | null)[] | null;
  name: string;
  photos: ThumbEntityOrPhotosEntityOrPhoto[];
  sqft: number;
  thirdPartyVirtualTour?: null;
  vrModels?: null[] | null;
  maloneId?: null;
}
export interface UnitsEntity {
  unitNumber: string;
  zpid: string;
  __typename: string;
  housingConnector?: null;
  housingConnectorExclusive?: null;
  vrModel?: null;
  availableFrom: string;
  hasApprovedThirdPartyVirtualTour: boolean;
  price: number;
  minPrice?: null;
  maxPrice?: null;
  thirdPartyVirtualTour?: null;
  unitVRModel?: null;
}
export interface FloorPlanUnitPhotosEntity {
  caption?: null;
  url: string;
  __typename: string;
}
export interface BuildingAttributes {
  hasSharedLaundry: boolean;
  airConditioning: string;
  appliances?: string[] | null;
  parkingTypes?: string[] | null;
  detailedParkingPolicies?: null;
  outdoorCommonAreas?: string[] | null;
  hasBarbecue: boolean;
  heatingSource: string;
  detailedPetPolicy: DetailedPetPolicy1;
  petPolicies?: string[] | null;
  hasElevator?: null;
  __typename: string;
  communityRooms?: string[] | null;
  sportsCourts?: string[] | null;
  hasBicycleStorage?: null;
  hasGuestSuite: boolean;
  hasStorage: boolean;
  hasPetPark?: null;
  hasTwentyFourHourMaintenance?: null;
  hasDryCleaningDropOff?: null;
  hasOnlineRentPayment?: null;
  hasOnlineMaintenancePortal?: null;
  hasOnsiteManagement?: null;
  hasPackageService: boolean;
  hasValetTrash?: null;
  hasSpanishSpeakingStaff?: null;
  securityTypes?: string[] | null;
  viewType?: string[] | null;
  hasHotTub?: null;
  hasSauna: boolean;
  hasSwimmingPool: boolean;
  hasAssistedLiving: boolean;
  hasDisabledAccess?: null;
  floorCoverings?: string[] | null;
  communicationTypes?: string[] | null;
  hasCeilingFan?: null;
  hasFireplace?: null;
  hasPatioBalcony?: null;
  isFurnished?: null;
  customAmenities: string;
  parkingDescription?: null;
  petPolicyDescription?: null;
  parkingRentDescription?: null;
  isSmokeFree: boolean;
  applicationFee?: null;
  administrativeFee?: null;
  depositFeeMin?: null;
  depositFeeMax?: null;
  leaseTerms?: string[] | null;
  utilitiesIncluded?: string[] | null;
  leaseLengths: string;
}
export interface DetailedPetPolicy1 {
  general?: null;
  petPolicies?: PetPoliciesEntity[] | null;
  __typename: string;
}
export interface PetPoliciesEntity {
  allowed: boolean;
  __typename: string;
  comment?: null;
  deposit: number;
  description?: null;
  feeRangeMax?: null;
  feeRangeMin?: null;
  maxNumberAllowed: number;
  maxWeightAllowed: number;
  monthlyFee?: null;
  oneTimeFee?: null;
  petSize?: null;
  petType: string;
  restriction?: string | null;
}
export interface NearbyCitiesEntityOrNearbyNeighborhoodsEntityOrNearbyZipcodesEntity {
  buildingSearchUrl: BuildingSearchUrl;
  name: string;
  __typename: string;
}
export interface BuildingSearchUrl {
  path: string;
  __typename: string;
}
export interface NearbyBuildingLinksEntity {
  buildingUrl: BuildingUrl;
  __typename: string;
}
export interface BuildingUrl {
  path: string;
  text: string;
  __typename: string;
}
export interface AmenitySummary {
  buildingDetails?: null;
  __typename: string;
  laundry?: string[] | null;
}
export interface Comps {
  BuildingDataT?: null;
  BuildingDataU?: null;
  compRecentlySoldHomes?: null;
  __typename: string;
  compBuildings?: CompBuildingsEntity[] | null;
}
export interface CompBuildingsEntity {
  lotId: string;
  __typename: string;
  bdpLink: string;
  bedroomGroups?: BedroomGroupsEntity[] | null;
  buildingAddress: string;
  buildingName: string;
  latitude: number;
  longitude: number;
  maxPrice: number;
  minBaths: number;
  minBeds: number;
  minLivingArea: number;
  minPrice: number;
  photo: ThumbEntityOrPhotosEntityOrPhoto;
  photoCount?: null;
  showUpdateTime: boolean;
  listingMetadata: ListingMetadata1;
  providerListingId: string;
}
export interface BedroomGroupsEntity {
  beds: string;
  __typename: string;
}
export interface ListingMetadata1 {
  BuildingDataG: string;
  BuildingDataH: string;
  BuildingDataI: string;
  BuildingDataJ: string;
  BuildingDataL: string;
  BuildingDataM: string;
  BuildingDataN: string;
  BuildingDataO: string;
  BuildingDataP: string;
  __typename: string;
}
export interface PpcLink {
  path: string;
  mobile: boolean;
  __typename: string;
}
export interface LocalProtections {
  protectionLevels: ProtectionLevels;
  protections?: ProtectionsEntity[] | null;
  __typename: string;
}
export interface ProtectionLevels {
  lgbt: Lgbt;
  soi: SoiOrVoucher;
  voucher: SoiOrVoucher;
  __typename: string;
}
export interface Lgbt {
  level: string;
  statePageUrl: string;
  __typename: string;
}
export interface SoiOrVoucher {
  level: string;
  __typename: string;
}
export interface ProtectionsEntity {
  covers: Covers;
  description: string;
  type: string;
  __typename: string;
}
export interface Covers {
  genderIdentity: boolean;
  sexualOrientation: boolean;
  housingChoiceVoucher?: boolean | null;
  sourceOfIncome?: boolean | null;
  __typename: string;
}
export interface BuildingRentalPremiumPackagesInfoEntity {
  bdpLink: string;
  bedroomGroups?: null[] | null;
  buildingAddress: string;
  buildingName: string;
  lotId: string;
  latitude?: null;
  longitude?: null;
  maxPrice: number;
  minBaths: number;
  minBeds: number;
  minLivingArea: number;
  minPrice: number;
  photo: ThumbEntityOrPhotosEntityOrPhoto;
  photoCount?: null;
  showUpdateTime: boolean;
  listingMetadata: ListingMetadata1;
  providerListingId: string;
  __typename: string;
}
export interface SchoolSearchUrl {
  path?: null;
  __typename: string;
}
export interface CitySearchUrl {
  text: string;
  __typename: string;
}
export interface AssignedSchoolsEntity {
  distance: number;
  name: string;
  rating: number;
  level: string;
  studentsPerTeacher?: null;
  assigned?: null;
  grades: string;
  link: string;
  type: string;
  size: number;
  totalCount: number;
  isAssigned: boolean;
  __typename: string;
}
export interface WalkScore {
  walkscore: number;
  description: string;
  ws_link: string;
  __typename: string;
}
export interface TransitScore {
  transit_score: number;
  description: string;
  ws_link: string;
  __typename: string;
}
export interface AmenityDetails {
  hours?: string[] | null;
  __typename: string;
  pets?: string[] | null;
  petDetails?: null[] | null;
  customAmenities: CustomAmenities;
  unitFeatures?: string[] | null;
}
export interface CustomAmenities {
  rawAmenities?: string[] | null;
  __typename: string;
}
export interface BestMatchedUnit {
  hdpUrl: string;
  unitNumber: string;
  __typename: string;
  hasApprovedThirdPartyVirtualTour: boolean;
  thirdPartyVirtualTour?: null;
}
export interface PhotosEntityOrAmenityPhotosEntity {
  caption: string;
  mixedSources: MixedSources;
  __typename: string;
}
export interface DetailedPetPolicy {
  general?: null;
  petPolicies?: PetPoliciesEntity1[] | null;
  __typename: string;
}
export interface PetPoliciesEntity1 {
  allowed: boolean;
  comment?: null;
  deposit: number;
  description?: null;
  feeRangeMax?: null;
  feeRangeMin?: null;
  maxNumberAllowed: number;
  maxWeightAllowed: number;
  monthlyFee?: null;
  oneTimeFee?: null;
  petCare?: null;
  petSize?: null;
  petType: string;
  restriction?: string | null;
  __typename: string;
}
export interface ListingMetadata {
  BuildingDataG: string;
  BuildingDataH: string;
  BuildingDataI: string;
  BuildingDataJ: string;
  BuildingDataK: string;
  BuildingDataL: string;
  BuildingDataM: string;
  BuildingDataN: string;
  BuildingDataO: string;
  BuildingDataP: string;
  BuildingDataQ: string;
  __typename: string;
  BuildingDataA: boolean;
}
