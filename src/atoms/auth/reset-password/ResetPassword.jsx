import { useState } from 'react';
import { Link, useSearchParams, useNavigate } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
import { authService } from '@services/api/auth/auth.service';
import backgroundImage from '@assets/images/background.jpg';
import '@atoms/auth/reset-password/ResetPassword.scss';

const ResetPassword = () => {
  // states
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const [searchParams] = useSearchParams();
  // "useSearchParams" es un hook de react-router-dom que permite tomar el parametro del URL de la pag que se encuentra

  const navigate = useNavigate();

  const resetPassword = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      const body = { password, confirmPassword };
      const token = searchParams.get('token');
      // en searchParams.get el nombre a buscar el parametro que en este caso es el token tiene que ser exactamente el mismo nombre que se. coloco en el back

      // este es el actions el cual enviara la data al backend
      const response = await authService.resetPassword(token, body);
      setLoading(false);
      setPassword(''); // borra el state para una vez enviado quede vacio
      setConfirmPassword('');
      setShowAlert(false);
      setAlertType('alert-success');
      setResponseMessage(response?.data?.message); // para mostrar el mensaje de cambio correcto
      navigate('/'); // redireccionar despues de resetiar el password
    } catch (error) {
      setAlertType('alert-error');
      setLoading(false);
      setShowAlert(true);
      setResponseMessage(error?.response?.data?.message);
    }
  };
  return (
    <div className="container-wrapper" style={{ backgroundImage: `url(${backgroundImage})` }}>
      <div className="environment">DEV</div>
      <div className="container-wrapper-auth">
        <div className="tabs reset-password-tabs" style={{ height: `${responseMessage} ? '400px' : ''} ` }}>
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login reset-password">Reset Password</div>
              </li>
            </ul>
            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="reset-password-form" onSubmit={resetPassword}>
                  <div className="form-input-container">
                    <Input
                      id="password"
                      name="password"
                      type="password"
                      value={password}
                      labelText="New Password"
                      placeholder="New Password"
                      style={{ border: `${showAlert} ? '1px solid #fa9b8a': ''` }}
                      handleChange={(e) => setPassword(e.target.value)}
                    />
                    <Input
                      id="confirmPassword"
                      name="confirmPassword"
                      type="password"
                      value={confirmPassword}
                      labelText="Confirm Password"
                      placeholder="Confirm Password"
                      style={{ border: `${showAlert} ? '1px solid #fa9b8a': ''` }}
                      handleChange={(e) => setConfirmPassword(e.target.value)}
                    />
                  </div>
                  <Button
                    label={`${loading ? 'RESET PASSWORD IN PROGRESS...' : 'RESET PASSWORD'}`}
                    className="auth-button button"
                    disabled={!password || !confirmPassword}
                  />

                  <Link to={'/'}>
                    <span className="login">
                      <FaArrowLeft className="arrow-left" /> Back to Login
                    </span>
                  </Link>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResetPassword;
