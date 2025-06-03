const { createUserRef, listAvailableDriversRef, requestRideRef, submitRideRatingRef, getRideHistoryForTouristRef, updateDriverAvailabilityRef, listAllUsersRef } = require('../');
const { DataConnect, CallerSdkTypeEnum } = require('@angular/fire/data-connect');
const { injectDataConnectQuery, injectDataConnectMutation } = require('@tanstack-query-firebase/angular/data-connect');
const { inject, EnvironmentInjector } = require('@angular/core');

exports.injectCreateUser = function injectCreateUser(args, injector) {
  return injectDataConnectMutation(createUserRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListAvailableDrivers = function injectListAvailableDrivers(options, injector) {
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

exports.injectRequestRide = function injectRequestRide(args, injector) {
  return injectDataConnectMutation(requestRideRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectSubmitRideRating = function injectSubmitRideRating(args, injector) {
  return injectDataConnectMutation(submitRideRatingRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectGetRideHistoryForTourist = function injectGetRideHistoryForTourist(options, injector) {
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

exports.injectUpdateDriverAvailability = function injectUpdateDriverAvailability(args, injector) {
  return injectDataConnectMutation(updateDriverAvailabilityRef, args, injector, CallerSdkTypeEnum.GeneratedAngular);
}

exports.injectListAllUsers = function injectListAllUsers(options, injector) {
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

