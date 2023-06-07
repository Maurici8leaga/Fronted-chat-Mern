import React from 'react';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux'; // habilita las variables a todos los componentes de la app
import { store } from '@redux-toolkit/store'; // almacen de datos del estado global
import App from '@root/App';
import '@root/index.scss';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  // OJO ES BUENA PRACTICA COLOCAR EL PROVIDER DENTRO DEL INDEX
  <Provider store={store}>
    <App />
  </Provider>
);
