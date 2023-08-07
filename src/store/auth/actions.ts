import { authTypes } from 'store/redux/types';
import { Employee } from 'interfaces/employee';
import { Auth } from 'interfaces/auth';

export function registerRequest(payload: RegisterRequestProps) {
  return {
    type: authTypes.REGISTER_REQUEST,
    payload,
  };
}

export function registerSuccess() {
  return { type: authTypes.REGISTER_SUCCESS };
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

export function setTempUser(payload: Partial<Employee>) {
  return {
    type: authTypes.SET_TEMP_USER,
    payload,
  };
}

export function setTempUserData(payload: TempUserData[]) {
  return {
    type: authTypes.SET_TEMP_USER_DATA,
    payload,
  };
}

// Interfaces actions ----------------------------
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

export interface TempUserData {
  id: string;
  votesStepOne: string[];
  votesStepTwo: string[];
}

export interface RegisterRequestProps {
  callBack: (response: any) => void;
  data: {
    email: string;
    name: string;
    password: string;
  };
}

export interface RegisterSucessProps {
  token: string;
  user: Auth;
}
