# Table of Contents
- [**Overview**](#generated-javascript-readme)
- [**Accessing the connector**](#accessing-the-connector)
  - [*Connecting to the local Emulator*](#connecting-to-the-local-emulator)
- [**Queries**](#queries)
  - [*ListAvailableDrivers*](#listavailabledrivers)
  - [*GetRideHistoryForTourist*](#getridehistoryfortourist)
  - [*ListAllUsers*](#listallusers)
- [**Mutations**](#mutations)
  - [*CreateUser*](#createuser)
  - [*RequestRide*](#requestride)
  - [*SubmitRideRating*](#submitriderating)
  - [*UpdateDriverAvailability*](#updatedriveravailability)

# Generated TypeScript README
This README will guide you through the process of using the generated JavaScript SDK package for the connector `test`. It will also provide examples on how to use your generated SDK to call your Data Connect queries and mutations.

***NOTE:** This README is generated alongside the generated SDK. If you make changes to this file, they will be overwritten when the SDK is regenerated.*

You can use this generated SDK by importing from the package `@firebasegen/test-connector` as shown below. Both CommonJS and ESM imports are supported.

You can also follow the instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#set-client).

# Accessing the connector
A connector is a collection of Queries and Mutations. One SDK is generated for each connector - this SDK is generated for the connector `test`.

You can find more information about connectors in the [Data Connect documentation](https://firebase.google.com/docs/data-connect#how-does).

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/test-connector';

const dataConnect = getDataConnect(connectorConfig);
```

## Connecting to the local Emulator
By default, the connector will connect to the production service.

To connect to the emulator, you can use the following code.
You can also follow the emulator instructions from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#instrument-clients).

```typescript
import { connectDataConnectEmulator, getDataConnect } from 'firebase/data-connect';
import { connectorConfig } from '@firebasegen/test-connector';

const dataConnect = getDataConnect(connectorConfig);
connectDataConnectEmulator(dataConnect, 'localhost', 9399);
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

Below are examples of how to use the `test` connector's generated functions to execute each query. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-queries).

## ListAvailableDrivers
You can execute the `ListAvailableDrivers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
listAvailableDrivers(): QueryPromise<ListAvailableDriversData, undefined>;

interface ListAvailableDriversRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAvailableDriversData, undefined>;
}
export const listAvailableDriversRef: ListAvailableDriversRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAvailableDrivers(dc: DataConnect): QueryPromise<ListAvailableDriversData, undefined>;

interface ListAvailableDriversRef {
  ...
  (dc: DataConnect): QueryRef<ListAvailableDriversData, undefined>;
}
export const listAvailableDriversRef: ListAvailableDriversRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAvailableDriversRef:
```typescript
const name = listAvailableDriversRef.operationName;
console.log(name);
```

### Variables
The `ListAvailableDrivers` query has no variables.
### Return Type
Recall that executing the `ListAvailableDrivers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAvailableDriversData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `ListAvailableDrivers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAvailableDrivers } from '@firebasegen/test-connector';


// Call the `listAvailableDrivers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAvailableDrivers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAvailableDrivers(dataConnect);

console.log(data.drivers);

// Or, you can use the `Promise` API.
listAvailableDrivers().then((response) => {
  const data = response.data;
  console.log(data.drivers);
});
```

### Using `ListAvailableDrivers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAvailableDriversRef } from '@firebasegen/test-connector';


// Call the `listAvailableDriversRef()` function to get a reference to the query.
const ref = listAvailableDriversRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAvailableDriversRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.drivers);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.drivers);
});
```

## GetRideHistoryForTourist
You can execute the `GetRideHistoryForTourist` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
getRideHistoryForTourist(): QueryPromise<GetRideHistoryForTouristData, undefined>;

interface GetRideHistoryForTouristRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<GetRideHistoryForTouristData, undefined>;
}
export const getRideHistoryForTouristRef: GetRideHistoryForTouristRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
getRideHistoryForTourist(dc: DataConnect): QueryPromise<GetRideHistoryForTouristData, undefined>;

interface GetRideHistoryForTouristRef {
  ...
  (dc: DataConnect): QueryRef<GetRideHistoryForTouristData, undefined>;
}
export const getRideHistoryForTouristRef: GetRideHistoryForTouristRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the getRideHistoryForTouristRef:
```typescript
const name = getRideHistoryForTouristRef.operationName;
console.log(name);
```

### Variables
The `GetRideHistoryForTourist` query has no variables.
### Return Type
Recall that executing the `GetRideHistoryForTourist` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `GetRideHistoryForTouristData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
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
```
### Using `GetRideHistoryForTourist`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, getRideHistoryForTourist } from '@firebasegen/test-connector';


// Call the `getRideHistoryForTourist()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await getRideHistoryForTourist();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await getRideHistoryForTourist(dataConnect);

console.log(data.rides);

// Or, you can use the `Promise` API.
getRideHistoryForTourist().then((response) => {
  const data = response.data;
  console.log(data.rides);
});
```

### Using `GetRideHistoryForTourist`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, getRideHistoryForTouristRef } from '@firebasegen/test-connector';


// Call the `getRideHistoryForTouristRef()` function to get a reference to the query.
const ref = getRideHistoryForTouristRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = getRideHistoryForTouristRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.rides);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.rides);
});
```

## ListAllUsers
You can execute the `ListAllUsers` query using the following action shortcut function, or by calling `executeQuery()` after calling the following `QueryRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
listAllUsers(): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `QueryRef` function.
```typescript
listAllUsers(dc: DataConnect): QueryPromise<ListAllUsersData, undefined>;

interface ListAllUsersRef {
  ...
  (dc: DataConnect): QueryRef<ListAllUsersData, undefined>;
}
export const listAllUsersRef: ListAllUsersRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the listAllUsersRef:
```typescript
const name = listAllUsersRef.operationName;
console.log(name);
```

### Variables
The `ListAllUsers` query has no variables.
### Return Type
Recall that executing the `ListAllUsers` query returns a `QueryPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `ListAllUsersData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface ListAllUsersData {
  users: ({
    id: UUIDString;
    email: string;
    userType: string;
  } & User_Key)[];
}
```
### Using `ListAllUsers`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, listAllUsers } from '@firebasegen/test-connector';


// Call the `listAllUsers()` function to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await listAllUsers();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await listAllUsers(dataConnect);

console.log(data.users);

// Or, you can use the `Promise` API.
listAllUsers().then((response) => {
  const data = response.data;
  console.log(data.users);
});
```

### Using `ListAllUsers`'s `QueryRef` function

```typescript
import { getDataConnect, executeQuery } from 'firebase/data-connect';
import { connectorConfig, listAllUsersRef } from '@firebasegen/test-connector';


// Call the `listAllUsersRef()` function to get a reference to the query.
const ref = listAllUsersRef();

// You can also pass in a `DataConnect` instance to the `QueryRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = listAllUsersRef(dataConnect);

// Call `executeQuery()` on the reference to execute the query.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeQuery(ref);

console.log(data.users);

// Or, you can use the `Promise` API.
executeQuery(ref).then((response) => {
  const data = response.data;
  console.log(data.users);
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

Below are examples of how to use the `test` connector's generated functions to execute each mutation. You can also follow the examples from the [Data Connect documentation](https://firebase.google.com/docs/data-connect/web-sdk#using-mutations).

## CreateUser
You can execute the `CreateUser` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
createUser(): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
createUser(dc: DataConnect): MutationPromise<CreateUserData, undefined>;

interface CreateUserRef {
  ...
  (dc: DataConnect): MutationRef<CreateUserData, undefined>;
}
export const createUserRef: CreateUserRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the createUserRef:
```typescript
const name = createUserRef.operationName;
console.log(name);
```

### Variables
The `CreateUser` mutation has no variables.
### Return Type
Recall that executing the `CreateUser` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `CreateUserData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface CreateUserData {
  user_insert: User_Key;
}
```
### Using `CreateUser`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, createUser } from '@firebasegen/test-connector';


// Call the `createUser()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await createUser();

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await createUser(dataConnect);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
createUser().then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

### Using `CreateUser`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, createUserRef } from '@firebasegen/test-connector';


// Call the `createUserRef()` function to get a reference to the mutation.
const ref = createUserRef();

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = createUserRef(dataConnect);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.user_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.user_insert);
});
```

## RequestRide
You can execute the `RequestRide` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
requestRide(vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface RequestRideRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
}
export const requestRideRef: RequestRideRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
requestRide(dc: DataConnect, vars: RequestRideVariables): MutationPromise<RequestRideData, RequestRideVariables>;

interface RequestRideRef {
  ...
  (dc: DataConnect, vars: RequestRideVariables): MutationRef<RequestRideData, RequestRideVariables>;
}
export const requestRideRef: RequestRideRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the requestRideRef:
```typescript
const name = requestRideRef.operationName;
console.log(name);
```

### Variables
The `RequestRide` mutation requires an argument of type `RequestRideVariables`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface RequestRideVariables {
  touristId: UUIDString;
  pickupLocation: string;
  dropoffLocation: string;
}
```
### Return Type
Recall that executing the `RequestRide` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `RequestRideData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface RequestRideData {
  ride_insert: Ride_Key;
}
```
### Using `RequestRide`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, requestRide, RequestRideVariables } from '@firebasegen/test-connector';

// The `RequestRide` mutation requires an argument of type `RequestRideVariables`:
const requestRideVars: RequestRideVariables = {
  touristId: ..., 
  pickupLocation: ..., 
  dropoffLocation: ..., 
};

// Call the `requestRide()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await requestRide(requestRideVars);
// Variables can be defined inline as well.
const { data } = await requestRide({ touristId: ..., pickupLocation: ..., dropoffLocation: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await requestRide(dataConnect, requestRideVars);

console.log(data.ride_insert);

// Or, you can use the `Promise` API.
requestRide(requestRideVars).then((response) => {
  const data = response.data;
  console.log(data.ride_insert);
});
```

### Using `RequestRide`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, requestRideRef, RequestRideVariables } from '@firebasegen/test-connector';

// The `RequestRide` mutation requires an argument of type `RequestRideVariables`:
const requestRideVars: RequestRideVariables = {
  touristId: ..., 
  pickupLocation: ..., 
  dropoffLocation: ..., 
};

// Call the `requestRideRef()` function to get a reference to the mutation.
const ref = requestRideRef(requestRideVars);
// Variables can be defined inline as well.
const ref = requestRideRef({ touristId: ..., pickupLocation: ..., dropoffLocation: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = requestRideRef(dataConnect, requestRideVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.ride_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.ride_insert);
});
```

## SubmitRideRating
You can execute the `SubmitRideRating` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
submitRideRating(vars: SubmitRideRatingVariables): MutationPromise<SubmitRideRatingData, SubmitRideRatingVariables>;

interface SubmitRideRatingRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: SubmitRideRatingVariables): MutationRef<SubmitRideRatingData, SubmitRideRatingVariables>;
}
export const submitRideRatingRef: SubmitRideRatingRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
submitRideRating(dc: DataConnect, vars: SubmitRideRatingVariables): MutationPromise<SubmitRideRatingData, SubmitRideRatingVariables>;

interface SubmitRideRatingRef {
  ...
  (dc: DataConnect, vars: SubmitRideRatingVariables): MutationRef<SubmitRideRatingData, SubmitRideRatingVariables>;
}
export const submitRideRatingRef: SubmitRideRatingRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the submitRideRatingRef:
```typescript
const name = submitRideRatingRef.operationName;
console.log(name);
```

### Variables
The `SubmitRideRating` mutation requires an argument of type `SubmitRideRatingVariables`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface SubmitRideRatingVariables {
  rideId: UUIDString;
  rating: number;
  review: string;
}
```
### Return Type
Recall that executing the `SubmitRideRating` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `SubmitRideRatingData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface SubmitRideRatingData {
  rideRating_insert: RideRating_Key;
}
```
### Using `SubmitRideRating`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, submitRideRating, SubmitRideRatingVariables } from '@firebasegen/test-connector';

// The `SubmitRideRating` mutation requires an argument of type `SubmitRideRatingVariables`:
const submitRideRatingVars: SubmitRideRatingVariables = {
  rideId: ..., 
  rating: ..., 
  review: ..., 
};

// Call the `submitRideRating()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await submitRideRating(submitRideRatingVars);
// Variables can be defined inline as well.
const { data } = await submitRideRating({ rideId: ..., rating: ..., review: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await submitRideRating(dataConnect, submitRideRatingVars);

console.log(data.rideRating_insert);

// Or, you can use the `Promise` API.
submitRideRating(submitRideRatingVars).then((response) => {
  const data = response.data;
  console.log(data.rideRating_insert);
});
```

### Using `SubmitRideRating`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, submitRideRatingRef, SubmitRideRatingVariables } from '@firebasegen/test-connector';

// The `SubmitRideRating` mutation requires an argument of type `SubmitRideRatingVariables`:
const submitRideRatingVars: SubmitRideRatingVariables = {
  rideId: ..., 
  rating: ..., 
  review: ..., 
};

// Call the `submitRideRatingRef()` function to get a reference to the mutation.
const ref = submitRideRatingRef(submitRideRatingVars);
// Variables can be defined inline as well.
const ref = submitRideRatingRef({ rideId: ..., rating: ..., review: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = submitRideRatingRef(dataConnect, submitRideRatingVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.rideRating_insert);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.rideRating_insert);
});
```

## UpdateDriverAvailability
You can execute the `UpdateDriverAvailability` mutation using the following action shortcut function, or by calling `executeMutation()` after calling the following `MutationRef` function, both of which are defined in [test-connector/index.d.ts](./index.d.ts):
```typescript
updateDriverAvailability(vars: UpdateDriverAvailabilityVariables): MutationPromise<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;

interface UpdateDriverAvailabilityRef {
  ...
  /* Allow users to create refs without passing in DataConnect */
  (vars: UpdateDriverAvailabilityVariables): MutationRef<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
}
export const updateDriverAvailabilityRef: UpdateDriverAvailabilityRef;
```
You can also pass in a `DataConnect` instance to the action shortcut function or `MutationRef` function.
```typescript
updateDriverAvailability(dc: DataConnect, vars: UpdateDriverAvailabilityVariables): MutationPromise<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;

interface UpdateDriverAvailabilityRef {
  ...
  (dc: DataConnect, vars: UpdateDriverAvailabilityVariables): MutationRef<UpdateDriverAvailabilityData, UpdateDriverAvailabilityVariables>;
}
export const updateDriverAvailabilityRef: UpdateDriverAvailabilityRef;
```

If you need the name of the operation without creating a ref, you can retrieve the operation name by calling the `operationName` property on the updateDriverAvailabilityRef:
```typescript
const name = updateDriverAvailabilityRef.operationName;
console.log(name);
```

### Variables
The `UpdateDriverAvailability` mutation requires an argument of type `UpdateDriverAvailabilityVariables`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:

```typescript
export interface UpdateDriverAvailabilityVariables {
  driverId: UUIDString;
  isAvailable: boolean;
}
```
### Return Type
Recall that executing the `UpdateDriverAvailability` mutation returns a `MutationPromise` that resolves to an object with a `data` property.

The `data` property is an object of type `UpdateDriverAvailabilityData`, which is defined in [test-connector/index.d.ts](./index.d.ts). It has the following fields:
```typescript
export interface UpdateDriverAvailabilityData {
  driver_update?: Driver_Key | null;
}
```
### Using `UpdateDriverAvailability`'s action shortcut function

```typescript
import { getDataConnect } from 'firebase/data-connect';
import { connectorConfig, updateDriverAvailability, UpdateDriverAvailabilityVariables } from '@firebasegen/test-connector';

// The `UpdateDriverAvailability` mutation requires an argument of type `UpdateDriverAvailabilityVariables`:
const updateDriverAvailabilityVars: UpdateDriverAvailabilityVariables = {
  driverId: ..., 
  isAvailable: ..., 
};

// Call the `updateDriverAvailability()` function to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await updateDriverAvailability(updateDriverAvailabilityVars);
// Variables can be defined inline as well.
const { data } = await updateDriverAvailability({ driverId: ..., isAvailable: ..., });

// You can also pass in a `DataConnect` instance to the action shortcut function.
const dataConnect = getDataConnect(connectorConfig);
const { data } = await updateDriverAvailability(dataConnect, updateDriverAvailabilityVars);

console.log(data.driver_update);

// Or, you can use the `Promise` API.
updateDriverAvailability(updateDriverAvailabilityVars).then((response) => {
  const data = response.data;
  console.log(data.driver_update);
});
```

### Using `UpdateDriverAvailability`'s `MutationRef` function

```typescript
import { getDataConnect, executeMutation } from 'firebase/data-connect';
import { connectorConfig, updateDriverAvailabilityRef, UpdateDriverAvailabilityVariables } from '@firebasegen/test-connector';

// The `UpdateDriverAvailability` mutation requires an argument of type `UpdateDriverAvailabilityVariables`:
const updateDriverAvailabilityVars: UpdateDriverAvailabilityVariables = {
  driverId: ..., 
  isAvailable: ..., 
};

// Call the `updateDriverAvailabilityRef()` function to get a reference to the mutation.
const ref = updateDriverAvailabilityRef(updateDriverAvailabilityVars);
// Variables can be defined inline as well.
const ref = updateDriverAvailabilityRef({ driverId: ..., isAvailable: ..., });

// You can also pass in a `DataConnect` instance to the `MutationRef` function.
const dataConnect = getDataConnect(connectorConfig);
const ref = updateDriverAvailabilityRef(dataConnect, updateDriverAvailabilityVars);

// Call `executeMutation()` on the reference to execute the mutation.
// You can use the `await` keyword to wait for the promise to resolve.
const { data } = await executeMutation(ref);

console.log(data.driver_update);

// Or, you can use the `Promise` API.
executeMutation(ref).then((response) => {
  const data = response.data;
  console.log(data.driver_update);
});
```

