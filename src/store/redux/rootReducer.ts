import { combineReducers } from 'redux';

import { authReducer } from 'store/auth/reducer';
import { athleteReducer } from 'store/athlete/reducer';
import { actionLogReducer } from 'store/actionLogs/reducer';
import { categoryReducer } from 'store/category/reducer';

const rootReducer = combineReducers({
  authReducer,
  athleteReducer,
  actionLogReducer,
  categoryReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
