import { call, put, all, takeLatest } from 'redux-saga/effects';
import { toast } from 'react-toastify';
import { Action } from 'redux';
import { get } from 'lodash';

import { api } from 'services/api';
import types, { authTypes } from 'store/redux/types';

import * as actions from './actions';
import { tryCase } from 'utils/tryCase';

export function* login({ payload }: { payload: actions.LoginRequestProps } & Action): any {
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

export function* fetch({ payload }: { payload: actions.fetchProps } & Action): any {
  yield tryCase(function* (): any {
    const { callBack } = payload;
    const response = yield call(api.get, '/users');

    yield put(actions.fetchSuccess(response.data));
    if (callBack) callBack(response.data);
  });
}

function* register({ payload }: { payload: actions.RegisterRequestProps } & Action): any {
  const { data, callBack } = payload;

  try {
    const response = yield call(api.post, '/register', data);
    yield put(actions.registerSuccess(response.data));
    if (callBack) callBack(response.data);
  } catch (error: any) {
    toast.warn(error?.response?.data?.msg!);
    yield put(actions.registerFailure());
  }
}

function* update({ payload }: { payload: actions.updateProps } & Action): any {
  const { data, callBack } = payload;

  try {
    const response = yield call(api.put, `/change-user/${data._id}`, data);
    yield put(actions.updateSuccess(response.data));
    if (callBack) callBack();
  } catch (error: any) {
    toast.warn(error?.response?.data?.msg!);
    yield put(actions.updateFailure());
  }
}

function persistRehydrate({ payload }: any) {
  const token = get(payload, 'token', '');
  if (token) api.defaults.headers.Authorization = `Bearer ${token}`;
}

export default all([
  takeLatest(authTypes.FETCH_REQUEST, fetch),
  takeLatest(authTypes.REGISTER_REQUEST, register),
  takeLatest(authTypes.CHANGE_USER_REQUEST, update),
  takeLatest(authTypes.REMOVE_REQUEST, update),
  takeLatest(authTypes.LOGIN_REQUEST, login),
  takeLatest(types.PERSIST_REHYDRATE, persistRehydrate),
]);
