const { queryRef, executeQuery, validateArgsWithOptions, mutationRef, executeMutation, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'example',
  service: 'jlt-pass-service',
  location: 'asia-northeast1'
};
exports.connectorConfig = connectorConfig;

const getMyProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMyProgress', inputVars);
}
getMyProgressRef.operationName = 'GetMyProgress';
exports.getMyProgressRef = getMyProgressRef;

exports.getMyProgress = function getMyProgress(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyProgressRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const getMySessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, 'GetMySessions', inputVars);
}
getMySessionsRef.operationName = 'GetMySessions';
exports.getMySessionsRef = getMySessionsRef;

exports.getMySessions = function getMySessions(dcOrVars, varsOrOptions, options) {
  
  const { dc: dcInstance, vars: inputVars, options: inputOpts } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMySessionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}
;

const upsertProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertProgress', inputVars);
}
upsertProgressRef.operationName = 'UpsertProgress';
exports.upsertProgressRef = upsertProgressRef;

exports.upsertProgress = function upsertProgress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertProgressRef(dcInstance, inputVars));
}
;

const upsertSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars} = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, 'UpsertSession', inputVars);
}
upsertSessionRef.operationName = 'UpsertSession';
exports.upsertSessionRef = upsertSessionRef;

exports.upsertSession = function upsertSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSessionRef(dcInstance, inputVars));
}
;
