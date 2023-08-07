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
      newState.loading.create = false;
      return newState;
    }

    default: {
      return state;
    }
  }
}
