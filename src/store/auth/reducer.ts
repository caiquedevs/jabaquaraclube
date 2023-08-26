import { authTypes } from 'store/redux/types';
import { api } from 'services/api';
import { Auth } from 'interfaces/auth';

const initialState = {
  token: false,
  expiration: 0,
  auth: {} as Auth,
  isLoggedIn: false,

  users: null as Auth[] | null,
  loading: { login: false, fetch: false, create: false, update: false, remove: false },
};

export function authReducer(state = initialState, action: any) {
  switch (action.type) {
    case authTypes.FETCH_REQUEST: {
      const newState = { ...state };
      newState.loading.fetch = true;
      return newState;
    }

    case authTypes.FETCH_SUCCESS: {
      const newState = { ...state };

      newState.loading.fetch = false;
      newState.users = action.payload;

      return newState;
    }

    case authTypes.FETCH_FAILURE: {
      const newState = { ...initialState };
      newState.loading.fetch = false;
      return newState;
    }

    case authTypes.REGISTER_REQUEST: {
      const newState = { ...state };
      newState.loading.create = true;
      return newState;
    }

    case authTypes.REGISTER_SUCCESS: {
      const newState = { ...state };

      if (newState.users) newState.users.push(action.payload);
      else newState.users = [...action.payload];
      newState.loading.create = false;

      console.log(newState.users);

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
      const newState = { ...state };
      newState.loading.login = false;
      return newState;
    }

    case authTypes.LOGOUT_USER: {
      const newState = { ...initialState };
      localStorage.removeItem('persist:auth');
      api.defaults.headers.Authorization = '';
      return newState;
    }

    case authTypes.CHANGE_USER_REQUEST: {
      const newState = { ...state };
      newState.loading.update = true;
      return newState;
    }

    case authTypes.CHANGE_USER_SUCCESS: {
      const newState = { ...state };

      const users = newState.users?.map((user) => {
        if (user._id === action.payload._id) user = action.payload;
        return user;
      });

      newState.users = users!;
      newState.loading.update = false;
      newState.loading.remove = false;

      return newState;
    }

    case authTypes.CHANGE_USER_FAILURE: {
      const newState = { ...state };
      newState.loading.update = false;
      newState.loading.remove = false;
      return newState;
    }

    case authTypes.REMOVE_REQUEST: {
      const newState = { ...state };
      newState.loading.remove = true;
      return newState;
    }

    case authTypes.REMOVE_SUCCESS: {
      const newState = { ...state };

      const users = newState.users?.map((user) => {
        if (user._id === action.payload._id) user.active = false;
        return user;
      });

      newState.users = users!;
      newState.loading.remove = false;

      return newState;
    }

    case authTypes.REMOVE_FAILURE: {
      const newState = { ...state };
      newState.loading.remove = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
