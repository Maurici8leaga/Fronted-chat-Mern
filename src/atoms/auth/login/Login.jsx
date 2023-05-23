import { useState, useEffect } from 'react';
import { FaArrowRight } from 'react-icons/fa';
import { Link, useNavigate } from 'react-router-dom';
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
    //
  };

  useEffect(() => {
    // ciclos de vida
  }, []);

  return (
    <div className="auth-inner">
      {hasError && errorMessage && (
        <div className={`alerts ${alertType}`} role="alert">
          {errorMessage}
        </div>
      )}
      <form className="auth-form" onSubmit={loginUser}></form>
    </div>
  );
};

export default Login;
