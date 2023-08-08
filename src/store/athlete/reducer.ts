import { athleteTypes } from 'store/redux/types';
import { Athlete } from 'interfaces/athlete';

const initialState = {
  athletes: null as Athlete[] | null,
  loading: { fetch: false, create: false, update: false, remove: false },
};

export function athleteReducer(state = initialState, action: any) {
  switch (action.type) {
    case athleteTypes.FETCH_REQUEST: {
      const newState = { ...state };
      newState.loading.fetch = true;
      return newState;
    }

    case athleteTypes.FETCH_SUCCESS: {
      const newState = { ...state };

      newState.athletes = action.payload;
      newState.loading.fetch = false;

      return newState;
    }

    case athleteTypes.CREATE_REQUEST: {
      const newState = { ...state };
      newState.loading.create = true;
      return newState;
    }

    case athleteTypes.CREATE_SUCCESS: {
      const newState = { ...state };

      if (newState.athletes) newState.athletes.push(action.payload);
      else newState.athletes = [action.payload];

      newState.loading.create = false;
      return newState;
    }

    case athleteTypes.UPDATE_REQUEST: {
      const newState = { ...state };
      newState.loading.update = true;
      return newState;
    }

    case athleteTypes.UPDATE_SUCCESS: {
      const newState = { ...state };

      delete action.payload.oldUri;

      const athleteIndex = newState.athletes?.findIndex((athlete) => athlete._id === action.payload._id);
      newState.athletes![athleteIndex!] = { ...newState.athletes?.[athleteIndex!]!, ...action.payload };
      newState.loading.update = false;

      return newState;
    }

    case athleteTypes.REMOVE_REQUEST: {
      const newState = { ...state };
      newState.loading.remove = true;
      return newState;
    }

    case athleteTypes.REMOVE_SUCCESS: {
      const newState = { ...state };

      if (!newState.athletes) return newState;

      console.log('action.payload._id', action.payload._id);
      newState.athletes = newState.athletes?.filter((athlete) => athlete._id !== action.payload._id);
      console.log('newState', newState);
      newState.loading.remove = false;

      return newState;
    }

    default: {
      return state;
    }
  }
}
