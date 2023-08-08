import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { get } from 'lodash';

import { api } from 'services/api';
import types, { authTypes } from 'store/redux/types';

import * as actions from './actions';

function* registerRequestSagas({ payload }: { payload: actions.RegisterRequestProps } & Action): any {
  const { data, callBack } = payload;

  try {
    const response = yield call(api.post, '/user/register', data);

    yield put(actions.loginSuccess(response.data));
    yield put(actions.registerSuccess());

    if (callBack) callBack(data);
  } catch (error: any) {
    toast.warn(error?.response?.data?.msg!);
    yield put(actions.registerFailure());
  }
}

export function* loginRequestSagas({ payload }: { payload: actions.LoginRequestProps } & Action): any {
  const { data, callBack } = payload;

  try {
    const response = yield call(api.post, '/login', data);

    yield put(actions.loginSuccess(response.data));
    if (callBack) callBack();
  } catch (error: any) {
    toast.warn(error.response.data.msg);
    yield put(actions.loginFailure());
  }
}

function persistRehydrate({ payload }: any) {
  const token = get(payload, 'authReducer.token', '');
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(authTypes.LOGIN_REQUEST, loginRequestSagas),
  takeLatest(authTypes.REGISTER_REQUEST, registerRequestSagas),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
