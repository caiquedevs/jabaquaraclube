import React from 'react';
import { ToastContainer } from 'react-toastify';
import Routes from 'routes';

import 'react-toastify/dist/ReactToastify.min.css';
import { useAppSelector } from 'hooks/useAppSelector';
import { useDispatch } from 'react-redux';
import * as actionsCategory from 'store/category/actions';

type Props = {};

export default function App({}: Props) {
  const dispatch = useDispatch();

  const { categories } = useAppSelector((state) => state.categoryReducer);

  React.useEffect(() => {
    if (categories === null) dispatch(actionsCategory.fetch({}));

    return () => {};
  }, []);

  return (
    <>
      <Routes />
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={true}
        pauseOnFocusLoss
        closeOnClick
        pauseOnHover
        rtl={false}
        draggable
      />
    </>
  );
}
