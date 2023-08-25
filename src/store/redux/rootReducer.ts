import { combineReducers } from 'redux';
import storage from 'redux-persist/lib/storage';

import { authReducer } from 'store/auth/reducer';
import { athleteReducer } from 'store/athlete/reducer';
import { actionLogReducer } from 'store/actionLogs/reducer';
import { categoryReducer } from 'store/category/reducer';

import { persistReducer } from 'redux-persist';

const authPersistConfig = {
  key: 'auth',
  storage,
  whitelist: ['token', 'expiration', 'isLoggedIn', 'auth'],
};

const rootReducer = combineReducers({
  authReducer: persistReducer(authPersistConfig, authReducer),
  athleteReducer,
  actionLogReducer,
  categoryReducer,
});

export type RootReducer = ReturnType<typeof rootReducer>;
export default rootReducer;
