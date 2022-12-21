import React from 'react';
import ReactDOM from 'react-dom/client';
// style + assets
import './assets/scss/style.scss';
// third party
import { BrowserRouter } from 'react-router-dom';
import { Provider } from 'react-redux';
import './i18n.js'
import AuthContext from './contexts/AuthContext';

//config
import config from './config';
import App from './App';

import { store } from './redux/store'
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContext>
      <Provider store={store}>
          <BrowserRouter basename={config.basename}>
              <App />
          </BrowserRouter>
      </Provider>
  </AuthContext>
);


