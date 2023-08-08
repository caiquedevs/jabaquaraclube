import { all } from 'redux-saga/effects';

import authSagas from 'store/auth/sagas';
import athleteSagas from 'store/athlete/sagas';
import actionLogs from 'store/actionLogs/sagas';

export default function* rootSaga(): any {
  return yield all([authSagas, athleteSagas, actionLogs]);
}
