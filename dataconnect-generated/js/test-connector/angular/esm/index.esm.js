import { createUserRef, listAvailableDriversRef, requestRideRef, submitRideRatingRef, getRideHistoryForTouristRef, updateDriverAvailabilityRef, listAllUsersRef } from '../../';
import { DataConnect, CallerSdkTypeEnum } from '@angular/fire/data-connect';
import { injectDataConnectQuery, injectDataConnectMutation } from '@tanstack-query-firebase/angular/data-connect';
import { inject, EnvironmentInjector } from '@angular/core';
export function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListAvailableDrivers(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAvailableDriversRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectRequestRide(args, injector) {
  return injectDataConnectMutation(requestRideRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectSubmitRideRating(args, injector) {
  return injectDataConnectMutation(submitRideRatingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectGetRideHistoryForTourist(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  getRideHistoryForTouristRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectUpdateDriverAvailability(args, injector) {
  return injectDataConnectMutation(updateDriverAvailabilityRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

export function injectListAllUsers(options, injector) {
  const finalInjector = injector || inject(EnvironmentInjector);
  const dc = finalInjector.get(DataConnect);
  return injectDataConnectQuery(() => {
    const addOpn = options && options();
    return {
      queryFn: () =>  listAllUsersRef(dc),
      ...addOpn
    };
  }, finalInjector, CallerSdkTypeEnum.GeneratedAngular);
}

