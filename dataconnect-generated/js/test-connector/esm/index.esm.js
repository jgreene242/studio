import { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } from 'firebase/data-connect';

export const connectorConfig = {
  connector: 'test',
  service: 'dispatchnow-9flvh-service',
  location: 'us-east1'
};

export const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';

export function createUser(dc) {
  return executeMutation(createUserRef(dc));
}

export const listAvailableDriversRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableDrivers');
}
listAvailableDriversRef.operationName = 'ListAvailableDrivers';

export function listAvailableDrivers(dc) {
  return executeQuery(listAvailableDriversRef(dc));
}

export const requestRideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestRide', inputVars);
}
requestRideRef.operationName = 'RequestRide';

export function requestRide(dcOrVars, vars) {
  return executeMutation(requestRideRef(dcOrVars, vars));
}

export const submitRideRatingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitRideRating', inputVars);
}
submitRideRatingRef.operationName = 'SubmitRideRating';

export function submitRideRating(dcOrVars, vars) {
  return executeMutation(submitRideRatingRef(dcOrVars, vars));
}

export const getRideHistoryForTouristRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRideHistoryForTourist');
}
getRideHistoryForTouristRef.operationName = 'GetRideHistoryForTourist';

export function getRideHistoryForTourist(dc) {
  return executeQuery(getRideHistoryForTouristRef(dc));
}

export const updateDriverAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDriverAvailability', inputVars);
}
updateDriverAvailabilityRef.operationName = 'UpdateDriverAvailability';

export function updateDriverAvailability(dcOrVars, vars) {
  return executeMutation(updateDriverAvailabilityRef(dcOrVars, vars));
}

export const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';

export function listAllUsers(dc) {
  return executeQuery(listAllUsersRef(dc));
}

