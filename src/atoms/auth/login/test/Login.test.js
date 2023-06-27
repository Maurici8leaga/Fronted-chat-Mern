import { signInMock, signInMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import Login from '@atoms/auth/login/Login';
import { fireEvent, screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockedUseNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUseNavigate
}));

describe('Sign In Page', () => {
  it('Sign In form should have its labels', () => {
    customRender(<Login />);

    const usernameLabel = screen.getByLabelText('Username');
    const passwordLabel = screen.getByLabelText('Password');
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    expect(usernameLabel).toBeInTheDocument();
    expect(passwordLabel).toBeInTheDocument();
    expect(checkBoxLabel).toBeInTheDocument();
  });

  it('CheckBox should be unchecked', () => {
    customRender(<Login />);

    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    expect(checkBoxLabel).not.toBeChecked();
  });

  it('CheckBox should be checked when clicked', () => {
    customRender(<Login />);

    const checkBoxElement = screen.getByLabelText('Keep me signed in');
    expect(checkBoxElement).not.toBeChecked();

    fireEvent.click(checkBoxElement);
    expect(checkBoxElement).toBeChecked();
  });

  describe('Button', () => {
    it('Should be disabled', () => {
      customRender(<Login />);

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeDisabled();
    });

    it('Should be enabled with inputs', () => {
      customRender(<Login />);

      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      fireEvent.change(usernameElement, { target: { value: 'yorman' } });
      fireEvent.change(passwordElement, { target: { value: 'yordev' } });

      expect(buttonElement).toBeEnabled();
    });

    it('Should change label when clicked', async () => {
      server.use(signInMock);
      customRender(<Login />);

      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');

      await act(() => {
        userEvent.click(buttonElement);
      });

      await waitFor(() => {
        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGNIN IN PROGRESS...');
      });
    });
  });

  describe('Error', () => {
    it('should display error alert and border', async () => {
      server.use(signInMockError);
      customRender(<Login />);

      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yor');
      userEvent.type(passwordElement, 'yorman');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Invalid credentials');

      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });
  });

  describe('Success', () => {
    it('should navigate to streams page', async () => {
      server.use(signInMock);
      customRender(<Login />);

      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');
      userEvent.click(buttonElement);

      await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/app/social/streams'));
    });
  });
});
