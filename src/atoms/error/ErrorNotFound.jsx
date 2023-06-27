import { useNavigate } from 'react-router-dom';
import Button from '@molecules/button/Button';
import '@atoms/error/ErrorNotFound.scss';

const ErrorNotFound = () => {
  const navigate = useNavigate();

  return (
    <div className="error-container">
      <div className="oops">Oops!</div>
      <p className="not-found">Error 404: Page Not Found</p>
      <Button label="Back Home" className="back-button button" handleClick={() => navigate(-1)} />
    </div>
  );
};

export default ErrorNotFound;
