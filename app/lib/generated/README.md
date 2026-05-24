# Generated TypeScript README

This README will guide you through the process of using the generated JavaScript SDK package for the connector `example`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

**\*NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.\*

# Table of Contents

- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [_Connecting to the local Emulator_](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [_GetMyProgress_](#getmyprogress)
  - [_GetMySessions_](#getmysessions)
- [**Mutations**](#mutations)
  - [_UpsertProgress_](#upsertprogress)
  - [_UpsertSession_](#upsertsession)

# Accessing the connector

A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `example`. You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

You can use this generated SDK by importing from the package `@dataconnect/generated` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

```typescript
import { getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "@dataconnect/generated";

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator

By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from "firebase/data-connect";
import { connectorConfig } from "@dataconnect/generated";

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, "localhost", 9399);
```

After it's initialized, you can call your Data Connect [queries](#queries) and [mutations](#mutations) from your generated SDK.

# Queries

There are two ways to execute a Data Connect Query using the generated Web SDK:

- Using a Query Reference function, which returns a `QueryRef`
  - The `QueryRef` can be used as an argument to `executeQuery()`, which will execute the Query and return a `QueryPromise`
- Using an action shortcut function, which returns a `QueryPromise`
  - Calling the action shortcut function will execute the Query and return a `QueryPromise`

The following is true for both the action shortcut function and the `QueryRef` function:

- The `QueryPromise` returned will resolve to the result of the Query once it has finished executing
- If the Query accepts arguments, both the action shortcut function and the `QueryRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Query
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## GetMyProgress

You can execute the `GetMyProgress` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):

```typescript
getMyProgress(vars: GetMyProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyProgressData, GetMyProgressVariables>;

interface GetMyProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMyProgressVariables): QueryRef<GetMyProgressData, GetMyProgressVariables>;
}
export const getMyProgressRef: GetMyProgressRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.

```typescript
getMyProgress(dc: DataConnect, vars: GetMyProgressVariables, options?: ExecuteQueryOptions): QueryPromise<GetMyProgressData, GetMyProgressVariables>;

interface GetMyProgressRef {
  ...
  (dc: DataConnect, vars: GetMyProgressVariables): QueryRef<GetMyProgressData, GetMyProgressVariables>;
}
export const getMyProgressRef: GetMyProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMyProgressRef:

```typescript
const name = getMyProgressRef.operationName;
console.log(name);
```

### Variables

The `GetMyProgress` query requires an argument of type `GetMyProgressVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyProgressVariables {
  userId: string;
}
```

### Return Type

Recall that executing the `GetMyProgress` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMyProgressData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMyProgressData {
  progresses: ({
    id: string;
    userId: string;
    questionId: string;
    hasAnswered: boolean;
    hasCorrect: boolean;
    attemptCount: number;
    wrongCount: number;
    lastAnsweredAt?: string | null;
    bookmarked: boolean;
  } & Progress_Key)[];
}
```

### Using `GetMyProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMyProgress, GetMyProgressVariables } from '@dataconnect/generated';

// The `GetMyProgress` query requires an argument of type `GetMyProgressVariables`:
const getMyProgressVars: GetMyProgressVariables = {
  userId: ...,
};

// Call the `getMyProgress()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMyProgress(getMyProgressVars);
// Variables can be defined inline as well.
const { data } = await getMyProgress({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMyProgress(dataConnect, getMyProgressVars);

console.log(data.progresses);

// Or, you can use the `Promise` API.
getMyProgress(getMyProgressVars).then((response) => {
  const data = response.data;
  console.log(data.progresses);
});
```

### Using `GetMyProgress`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMyProgressRef, GetMyProgressVariables } from '@dataconnect/generated';

// The `GetMyProgress` query requires an argument of type `GetMyProgressVariables`:
const getMyProgressVars: GetMyProgressVariables = {
  userId: ...,
};

// Call the `getMyProgressRef()` function to get a reference to the query.
const ref = getMyProgressRef(getMyProgressVars);
// Variables can be defined inline as well.
const ref = getMyProgressRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMyProgressRef(dataConnect, getMyProgressVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.progresses);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.progresses);
});
```

## GetMySessions

You can execute the `GetMySessions` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):

```typescript
getMySessions(vars: GetMySessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySessionsData, GetMySessionsVariables>;

interface GetMySessionsRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: GetMySessionsVariables): QueryRef<GetMySessionsData, GetMySessionsVariables>;
}
export const getMySessionsRef: GetMySessionsRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.

```typescript
getMySessions(dc: DataConnect, vars: GetMySessionsVariables, options?: ExecuteQueryOptions): QueryPromise<GetMySessionsData, GetMySessionsVariables>;

interface GetMySessionsRef {
  ...
  (dc: DataConnect, vars: GetMySessionsVariables): QueryRef<GetMySessionsData, GetMySessionsVariables>;
}
export const getMySessionsRef: GetMySessionsRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getMySessionsRef:

```typescript
const name = getMySessionsRef.operationName;
console.log(name);
```

### Variables

The `GetMySessions` query requires an argument of type `GetMySessionsVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMySessionsVariables {
  userId: string;
}
```

### Return Type

Recall that executing the `GetMySessions` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetMySessionsData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface GetMySessionsData {
  studySessions: ({
    id: string;
    userId: string;
    sessionId: string;
    mode: string;
    categoryId?: string | null;
    questionIds: string[];
    incorrectQuestionIds?: string[] | null;
    correctCount: number;
    questionCount: number;
    completedAt?: string | null;
  } & StudySession_Key)[];
}
```

### Using `GetMySessions`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getMySessions, GetMySessionsVariables } from '@dataconnect/generated';

// The `GetMySessions` query requires an argument of type `GetMySessionsVariables`:
const getMySessionsVars: GetMySessionsVariables = {
  userId: ...,
};

// Call the `getMySessions()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getMySessions(getMySessionsVars);
// Variables can be defined inline as well.
const { data } = await getMySessions({ userId: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getMySessions(dataConnect, getMySessionsVars);

console.log(data.studySessions);

// Or, you can use the `Promise` API.
getMySessions(getMySessionsVars).then((response) => {
  const data = response.data;
  console.log(data.studySessions);
});
```

### Using `GetMySessions`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getMySessionsRef, GetMySessionsVariables } from '@dataconnect/generated';

// The `GetMySessions` query requires an argument of type `GetMySessionsVariables`:
const getMySessionsVars: GetMySessionsVariables = {
  userId: ...,
};

// Call the `getMySessionsRef()` function to get a reference to the query.
const ref = getMySessionsRef(getMySessionsVars);
// Variables can be defined inline as well.
const ref = getMySessionsRef({ userId: ..., });

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getMySessionsRef(dataConnect, getMySessionsVars);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.studySessions);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.studySessions);
});
```

# Mutations

There are two ways to execute a Data Connect Mutation using the generated Web SDK:

- Using a Mutation Reference function, which returns a `MutationRef`
  - The `MutationRef` can be used as an argument to `executeMutation()`, which will execute the Mutation and return a `MutationPromise`
- Using an action shortcut function, which returns a `MutationPromise`
  - Calling the action shortcut function will execute the Mutation and return a `MutationPromise`

The following is true for both the action shortcut function and the `MutationRef` function:

- The `MutationPromise` returned will resolve to the result of the Mutation once it has finished executing
- If the Mutation accepts arguments, both the action shortcut function and the `MutationRef` function accept a single argument: an object that contains all the required variables (and the optional variables) for the Mutation
- Both functions can be called with or without passing in a `DataConnect` instance as an argument. If no `DataConnect` argument is passed in, then the generated SDK will call `getDataConnect(connectorConfig)` behind the scenes for you.

Below are examples of how to use the `example` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## UpsertProgress

You can execute the `UpsertProgress` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):

```typescript
upsertProgress(vars: UpsertProgressVariables): MutationPromise<UpsertProgressData, UpsertProgressVariables>;

interface UpsertProgressRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertProgressVariables): MutationRef<UpsertProgressData, UpsertProgressVariables>;
}
export const upsertProgressRef: UpsertProgressRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.

```typescript
upsertProgress(dc: DataConnect, vars: UpsertProgressVariables): MutationPromise<UpsertProgressData, UpsertProgressVariables>;

interface UpsertProgressRef {
  ...
  (dc: DataConnect, vars: UpsertProgressVariables): MutationRef<UpsertProgressData, UpsertProgressVariables>;
}
export const upsertProgressRef: UpsertProgressRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertProgressRef:

```typescript
const name = upsertProgressRef.operationName;
console.log(name);
```

### Variables

The `UpsertProgress` mutation requires an argument of type `UpsertProgressVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertProgressVariables {
  id: string;
  userId: string;
  questionId: string;
  hasAnswered: boolean;
  hasCorrect: boolean;
  attemptCount: number;
  wrongCount: number;
  lastAnsweredAt?: string | null;
  bookmarked: boolean;
}
```

### Return Type

Recall that executing the `UpsertProgress` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertProgressData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertProgressData {
  progress_upsert: Progress_Key;
}
```

### Using `UpsertProgress`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertProgress, UpsertProgressVariables } from '@dataconnect/generated';

// The `UpsertProgress` mutation requires an argument of type `UpsertProgressVariables`:
const upsertProgressVars: UpsertProgressVariables = {
  id: ...,
  userId: ...,
  questionId: ...,
  hasAnswered: ...,
  hasCorrect: ...,
  attemptCount: ...,
  wrongCount: ...,
  lastAnsweredAt: ..., // optional
  bookmarked: ...,
};

// Call the `upsertProgress()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertProgress(upsertProgressVars);
// Variables can be defined inline as well.
const { data } = await upsertProgress({ id: ..., userId: ..., questionId: ..., hasAnswered: ..., hasCorrect: ..., attemptCount: ..., wrongCount: ..., lastAnsweredAt: ..., bookmarked: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertProgress(dataConnect, upsertProgressVars);

console.log(data.progress_upsert);

// Or, you can use the `Promise` API.
upsertProgress(upsertProgressVars).then((response) => {
  const data = response.data;
  console.log(data.progress_upsert);
});
```

### Using `UpsertProgress`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertProgressRef, UpsertProgressVariables } from '@dataconnect/generated';

// The `UpsertProgress` mutation requires an argument of type `UpsertProgressVariables`:
const upsertProgressVars: UpsertProgressVariables = {
  id: ...,
  userId: ...,
  questionId: ...,
  hasAnswered: ...,
  hasCorrect: ...,
  attemptCount: ...,
  wrongCount: ...,
  lastAnsweredAt: ..., // optional
  bookmarked: ...,
};

// Call the `upsertProgressRef()` function to get a reference to the mutation.
const ref = upsertProgressRef(upsertProgressVars);
// Variables can be defined inline as well.
const ref = upsertProgressRef({ id: ..., userId: ..., questionId: ..., hasAnswered: ..., hasCorrect: ..., attemptCount: ..., wrongCount: ..., lastAnsweredAt: ..., bookmarked: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertProgressRef(dataConnect, upsertProgressVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.progress_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.progress_upsert);
});
```

## UpsertSession

You can execute the `UpsertSession` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [generated/index.d.ts](./index.d.ts):

```typescript
upsertSession(vars: UpsertSessionVariables): MutationPromise<UpsertSessionData, UpsertSessionVariables>;

interface UpsertSessionRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpsertSessionVariables): MutationRef<UpsertSessionData, UpsertSessionVariables>;
}
export const upsertSessionRef: UpsertSessionRef;
```

You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.

```typescript
upsertSession(dc: DataConnect, vars: UpsertSessionVariables): MutationPromise<UpsertSessionData, UpsertSessionVariables>;

interface UpsertSessionRef {
  ...
  (dc: DataConnect, vars: UpsertSessionVariables): MutationRef<UpsertSessionData, UpsertSessionVariables>;
}
export const upsertSessionRef: UpsertSessionRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the upsertSessionRef:

```typescript
const name = upsertSessionRef.operationName;
console.log(name);
```

### Variables

The `UpsertSession` mutation requires an argument of type `UpsertSessionVariables`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertSessionVariables {
  id: string;
  userId: string;
  sessionId: string;
  mode: string;
  categoryId?: string | null;
  questionIds: string[];
  incorrectQuestionIds?: string[] | null;
  correctCount: number;
  questionCount: number;
  completedAt?: string | null;
}
```

### Return Type

Recall that executing the `UpsertSession` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpsertSessionData`, which is defined in [generated/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpsertSessionData {
  studySession_upsert: StudySession_Key;
}
```

### Using `UpsertSession`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, upsertSession, UpsertSessionVariables } from '@dataconnect/generated';

// The `UpsertSession` mutation requires an argument of type `UpsertSessionVariables`:
const upsertSessionVars: UpsertSessionVariables = {
  id: ...,
  userId: ...,
  sessionId: ...,
  mode: ...,
  categoryId: ..., // optional
  questionIds: ...,
  incorrectQuestionIds: ..., // optional
  correctCount: ...,
  questionCount: ...,
  completedAt: ..., // optional
};

// Call the `upsertSession()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await upsertSession(upsertSessionVars);
// Variables can be defined inline as well.
const { data } = await upsertSession({ id: ..., userId: ..., sessionId: ..., mode: ..., categoryId: ..., questionIds: ..., incorrectQuestionIds: ..., correctCount: ..., questionCount: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await upsertSession(dataConnect, upsertSessionVars);

console.log(data.studySession_upsert);

// Or, you can use the `Promise` API.
upsertSession(upsertSessionVars).then((response) => {
  const data = response.data;
  console.log(data.studySession_upsert);
});
```

### Using `UpsertSession`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, upsertSessionRef, UpsertSessionVariables } from '@dataconnect/generated';

// The `UpsertSession` mutation requires an argument of type `UpsertSessionVariables`:
const upsertSessionVars: UpsertSessionVariables = {
  id: ...,
  userId: ...,
  sessionId: ...,
  mode: ...,
  categoryId: ..., // optional
  questionIds: ...,
  incorrectQuestionIds: ..., // optional
  correctCount: ...,
  questionCount: ...,
  completedAt: ..., // optional
};

// Call the `upsertSessionRef()` function to get a reference to the mutation.
const ref = upsertSessionRef(upsertSessionVars);
// Variables can be defined inline as well.
const ref = upsertSessionRef({ id: ..., userId: ..., sessionId: ..., mode: ..., categoryId: ..., questionIds: ..., incorrectQuestionIds: ..., correctCount: ..., questionCount: ..., completedAt: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = upsertSessionRef(dataConnect, upsertSessionVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.studySession_upsert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.studySession_upsert);
});
```
