import React from 'react';
import ReactDOM from 'react-dom/client';
// style + assets
import './assets/scss/style.scss';
// third party
import { Provider } from 'react-redux';
import './i18n.ts'
import AuthContext from './contexts/AuthContext';
import App from './App';
import { store } from './redux/store'

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <AuthContext>
      <Provider store={store}>
              <App />
      </Provider>
  </AuthContext>
);


