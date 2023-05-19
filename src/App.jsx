import { BrowserRouter } from 'react-router-dom';
import { AppRouter } from '@root/routes';
import '@root/App.scss';

// Design Pattern Atomic: https://medium.com/pixel-perfect/qu%C3%A9-es-el-dise%C3%B1o-at%C3%B3mico-a5cbed06688e
// Design Pattern High Order Components (HOC): https://es.legacy.reactjs.org/docs/higher-order-components.html
const App = () => (
  <>
    <BrowserRouter>
      {/* BrowserRouter es el que engloba todas las rutas a ser interpretadas por el browser */}
      <AppRouter />
      {/* de forma mas estetica see pasa dentro de AppRouter todas las rutas de la pag */}
    </BrowserRouter>
  </>
);

export default App;
