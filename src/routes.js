import { useRoutes } from 'react-router-dom';
import AuthTabs from '@atoms/auth/auth-tabs/AuthTabs';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import ResetPassword from '@atoms/auth/reset-password/ResetPassword';
import Streams from '@atoms/social/streams/Streams';
import ErrorNotFound from '@atoms/error/ErrorNotFound';
import Social from '@atoms/social/Social';

export const AppRouter = () => {
  const elements = useRoutes([
    // esto es implementacion de react-router-dom v6 en adelante
    // useRoutes es donde se definen las rutas de los componentes del proyecto
    {
      path: '/',
      // en el path va la ruta que el user podra visitar
      element: <AuthTabs />
    },
    {
      path: '/forgot-password',
      element: <ForgotPassword />
    },
    {
      path: '/reset-password',
      element: <ResetPassword />
    },
    {
      path: '/app/social',
      // path es la ruta padre
      element: <Social />,
      children: [
        // de esta forma se crea una ruta hija
        {
          path: 'streams',
          element: <Streams />
        }
      ]
    },
    {
      path: '*',
      // para esta seccion que se aplicara un NotFound , si se quiere mostrar este component se colocaa en el path "*" para que cualquier ruta
      // que no este en este "useRoutes" le muestre este componente
      element: <ErrorNotFound />
    }
  ]);

  return elements;
};
