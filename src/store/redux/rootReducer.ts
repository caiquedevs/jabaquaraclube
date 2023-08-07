import { combineReducers } from 'redux';

import { authReducer } from 'store/auth/reducer';
import { athleteReducer } from 'store/athlete/reducer';

const rootReducer = combineReducers({
  authReducer,
  athleteReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
