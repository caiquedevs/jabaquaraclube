import { actionLogTypes } from 'store/redux/types';
import { ActionLog } from 'interfaces/actionLog';

const initialState = {
  actionLogs: null as ActionLog[] | null,
  loading: { fetch: false, create: false, update: false, remove: false },
};

export function actionLogReducer(state = initialState, action: any) {
  switch (action.type) {
    case actionLogTypes.FETCH: {
      const newState = { ...state };
      newState.loading.fetch = true;
      return newState;
    }

    case actionLogTypes.FETCH_SUCCESS: {
      const newState = { ...state };

      newState.actionLogs = action.payload;
      newState.loading.fetch = false;

      return newState;
    }

    default: {
      return state;
    }
  }
}
