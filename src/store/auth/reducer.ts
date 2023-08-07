import { authTypes } from 'store/redux/types';
import { api } from 'services/api';
import { Auth } from 'interfaces/auth';
import { Employee } from 'interfaces/employee';

const initialState = {
  token: false,
  expiration: 0,
  auth: {} as Auth,
  employee: {} as Partial<Employee>,
  isLoggedIn: false,
  loadingLogin: false,
  loadingRegister: false,
  loadingUpdatePassword: false,
  loadingUpdateEmail: false,
  loadingUpdateUserName: false,
  loadingUpdateImage: false,
};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case authTypes.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.loadingRegister = true;
      return newState;
    }

    case authTypes.REGISTER_SUCCESS: {
      const newState = { ...state };
      newState.loadingRegister = false;
      return newState;
    }

    case authTypes.REGISTER_FAILURE: {
      const newState = { ...initialState };
      newState.loadingRegister = false;
      return newState;
    }

    case authTypes.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.loadingLogin = true;
      return newState;
    }

    case authTypes.LOGIN_SUCCESS: {
      const newState = { ...state };

      newState.token = action.payload.token;
      newState.auth = action.payload.user;
      newState.expiration = action.payload.expiration;
      newState.isLoggedIn = true;
      newState.loadingLogin = false;

      api.defaults.headers.Authorization = `Bearer ${action.payload.token}`;
      return newState;
    }

    case authTypes.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case authTypes.LOGOUT_USER: {
      const newState = { ...initialState, employee: state.employee };
      api.defaults.headers.Authorization = '';
      return newState;
    }

    case authTypes.CHANGE_USER_REQUEST: {
      const newState = { ...state };

      if ('email' in action.payload.data) newState.loadingUpdateEmail = true;
      else if ('password' in action.payload.data) newState.loadingUpdatePassword = true;
      else if ('url' in action.payload.data) newState.loadingUpdateImage = true;
      else newState.loadingUpdateUserName = true;

      return newState;
    }

    case authTypes.CHANGE_USER_SUCCESS: {
      const newState = { ...state };

      newState.loadingUpdateEmail = false;
      newState.loadingUpdatePassword = false;
      newState.loadingUpdateUserName = false;
      newState.loadingUpdateImage = false;

      newState.auth = { ...newState.auth, ...action.payload };
      return newState;
    }

    case authTypes.CHANGE_USER_FAILURE: {
      const newState = { ...state };
      newState.loadingUpdateEmail = false;
      newState.loadingUpdatePassword = false;
      newState.loadingUpdateUserName = false;
      newState.loadingUpdateImage = false;
      return newState;
    }

    case authTypes.SET_TEMP_USER: {
      const newState = { ...state };
      newState.employee = action.payload;
      return newState;
    }

    case 'resetAuthLoadings': {
      const newState = { ...state };

      newState.loadingLogin = false;
      newState.loadingUpdatePassword = false;
      newState.loadingUpdateEmail = false;
      newState.loadingUpdateUserName = false;
      newState.loadingUpdateImage = false;

      return newState;
    }

    default: {
      return state;
    }
  }
}
