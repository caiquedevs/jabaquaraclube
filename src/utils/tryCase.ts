import { toast } from 'react-toastify';
// tryCatchSaga.js

export function* tryCase(func: any, ...args: any) {
  try {
    yield* func(...args);
  } catch (error: any) {
    toast.warn(error.response?.data?.msg || 'Erro desconhecido');
    // Aqui você pode adicionar qualquer outra lógica de tratamento de erro que desejar
  }
}
