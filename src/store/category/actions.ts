import { Category } from 'interfaces/category';
import { categoryTypes } from 'store/redux/types';

export function fetch(payload: fetchProps) {
  return {
    type: categoryTypes.FETCH_REQUEST,
    payload,
  };
}

export function fetchSuccess(payload: fetchProps) {
  return {
    type: categoryTypes.FETCH_SUCCESS,
    payload,
  };
}

export function create(payload: createProps) {
  return {
    type: categoryTypes.CREATE_REQUEST,
    payload,
  };
}

export function createSuccess(payload: createProps) {
  return {
    type: categoryTypes.CREATE_SUCCESS,
    payload,
  };
}

export function createFailure() {
  return { type: categoryTypes.CREATE_FAILURE };
}

export function update(payload: updateProps) {
  return {
    type: categoryTypes.UPDATE_REQUEST,
    payload,
  };
}

export function updateSuccess(payload: updateProps) {
  return {
    type: categoryTypes.UPDATE_SUCCESS,
    payload,
  };
}

export function remove(payload: removeProps) {
  return {
    type: categoryTypes.REMOVE_REQUEST,
    payload,
  };
}

export function removeSuccess(payload: removeProps) {
  return {
    type: categoryTypes.REMOVE_SUCCESS,
    payload,
  };
}

// Interfaces actions ----------------------------
export interface fetchProps {
  callBack?: (values: Category[]) => void;
}

export interface createProps {
  data: Partial<Category>;
  callBack?: () => void;
}

export interface updateProps {
  data: Partial<Category>;
  callBack?: () => void;
}

export interface removeProps {
  data: Partial<Category>;
  callBack?: () => void;
}
