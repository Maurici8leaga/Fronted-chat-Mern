import { screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
import Register from '@atoms/auth/register/Register';
import { server } from '@mocks/server';
import { UtilsService } from '@services/utils/utils.service';
import { signUpMock, signUpMockErrorEmailNotValid } from '@mocks/handlers/auth';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Register Page', () => {
  it('Signup form should have its labels', () => {
    customRender(<Register />);

    const usernameLabel = screen.getByLabelText('Username');
    const emailLabel = screen.getByLabelText('Email');
    const passwordLabel = screen.getByLabelText('Password');

    expect(usernameLabel).toBeInTheDocument();
    expect(emailLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
  });

  describe('Button Element', () => {
    it('Should be disabled', () => {
      customRender(<Register />);

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeDisabled();
    });

    it('Button should be enabled with input values', () => {
      customRender(<Register />);

      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'yorman');
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

      expect(buttonElement).toBeEnabled();
    });

    it('Should change label when clicked button', async () => {
      customRender(<Register />);
      jest.spyOn(UtilsService, 'avatarColor');
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');

      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'yorman');
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

      await act(() => {
        userEvent.click(buttonElement);
      });

      await waitFor(() => {
        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGN UP IN PROGRESS...');
      });
    });
  });

  describe('Errors', () => {
    it('Should display error alert and border for email is not valid', async () => {
      server.use(signUpMockErrorEmailNotValid);

      jest.spyOn(UtilsService, 'avatarColor');
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
      customRender(<Register />);
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const emailElement = screen.getByLabelText('Email');
      const passwordElement = screen.getByLabelText('Password');

      userEvent.type(usernameElement, 'gab');
      userEvent.type(emailElement, 'gab.com');
      userEvent.type(passwordElement, 'gab');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Email must be valid');
      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });

    describe('Success', () => {
      it('Should navigate to streams page', async () => {
        server.use(signUpMock);

        jest.spyOn(UtilsService, 'avatarColor');
        jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
        customRender(<Register />);
        const buttonElement = screen.getByRole('button');
        const usernameElement = screen.getByLabelText('Username');
        const emailElement = screen.getByLabelText('Email');
        const passwordElement = screen.getByLabelText('Password');

        userEvent.type(usernameElement, 'yorman');
        userEvent.type(emailElement, 'yor@gmail.com');
        userEvent.type(passwordElement, 'yordev');
        userEvent.click(buttonElement);

        await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/app/social/streams'));
      });
    });
  });
});
