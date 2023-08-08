import { Athlete } from 'interfaces/athlete';
import { athleteTypes } from 'store/redux/types';

export function fetch(payload: fetchProps) {
  return {
    type: athleteTypes.FETCH_REQUEST,
    payload,
  };
}

export function fetchSuccess(payload: fetchProps) {
  return {
    type: athleteTypes.FETCH_SUCCESS,
    payload,
  };
}

export function create(payload: createProps) {
  return {
    type: athleteTypes.CREATE_REQUEST,
    payload,
  };
}

export function createSuccess(payload: createProps) {
  return {
    type: athleteTypes.CREATE_SUCCESS,
    payload,
  };
}

export function update(payload: updateProps) {
  return {
    type: athleteTypes.UPDATE_REQUEST,
    payload,
  };
}

export function updateSuccess(payload: updateProps) {
  return {
    type: athleteTypes.UPDATE_SUCCESS,
    payload,
  };
}

export function remove(payload: removeProps) {
  return {
    type: athleteTypes.REMOVE_REQUEST,
    payload,
  };
}

export function removeSuccess(payload: removeProps) {
  return {
    type: athleteTypes.REMOVE_SUCCESS,
    payload,
  };
}

// Interfaces actions ----------------------------
export interface fetchProps {
  callBack?: (values: Athlete[]) => void;
}

export interface createProps {
  data: FormData;
  callBack?: () => void;
}

export interface updateProps {
  data: FormData;
  callBack?: () => void;
}

export interface removeProps {
  data: Athlete;
  callBack?: () => void;
}
