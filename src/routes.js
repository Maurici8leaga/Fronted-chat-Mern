import { useRoutes } from 'react-router-dom';
import AuthTabs from '@atoms/auth/auth-tabs/AuthTabs';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import ResetPassword from '@atoms/auth/reset-password/ResetPassword';
import Streams from '@atoms/social/streams/Streams';
import ErrorNotFound from '@atoms/error/ErrorNotFound';
import Social from '@atoms/social/Social';

export const AppRouter = () => {
  const elements = useRoutes([
    {
      path: '/',
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
      element: <Social />,
      children: [
        {
          path: 'streams',
          element: <Streams />
        }
      ]
    },
    {
      path: '*',
      element: <ErrorNotFound />
    }
  ]);

  return elements;
};
