import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import '@atoms/error/ErrorNotFound.scss';

// Design Patern Render Props: https://medium.com/@miguel.angel.romero.gtz/apuntes-de-react-patrones-render-props-949006ac097f
const ErrorNotFound = () => {
  const navigate = useNavigate();
  // "useNavigate" es un hook para navegar a otra pagina esto es de la version react-routter-dom 6
  // este useNavigate espera un "to" el cual se le puede pasar "/" conn la direccion o puedes coloca "-1" para regresar una pag anterior  o "+1" para ir adelante

  return (
    <div className="error-container">
      <div className="oops">Oops!</div>
      <p className="not-found">Error 404: Page Not Found</p>
      <Button label="Back Home" className="back-button button" handleClick={() => navigate(-1)} />
    </div>
  );
};

export default ErrorNotFound;
