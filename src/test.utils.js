import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router } from 'react-router-dom';
import { createBrowserHistory } from 'history';
import PropTypes from 'prop-types';
import { store } from '@redux-toolkit/store';

// si se esta en un entorno con redux esto debe ir
const Providers = ({ children }) => {
  return (
    <Provider store={store}>
      <Router>{children}</Router>
    </Provider>
  );
};

Providers.propTypes = {
  children: PropTypes.node.isRequired
};

// ESTA CONFIGURACION ES ESTANDAR

// renderizar componentes al comenzar un test y darles contexto del store de redux
const customRender = (ui, options) => render(ui, { wrapper: Providers, ...options });
// Los componentes que se rendericen tengan contexto de manipulaciones con funcionalidades de rutas, por ej: falsear el react router, sus hooks y realizar navegaciones
const renderWithRouter = (ui) => {
  const history = createBrowserHistory();
  return {
    history,
    ...render(ui, { wrapper: Providers })
  };
};

export * from '@testing-library/react';
export { customRender };
export { renderWithRouter };
