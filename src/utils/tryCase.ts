import { toast } from 'react-toastify';
import { put } from 'redux-saga/effects';
import * as actionsAuth from 'store/auth/actions';

export function* tryCase(func: any, ...args: any) {
  try {
    // alert(args);
    yield* func(...args);
  } catch (error: any) {
    if (error.response.status === 401) yield put(actionsAuth.logoutUser());
    toast.warn(error.response?.data?.msg || 'Erro desconhecido');
    // Aqui você pode adicionar qualquer outra lógica de tratamento de erro que desejar
  }
}
