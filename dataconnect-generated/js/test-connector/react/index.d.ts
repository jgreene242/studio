import { CreateUserData, ListAvailableDriversData, RequestRideData, RequestRideVariables, SubmitRideRatingData, SubmitRideRatingVariables, GetRideHistoryForTouristData, UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables, ListAllUsersData } from '../';
import { UseDataConnectQueryResult, useDataConnectQueryOptions, UseDataConnectMutationResult, useDataConnectMutationOptions} from '@tanstack-query-firebase/react/data-connect';
import { UseQueryResult, UseMutationResult} from '@tanstack/react-query';
import { DataConnect } from 'firebase/data-connect';
import { FirebaseError } from 'firebase/app';


export function useCreateUser(options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;
export function useCreateUser(dc: DataConnect, options?: useDataConnectMutationOptions<CreateUserData, FirebaseError, void>): UseDataConnectMutationResult<CreateUserData, undefined>;

export function useListAvailableDrivers(options?: useDataConnectQueryOptions<ListAvailableDriversData>): UseDataConnectQueryResult<ListAvailableDriversData, undefined>;
export function useListAvailableDrivers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAvailableDriversData>): UseDataConnectQueryResult<ListAvailableDriversData, undefined>;

export function useRequestRide(options?: useDataConnectMutationOptions<RequestRideData, FirebaseError, RequestRideVariables>): UseDataConnectMutationResult<RequestRideData, RequestRideVariables>;
export function useRequestRide(dc: DataConnect, options?: useDataConnectMutationOptions<RequestRideData, FirebaseError, RequestRideVariables>): UseDataConnectMutationResult<RequestRideData, RequestRideVariables>;

export function useSubmitRideRating(options?: useDataConnectMutationOptions<SubmitRideRatingData, FirebaseError, SubmitRideRatingVariables>): UseDataConnectMutationResult<SubmitRideRatingData, SubmitRideRatingVariables>;
export function useSubmitRideRating(dc: DataConnect, options?: useDataConnectMutationOptions<SubmitRideRatingData, FirebaseError, SubmitRideRatingVariables>): UseDataConnectMutationResult<SubmitRideRatingData, SubmitRideRatingVariables>;

export function useGetRideHistoryForTourist(options?: useDataConnectQueryOptions<GetRideHistoryForTouristData>): UseDataConnectQueryResult<GetRideHistoryForTouristData, undefined>;
export function useGetRideHistoryForTourist(dc: DataConnect, options?: useDataConnectQueryOptions<GetRideHistoryForTouristData>): UseDataConnectQueryResult<GetRideHistoryForTouristData, undefined>;

export function useUpdateDriverAvailability(options?: useDataConnectMutationOptions<UpdateDriverAvailabilityData, FirebaseError, UpdateDriverAvailabilityVariables>): UseDataConnectMutationResult<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
export function useUpdateDriverAvailability(dc: DataConnect, options?: useDataConnectMutationOptions<UpdateDriverAvailabilityData, FirebaseError, UpdateDriverAvailabilityVariables>): UseDataConnectMutationResult<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;

export function useListAllUsers(options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
export function useListAllUsers(dc: DataConnect, options?: useDataConnectQueryOptions<ListAllUsersData>): UseDataConnectQueryResult<ListAllUsersData, undefined>;
