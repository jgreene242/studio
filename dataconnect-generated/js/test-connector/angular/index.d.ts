import { CreateUserData, ListAvailableDriversData, RequestRideData, RequestRideVariables, SubmitRideRatingData, SubmitRideRatingVariables, GetRideHistoryForTouristData, UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables, ListAllUsersData } from '../';
import { ConnectorConfig, DataConnect, QueryRef, QueryPromise, MutationRef, MutationPromise} from '@angular/fire/data-connect';
import { CreateQueryResult, CreateMutationResult} from '@tanstack/angular-query-experimental';
import { CreateDataConnectQueryResult, CreateDataConnectQueryOptions, CreateDataConnectMutationResult, DataConnectMutationOptionsUndefinedMutationFn } from '@tanstack-query-firebase/angular/data-connect';
import { FirebaseError } from 'firebase/app';
import { Injector } from '@angular/core';

type CreateUserOptions = DataConnectMutationOptionsUndefinedMutationFn<CreateUserData, FirebaseError, undefined>;
export function injectCreateUser(options?: CreateUserOptions, injector?: Injector): CreateDataConnectMutationResult<CreateUserData, undefined, >;

export type ListAvailableDriversOptions = () => Omit<CreateDataConnectQueryOptions<ListAvailableDriversData, undefined>, 'queryFn'>;
export function injectListAvailableDrivers(options?: ListAvailableDriversOptions, injector?: Injector): CreateDataConnectQueryResult<ListAvailableDriversData, undefined>;

type RequestRideOptions = DataConnectMutationOptionsUndefinedMutationFn<RequestRideData, FirebaseError, RequestRideVariables>;
export function injectRequestRide(options?: RequestRideOptions, injector?: Injector): CreateDataConnectMutationResult<RequestRideData, RequestRideVariables, RequestRideVariables>;

type SubmitRideRatingOptions = DataConnectMutationOptionsUndefinedMutationFn<SubmitRideRatingData, FirebaseError, SubmitRideRatingVariables>;
export function injectSubmitRideRating(options?: SubmitRideRatingOptions, injector?: Injector): CreateDataConnectMutationResult<SubmitRideRatingData, SubmitRideRatingVariables, SubmitRideRatingVariables>;

export type GetRideHistoryForTouristOptions = () => Omit<CreateDataConnectQueryOptions<GetRideHistoryForTouristData, undefined>, 'queryFn'>;
export function injectGetRideHistoryForTourist(options?: GetRideHistoryForTouristOptions, injector?: Injector): CreateDataConnectQueryResult<GetRideHistoryForTouristData, undefined>;

type UpdateDriverAvailabilityOptions = DataConnectMutationOptionsUndefinedMutationFn<UpdateDriverAvailabilityData, FirebaseError, UpdateDriverAvailabilityVariables>;
export function injectUpdateDriverAvailability(options?: UpdateDriverAvailabilityOptions, injector?: Injector): CreateDataConnectMutationResult<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables, UpdateDriverAvailabilityVariables>;

export type ListAllUsersOptions = () => Omit<CreateDataConnectQueryOptions<ListAllUsersData, undefined>, 'queryFn'>;
export function injectListAllUsers(options?: ListAllUsersOptions, injector?: Injector): CreateDataConnectQueryResult<ListAllUsersData, undefined>;
