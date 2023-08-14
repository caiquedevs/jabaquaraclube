import { call, put, all, takeLatest } from 'redux-saga/effects';
import { Action } from 'redux';

import { api } from 'services/api';
import { categoryTypes } from 'store/redux/types';

import * as actions from './actions';
import { tryCase } from 'utils/tryCase';
import { toast } from 'react-toastify';

export function* fetchCategory({ payload }: { payload: actions.fetchProps } & Action): any {
  yield tryCase(function* (): any {
    const { callBack } = payload;
    const response = yield call(api.get, '/categories');

    yield put(actions.fetchSuccess(response.data));
    if (callBack) callBack(response.data);
  });
}

export function* createCategory({ payload }: { payload: actions.createProps } & Action): any {
  try {
    const { data, callBack } = payload;
    const response = yield call(api.post, '/category', data);

    yield put(actions.createSuccess(response.data));
    if (callBack) callBack();
  } catch (error: any) {
    toast.warn(error.response?.data?.msg || 'Erro desconhecido');
    yield put(actions.createFailure());
  }
}

export function* updateCategory({ payload }: { payload: actions.updateProps } & Action): any {
  yield tryCase(function* (): any {
    const { data, callBack } = payload;
    const response = yield call(api.put, `/category/${data._id}`, data);

    yield put(actions.updateSuccess(response.data));
    if (callBack) callBack();
  });
}

export function* removeCategory({ payload }: { payload: actions.removeProps } & Action): any {
  yield tryCase(function* (): any {
    const { data, callBack } = payload;
    const response = yield call(api.delete, `/category/${data._id}`, data);

    toast.success('Atleta removido com sucesso!');

    yield put(actions.removeSuccess(response.data));
    if (callBack) callBack();
  });
}

export default all([
  takeLatest(categoryTypes.FETCH_REQUEST, fetchCategory),
  takeLatest(categoryTypes.CREATE_REQUEST, createCategory),
  takeLatest(categoryTypes.UPDATE_REQUEST, updateCategory),
  takeLatest(categoryTypes.REMOVE_REQUEST, removeCategory),
]);
