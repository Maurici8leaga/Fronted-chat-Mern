import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
// Link es otra manera de usar un tag para navegar a otra parte de la pagina
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
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

  const navigate = useNavigate();
  // "useNavigate" es un hook para navegar a otra pagina esto es de la version react-routter-dom 6
  // este useNavigate espera un "to" el cual se le puede pasar "/" conn la direccion o puedes coloca "-1" para regresar una pag anterior  o "+1" para ir adelante

  const loginUser = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      // este es el actions el cual enviara la data al backend
      const result = await authService.signIn({ username, password }); // este es el body a enviar
      setUser(result.data.user);
      setKeepLoggedIn(keepLoggedIn); // para recordar los datos del user y mantenerlo  logeado
      setHasError(false);
      setAlertType('alert-success');
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
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
            handleChange={(event) => setUsername(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="text"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
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
