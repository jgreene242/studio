const { queryRef, executeQuery, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'test',
  service: 'dispatchnow-9flvh-service',
  location: 'us-east1'
};
exports.connectorConfig = connectorConfig;

const createUserRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'CreateUser');
}
createUserRef.operationName = 'CreateUser';
exports.createUserRef = createUserRef;

exports.createUser = function createUser(dc) {
  return executeMutation(createUserRef(dc));
};

const listAvailableDriversRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAvailableDrivers');
}
listAvailableDriversRef.operationName = 'ListAvailableDrivers';
exports.listAvailableDriversRef = listAvailableDriversRef;

exports.listAvailableDrivers = function listAvailableDrivers(dc) {
  return executeQuery(listAvailableDriversRef(dc));
};

const requestRideRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'RequestRide', inputVars);
}
requestRideRef.operationName = 'RequestRide';
exports.requestRideRef = requestRideRef;

exports.requestRide = function requestRide(dcOrVars, vars) {
  return executeMutation(requestRideRef(dcOrVars, vars));
};

const submitRideRatingRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'SubmitRideRating', inputVars);
}
submitRideRatingRef.operationName = 'SubmitRideRating';
exports.submitRideRatingRef = submitRideRatingRef;

exports.submitRideRating = function submitRideRating(dcOrVars, vars) {
  return executeMutation(submitRideRatingRef(dcOrVars, vars));
};

const getRideHistoryForTouristRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetRideHistoryForTourist');
}
getRideHistoryForTouristRef.operationName = 'GetRideHistoryForTourist';
exports.getRideHistoryForTouristRef = getRideHistoryForTouristRef;

exports.getRideHistoryForTourist = function getRideHistoryForTourist(dc) {
  return executeQuery(getRideHistoryForTouristRef(dc));
};

const updateDriverAvailabilityRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpdateDriverAvailability', inputVars);
}
updateDriverAvailabilityRef.operationName = 'UpdateDriverAvailability';
exports.updateDriverAvailabilityRef = updateDriverAvailabilityRef;

exports.updateDriverAvailability = function updateDriverAvailability(dcOrVars, vars) {
  return executeMutation(updateDriverAvailabilityRef(dcOrVars, vars));
};

const listAllUsersRef = (dc) => {
  const { dc: dcInstance} = validateArgs(connectorConfig, dc, undefined);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'ListAllUsers');
}
listAllUsersRef.operationName = 'ListAllUsers';
exports.listAllUsersRef = listAllUsersRef;

exports.listAllUsers = function listAllUsers(dc) {
  return executeQuery(listAllUsersRef(dc));
};
