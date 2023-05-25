import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import Input from '@molecules/input/Input';
import { authService } from '@services/api/auth/auth.service';
import { UtilsService } from '@services/utils/utils.service';
import '@atoms/auth/register/Register.scss';

const Register = () => {
  // states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [alertType, setAlertType] = useState('');
  const [hasError, setHasError] = useState(false);
  const [user, setUser] = useState();

  const navigate = useNavigate();
  // "useNavigate" es un hook para navegar a otra pagina esto es de la version react-routter-dom 6
  // este useNavigate espera un "to" el cual se le puede pasar "/" conn la direccion o puedes coloca "-1" para regresar una pag anterior  o "+1" para ir adelante

  const registerUser = async (event) => {
    setLoading(true);
    // este "setLoading" pasara a true si el usuario lleno todos los input y le dio click al button
    event.preventDefault();
    try {
      const avatarColor = UtilsService.avatarColor(); // este generara el color random de la img
      const avatarImage = UtilsService.generateAvatar(username.charAt(0).toUpperCase(), avatarColor); // va a generar la primera letra en mayuscula y setiara  el color
      // este es el actions el cual enviara la data al backend
      const result = await authService.signUp({
        // este es el body a enviar
        username,
        email,
        password,
        avatarColor,
        avatarImage
      });
      console.log(result);
      setUser(result.data.user);
      setHasError(false);
      setAlertType('alert-success');
    } catch (error) {
      setLoading(false);
      setHasError(true);
      setAlertType('alert-error');
      setErrorMessage(error?.response?.data.message);
    }
  };

  // ciclos de vida
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
      <form className="auth-form" onSubmit={registerUser}>
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
            id="email"
            name="email"
            type="text"
            value={email}
            labelText="Email"
            placeholder="Enter Email"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
            handleChange={(event) => setEmail(event.target.value)}
          />
          <Input
            id="password"
            name="password"
            type="password"
            value={password}
            labelText="Password"
            placeholder="Enter Password"
            style={{ border: `${hasError} ? '1px solid #fa9b8a': ''` }}
            handleChange={(event) => setPassword(event.target.value)}
          />
        </div>
        <Button
          label={`${loading ? 'SIGN UP IN PROGRESS...' : 'SIGN UP'}`}
          className="auth-button button"
          disabled={!username || !email || !password}
          // disabled es paraa que si el usuario no ha llenado los inputs este no se habilite
        />
      </form>
    </div>
  );
};

export default Register;
