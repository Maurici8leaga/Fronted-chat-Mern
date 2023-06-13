import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// Link es otra manera de usar un tag para navegar a otra parte de la pagina
import { useDispatch } from 'react-redux';
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
import useLocalStorage from '@hooks/useLocalStorage';
import useSessionStorage from '@hooks/useSessionStorage';
import { UtilsService } from '@services/utils/utils.service';
import { authService } from '@services/api/auth/auth.service';
import '@atoms/auth/login/Login.scss';

const Login = () => {
  // states
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [keepLoggedIn, setKeepLoggedIn] = useState(false);
  const [loading, setLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [user, setUser] = useState();
  const [setStoredUsername] = useLocalStorage('username', 'set'); // este es un  custom hook
  // de este  custom hook  el 1er parametro es el nombre del key y el 2do es la accion que tendra
  const [setLoggedIn] = useLocalStorage('keepLoggedIn', 'set');
  const [pageReload] = useSessionStorage('pageReload', 'set'); // este es un  custom hook
  const navigate = useNavigate();
  // "useNavigate" es un hook para navegar a otra pagina esto es de la version react-routter-dom 6
  // este useNavigate espera un "to" el cual se le puede pasar "/" conn la direccion o puedes coloca "-1" para regresar una pag anterior  o "+1" para ir adelante
  const dispatch = useDispatch();
  // useDispatch es el trigger de las actiones se debe usar el para ternimar de acticar las actiones

  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      // este es el actions el cual enviara la data al backend
      const result = await authService.signIn({ username, password }); // este es el body a enviar
      setLoggedIn(keepLoggedIn); // para recordar los datos del user y mantenerlo  logeado
      setStoredUsername(username); // se envia al localstorage el username
      setHasError(false);
      setAlertType('alert-success');
      UtilsService.dispatchUser(result, pageReload, dispatch, setUser);
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.message);
    }
  };

  useEffect(() => {
    if (loading && !user) return; // si esta cargando y no hay user entonces se quedara cargando
    if (user) navigate('/app/social/streams'); // si existe user redireccionara a la siguiente page
  }, [loading, navigate, user]);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={loginUser}>
        <div className="form-input-container">
          <Input
            id="username"
            name="username"
            type="text"
            value={username}
            labelText="Username"
            placeholder="Enter Username"
            style={{ border: `${hasError} ? '2px inset': ''` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError} ? '2px inset': ''` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
          <label className="checkmark-container" htmlFor="checkbox">
            <Input
              id="checkbox"
              name="checkbox"
              type="checkbox"
              value={keepLoggedIn}
              handleChange={() => setKeepLoggedIn(!keepLoggedIn)}
            />
            Keep me signed in
          </label>
        </div>
        <Button
          label={`${loading ? 'SIGNIN IN PROGRESS...' : 'SIGNIN'}`}
          className="auth-button button"
          disabled={!username || !password}
        />

        <Link to={'/forgot-password'}>
          <span className="forgot-password">
            Forgot password? <FaArrowRight className="arrow-right" />
          </span>
        </Link>
      </form>
    </div>
  );
};

export default Login;
