import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';

import { api } from 'services/api';
import { actionLogTypes } from 'store/redux/types';

import * as actions from './actions';
import { tryCase } from 'utils/tryCase';

export function* fetchActionLog({ payload }: { payload: actions.fetchProps } & Action): any {
  yield tryCase(function* (): any {
    const { callBack } = payload;
    const response = yield call(api.get, '/action-logs');

    yield put(actions.fetchSuccess(response.data));
    if (callBack) callBack(response.data);
  });
}

export default all([takeLatest(actionLogTypes.FETCH, fetchActionLog)]);
