import { authTypes } from 'store/redux/types';
import { api } from 'services/api';
import { Auth } from 'interfaces/auth';

const initialState = {
  token: false,
  expiration: 0,
  auth: {} as Auth,
  isLoggedIn: false,
  loading: { login: false, create: false, update: false, remove: false },
};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case authTypes.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.loading.create = true;
      return newState;
    }

    case authTypes.REGISTER_SUCCESS: {
      const newState = { ...state };
      newState.loading.create = false;
      return newState;
    }

    case authTypes.REGISTER_FAILURE: {
      const newState = { ...initialState };
      newState.loading.create = false;
      return newState;
    }

    case authTypes.LOGIN_REQUEST: {
      const newState = { ...state };
      newState.loading.login = true;
      return newState;
    }

    case authTypes.LOGIN_SUCCESS: {
      const newState = { ...state };

      newState.token = action.payload.token;
      newState.auth = action.payload.user;
      newState.expiration = action.payload.expiration;
      newState.isLoggedIn = true;
      newState.loading.login = false;

      api.defaults.headers.Authorization = `Bearer ${action.payload.token}`;
      return newState;
    }

    case authTypes.LOGIN_FAILURE: {
      const newState = { ...initialState };
      return newState;
    }

    case authTypes.LOGOUT_USER: {
      const newState = { ...initialState };
      api.defaults.headers.Authorization = '';
      return newState;
    }

    case authTypes.CHANGE_USER_REQUEST: {
      const newState = { ...state };

      // if ('email' in action.payload.data) newState.loadingUpdateEmail = true;
      // else if ('password' in action.payload.data) newState.loadingUpdatePassword = true;
      // else if ('url' in action.payload.data) newState.loadingUpdateImage = true;
      // else newState.loadingUpdateUserName = true;

      return newState;
    }

    case authTypes.CHANGE_USER_SUCCESS: {
      const newState = { ...state };

      // newState.loadingUpdateEmail = false;
      // newState.loadingUpdatePassword = false;
      // newState.loadingUpdateUserName = false;
      // newState.loadingUpdateImage = false;

      newState.auth = { ...newState.auth, ...action.payload };
      return newState;
    }

    case authTypes.CHANGE_USER_FAILURE: {
      const newState = { ...state };

      // newState.loadingUpdateEmail = false;
      // newState.loadingUpdatePassword = false;
      // newState.loadingUpdateUserName = false;
      // newState.loadingUpdateImage = false;

      return newState;
    }

    default: {
      return state;
    }
  }
}
