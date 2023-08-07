import storage from 'redux-persist/lib/storage';
import { persistReducer } from 'redux-persist';

export default function reduxPersist(reducers: any) {
  const persistedReducers = persistReducer(
    {
      key: 'jabaquaraclube',
      storage,
      whitelist: ['authReducer'],
    },
    reducers
  );
  return persistedReducers;
}
