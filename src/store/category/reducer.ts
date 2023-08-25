import { categoryTypes } from 'store/redux/types';
import { Category } from 'interfaces/category';

const initialState = {
  categories: null as Category[] | null,
  loading: { fetch: false, create: false, update: false, remove: false },
};

export function categoryReducer(state = initialState, action: any) {
  switch (action.type) {
    case categoryTypes.FETCH_REQUEST: {
      const newState = { ...state };
      newState.loading.fetch = true;
      return newState;
    }

    case categoryTypes.FETCH_SUCCESS: {
      const newState = { ...state };

      newState.categories = action.payload;
      newState.loading.fetch = false;

      return newState;
    }

    case categoryTypes.CREATE_REQUEST: {
      const newState = { ...state };
      newState.loading.create = true;
      return newState;
    }

    case categoryTypes.CREATE_SUCCESS: {
      const newState = { ...state };

      if (newState.categories) newState.categories.push(action.payload);
      else newState.categories = [action.payload];

      newState.loading.create = false;
      return newState;
    }

    case categoryTypes.CREATE_FAILURE: {
      const newState = { ...state };
      newState.loading.create = false;
      return newState;
    }

    case categoryTypes.UPDATE_REQUEST: {
      const newState = { ...state };
      newState.loading.update = true;
      return newState;
    }

    case categoryTypes.UPDATE_SUCCESS: {
      const newState = { ...state };

      delete action.payload.oldUri;

      const categoryIndex = newState.categories?.findIndex((category) => category._id === action.payload._id);
      newState.categories![categoryIndex!] = { ...newState.categories?.[categoryIndex!]!, ...action.payload };
      newState.loading.update = false;

      return newState;
    }

    case categoryTypes.REMOVE_REQUEST: {
      const newState = { ...state };
      newState.loading.remove = true;
      return newState;
    }

    case categoryTypes.REMOVE_SUCCESS: {
      const newState = { ...state };

      if (!newState.categories) return newState;

      console.log('action.payload._id', action.payload._id);
      newState.categories = newState.categories?.filter((category) => category._id !== action.payload._id);
      console.log('newState', newState);
      newState.loading.remove = false;

      return newState;
    }

    case 'LOGOUT_USER': {
      return initialState;
    }

    default: {
      return state;
    }
  }
}
