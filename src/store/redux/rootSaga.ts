import { all } from 'redux-saga/effects';

import authSagas from 'store/auth/sagas';
import athleteSagas from 'store/athlete/sagas';

export default function* rootSaga(): any {
  return yield all([authSagas, athleteSagas]);
}
