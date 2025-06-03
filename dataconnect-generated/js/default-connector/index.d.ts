import { ConnectorConfig } from 'firebase/data-connect';

export const connectorConfig: ConnectorConfig;

export type TimestampString = string;
export type UUIDString = string;
export type Int64String = string;
export type DateString = string;


export interface Admin_Key {
  id: UUIDString;
  __typename?: 'Admin_Key';
}

export interface Driver_Key {
  id: UUIDString;
  __typename?: 'Driver_Key';
}

export interface Payment_Key {
  id: UUIDString;
  __typename?: 'Payment_Key';
}

export interface RideRating_Key {
  id: UUIDString;
  __typename?: 'RideRating_Key';
}

export interface Ride_Key {
  id: UUIDString;
  __typename?: 'Ride_Key';
}

export interface Tourist_Key {
  id: UUIDString;
  __typename?: 'Tourist_Key';
}

export interface User_Key {
  id: UUIDString;
  __typename?: 'User_Key';
}

