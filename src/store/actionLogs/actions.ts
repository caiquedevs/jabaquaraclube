import { ActionLog } from 'interfaces/actionLog';
import { actionLogTypes } from 'store/redux/types';

export function fetch(payload: fetchProps) {
  return {
    type: actionLogTypes.FETCH,
    payload,
  };
}

export function fetchSuccess(payload: fetchProps) {
  return {
    type: actionLogTypes.FETCH_SUCCESS,
    payload,
  };
}

// Interfaces actions ----------------------------
export interface fetchProps {
  callBack?: (values: ActionLog[]) => void;
}
