import {
  queryRef,
  executeQuery,
  validateArgsWithOptions,
  mutationRef,
  executeMutation,
  validateArgs,
} from "firebase/data-connect";

export const connectorConfig = {
  connector: "example",
  service: "jlt-pass-service",
  location: "asia-northeast1",
};
export const getMyProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "GetMyProgress", inputVars);
};
getMyProgressRef.operationName = "GetMyProgress";

export function getMyProgress(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMyProgressRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const getMySessionsRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return queryRef(dcInstance, "GetMySessions", inputVars);
};
getMySessionsRef.operationName = "GetMySessions";

export function getMySessions(dcOrVars, varsOrOptions, options) {
  const {
    dc: dcInstance,
    vars: inputVars,
    options: inputOpts,
  } = validateArgsWithOptions(connectorConfig, dcOrVars, varsOrOptions, options, true, true);
  return executeQuery(getMySessionsRef(dcInstance, inputVars), inputOpts && inputOpts.fetchPolicy);
}

export const upsertProgressRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "UpsertProgress", inputVars);
};
upsertProgressRef.operationName = "UpsertProgress";

export function upsertProgress(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertProgressRef(dcInstance, inputVars));
}

export const upsertSessionRef = (dcOrVars, vars) => {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  dcInstance._useGeneratedSdk();
  return mutationRef(dcInstance, "UpsertSession", inputVars);
};
upsertSessionRef.operationName = "UpsertSession";

export function upsertSession(dcOrVars, vars) {
  const { dc: dcInstance, vars: inputVars } = validateArgs(connectorConfig, dcOrVars, vars, true);
  return executeMutation(upsertSessionRef(dcInstance, inputVars));
}
