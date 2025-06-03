import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Admin_Key {
  id: UUIDString;
  __typename?: 'Admin_Key';
}

export interface CreateUserData {
  user_insert: User_Key;
}

export interface Driver_Key {
  id: UUIDString;
  __typename?: 'Driver_Key';
}

export interface GetRideHistoryForTouristData {
  rides: ({
    id: UUIDString;
    pickupLocation: string;
    dropoffLocation: string;
    requestedAt: TimestampString;
    status: string;
    driver?: {
      user: {
        displayName?: string | null;
      };
    };
  } & Ride_Key)[];
}

export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    email: string;
    userType: string;
  } & User_Key)[];
}

export interface ListAvailableDriversData {
  drivers: ({
    id: UUIDString;
    user: {
      displayName?: string | null;
      phoneNumber?: string | null;
    };
      vehicleDetails: string;
  } & Driver_Key)[];
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

export interface RequestRideData {
  ride_insert: Ride_Key;
}

export interface RequestRideVariables {
  touristId: UUIDString;
  pickupLocation: string;
  dropoffLocation: string;
}

export interface RideRating_Key {
  id: UUIDString;
  __typename?: 'RideRating_Key';
}

export interface Ride_Key {
  id: UUIDString;
  __typename?: 'Ride_Key';
}

export interface SubmitRideRatingData {
  rideRating_insert: RideRating_Key;
}

export interface SubmitRideRatingVariables {
  rideId: UUIDString;
  rating: number;
  review: string;
}

export interface Tourist_Key {
  id: UUIDString;
  __typename?: 'Tourist_Key';
}

export interface UpdateDriverAvailabilityData {
  driver_update?: Driver_Key | null;
}

export interface UpdateDriverAvailabilityVariables {
  driverId: UUIDString;
  isAvailable: boolean;
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

interface CreateUserRef {
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
  operationName: string;
}
export const createUserRef: CreateUserRef;

export function createUser(): MutationPromise<CreateUserData, undefined>;
export function createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface ListAvailableDriversRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableDriversData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAvailableDriversData, undefined>;
  operationName: string;
}
export const listAvailableDriversRef: ListAvailableDriversRef;

export function listAvailableDrivers(): QueryPromise<ListAvailableDriversData, undefined>;
export function listAvailableDrivers(dc: DataConnect): QueryPromise<ListAvailableDriversData, undefined>;

interface RequestRideRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
  operationName: string;
}
export const requestRideRef: RequestRideRef;

export function requestRide(vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;
export function requestRide(dc: DataConnect, vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface SubmitRideRatingRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitRideRatingVariables): MutationRef<SubmitRideRatingData, SubmitRideRatingVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: SubmitRideRatingVariables): MutationRef<SubmitRideRatingData, SubmitRideRatingVariables>;
  operationName: string;
}
export const submitRideRatingRef: SubmitRideRatingRef;

export function submitRideRating(vars: SubmitRideRatingVariables): MutationPromise<SubmitRideRatingData, SubmitRideRatingVariables>;
export function submitRideRating(dc: DataConnect, vars: SubmitRideRatingVariables): MutationPromise<SubmitRideRatingData, SubmitRideRatingVariables>;

interface GetRideHistoryForTouristRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRideHistoryForTouristData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<GetRideHistoryForTouristData, undefined>;
  operationName: string;
}
export const getRideHistoryForTouristRef: GetRideHistoryForTouristRef;

export function getRideHistoryForTourist(): QueryPromise<GetRideHistoryForTouristData, undefined>;
export function getRideHistoryForTourist(dc: DataConnect): QueryPromise<GetRideHistoryForTouristData, undefined>;

interface UpdateDriverAvailabilityRef {
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDriverAvailabilityVariables): MutationRef<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect, vars: UpdateDriverAvailabilityVariables): MutationRef<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
  operationName: string;
}
export const updateDriverAvailabilityRef: UpdateDriverAvailabilityRef;

export function updateDriverAvailability(vars: UpdateDriverAvailabilityVariables): MutationPromise<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
export function updateDriverAvailability(dc: DataConnect, vars: UpdateDriverAvailabilityVariables): MutationPromise<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;

interface ListAllUsersRef {
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
  /* Allow users to pass in custom DataConnect instances */
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
  operationName: string;
}
export const listAllUsersRef: ListAllUsersRef;

export function listAllUsers(): QueryPromise<ListAllUsersData, undefined>;
export function listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

