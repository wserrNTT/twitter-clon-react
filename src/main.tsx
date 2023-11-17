// React
import React from 'react';
import ReactDOM from 'react-dom/client';
import App from '@/App.tsx';

// Redux
import { store } from '@/store/';
import { Provider } from 'react-redux';

// Styles
import '@/assets/index.scss';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);
