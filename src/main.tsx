import ReactDOM from 'react-dom/client';

import { PersistGate } from 'redux-persist/integration/react';

import { Provider } from 'react-redux';
import store, { persistor } from 'store/redux';

import { BrowserRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-tailwind/react';

import './main.css';
import App from 'App';

ReactDOM.createRoot(document.getElementById('root')!).render(
  // <React.StrictMode>
  <Provider store={store}>
    <PersistGate persistor={persistor}>
      <BrowserRouter>
        <ThemeProvider>
          <App />
        </ThemeProvider>
      </BrowserRouter>
    </PersistGate>
  </Provider>
  // </React.StrictMode>
);
