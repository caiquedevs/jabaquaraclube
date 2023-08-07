import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';

import { api } from 'services/api';
import { athleteTypes } from 'store/redux/types';

import * as actions from './actions';
import { tryCase } from 'utils/tryCase';

export function* fetchAthlete({ payload }: { payload: actions.fetchProps } & Action): any {
  yield tryCase(function* (): any {
    const { callBack } = payload;
    const response = yield call(api.get, '/athletes');

    yield put(actions.fetchSuccess(response.data));
    if (callBack) callBack(response.data);
  });
}

export function* createAthlete({ payload }: { payload: actions.createProps } & Action): any {
  yield tryCase(function* (): any {
    const { data, callBack } = payload;
    const response = yield call(api.post, '/athlete', data);

    yield put(actions.createSuccess(response.data));
    if (callBack) callBack();
  });
}

export default all([
  takeLatest(athleteTypes.FETCH_REQUEST, fetchAthlete),
  takeLatest(athleteTypes.CREATE_REQUEST, createAthlete),
]);
