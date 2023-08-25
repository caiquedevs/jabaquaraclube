import { authTypes } from 'store/redux/types';
import { Auth } from 'interfaces/auth';

export function fetch(payload: fetchProps) {
  return {
    type: authTypes.FETCH_REQUEST,
    payload,
  };
}

export function fetchSuccess(payload: fetchProps) {
  return {
    type: authTypes.FETCH_SUCCESS,
    payload,
  };
}

export function fetchFailure() {
  return { type: authTypes.FETCH_FAILURE };
}

export function register(payload: RegisterRequestProps) {
  return {
    type: authTypes.REGISTER_REQUEST,
    payload,
  };
}

export function registerSuccess(payload: Auth) {
  return { type: authTypes.REGISTER_SUCCESS, payload };
}

export function registerFailure() {
  return { type: authTypes.REGISTER_FAILURE };
}

export function loginRequest(payload: LoginRequestProps) {
  return {
    type: authTypes.LOGIN_REQUEST,
    payload,
  };
}

export function loginSuccess(payload: LoginSuccessProps) {
  return {
    type: authTypes.LOGIN_SUCCESS,
    payload,
  };
}

export function loginFailure() {
  return {
    type: authTypes.LOGIN_FAILURE,
  };
}

export function logoutUser() {
  return {
    type: authTypes.LOGOUT_USER,
  };
}

// Interfaces actions ----------------------------
export interface fetchProps {
  callBack?: (values: Auth[]) => void;
}

export interface createProps {
  data: Partial<Auth>;
  callBack?: () => void;
}

export interface updateProps {
  data: Partial<Auth>;
  callBack?: () => void;
}

export interface removeProps {
  data: Partial<Auth>;
  callBack?: () => void;
}

export interface RegisterRequestProps {
  callBack: (response: any) => void;
  data: Partial<Auth>;
}

export interface RegisterSucessProps {
  token: string;
  user: Auth;
}

export interface LoginRequestProps {
  callBack: () => void;
  data: Partial<Auth>;
}

export interface LoginSuccessProps {
  token: string;
  expiration: number;
  auth: Auth;
}

export interface ChangeUserRequestProps {
  callBack?: () => void;
  data: Partial<Auth>;
}

export interface ChangeUserSuccessProps {
  email?: string;
  password?: string;
}
