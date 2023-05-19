import { useRoutes } from 'react-router-dom';
import AuthTabs from '@atoms/auth/auth-tabs/AuthTabs';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import ResetPassword from '@atoms/auth/reset-password/ResetPassword';
import Streams from '@atoms/social/streams/Streams';

export const AppRouter = () => {
  const elements = useRoutes([
    // esto es implementacion de react-router-dom v6 en adelante
    // useRoutes es donde se definen las rutas de los componentes del proyecto
    {
      path: '/',
      element: <AuthTabs />
    },
    {
      path: '/forgot/password',
      element: <ForgotPassword />
    },
    {
      path: '/reset/password',
      element: <ResetPassword />
    },
    {
      path: '/app/social/streams',
      element: <Streams />
    }
  ]);

  return elements;
};
