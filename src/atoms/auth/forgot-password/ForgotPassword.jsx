import { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaArrowLeft } from 'react-icons/fa';
import Input from '@molecules/input/Input';
import Button from '@molecules/button/Button';
import { authService } from '@services/api/auth/auth.service';
import backgroundImage from '@assets/images/background.jpg';
import '@atoms/auth/forgot-password/ForgotPassword.scss';

const ForgotPassword = () => {
  // states
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [showAlert, setShowAlert] = useState(false);
  const [alertType, setAlertType] = useState('');
  const [responseMessage, setResponseMessage] = useState('');

  const forgotPassword = async (event) => {
    setLoading(true);
    event.preventDefault();
    try {
      // este es el actions el cual enviara la data al backend
      const response = await authService.forgotPassword(email); // este es el body a enviar
      setLoading(false);
      setEmail('');
      setShowAlert(false);
      setAlertType('alert-success');
      setResponseMessage(response?.data?.message); // mensaje  para mostrar que se envio bien el correo
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
        <div className="tabs forgot-password-tabs" style={{ height: `${responseMessage ? '300px' : ''}` }}>
          <div className="tabs-auth">
            <ul className="tab-group">
              <li className="tab">
                <div className="login forgot-password">Forgot Password</div>
              </li>
            </ul>

            <div className="tab-item">
              <div className="auth-inner">
                {responseMessage && (
                  <div className={`alerts ${alertType}`} role="alert">
                    {responseMessage}
                  </div>
                )}
                <form className="forgot-password-form" onSubmit={forgotPassword}>
                  <div>
                    <Input
                      id="email"
                      name="email"
                      type="text"
                      value={email}
                      labelText="Email"
                      placeholder="Enter Email"
                      style={{ border: `${showAlert} ? '2px inset': ''` }}
                      handleChange={(e) => setEmail(e.target.value)}
                    />
                  </div>
                  <Button
                    label={`${loading ? 'FORGOT PASSWORD IN PROGRESS...' : 'FORGOT PASSWORD'}`}
                    className="auth-button button"
                    disabled={!email}
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

export default ForgotPassword;
