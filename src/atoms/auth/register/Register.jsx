import { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import Input from '@molecules/input/Input';
// import { authService } from '@services/api/auth/auth.service';
import '@atoms/auth/register/Register.scss';

const Register = () => {
  // states
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  // const [errorMessage, setErrorMessage] = useState('');
  // const [alertType, setAlertType] = useState('');
  // const [hasError, setHasError] = useState(false);
  // const [user, setUser] = useState();

  // const navigate = useNavigate();
  // "useNavigate" es un hook para navegar a otra pagina esto es de la version react-routter-dom 6
  // este useNavigate espera un "to" el cual se le puede pasar "/" conn la direccion o puedes coloca "-1" para regresar una pag anterior  o "+1" para ir adelante

  const registerUser = async (event) => {
    setLoading(true);
    // este "setLoading" pasara a true si el usuario lleno todos los input y le dio click al button
    event.preventDefault();
  };

  // ciclos de vida
  useEffect(() => {}, []);

  return (
    <form className="auth-form" onSubmit={registerUser}>
      <div className="form-input-container">
        <Input
          id="username"
          name="username"
          type="text"
          value={username}
          labelText="Username"
          placeholder="Enter Username"
          style={{}}
          handleChange={(event) => setUsername(event.target.value)}
        />
        <Input
          id="email"
          name="email"
          type="text"
          value={email}
          labelText="Email"
          placeholder="Enter Email"
          style={{}}
          handleChange={(event) => setEmail(event.target.value)}
        />
        <Input
          id="password"
          name="password"
          type="text"
          value={password}
          labelText="Password"
          placeholder="Enter Password"
          style={{}}
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
  );
};

export default Register;
