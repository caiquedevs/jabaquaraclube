import { combineReducers } from 'redux';

import { authReducer } from 'store/auth/reducer';
import { athleteReducer } from 'store/athlete/reducer';
import { actionLogReducer } from 'store/actionLogs/reducer';

const rootReducer = combineReducers({
  authReducer,
  athleteReducer,
  actionLogReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
