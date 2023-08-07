import { ToastContainer } from 'react-toastify';
import Routes from 'routes';

import 'react-toastify/dist/ReactToastify.min.css';

type Props = {};

export default function App({}: Props) {
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
