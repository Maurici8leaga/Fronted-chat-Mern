import { customRender, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import ResetPassword from '../ResetPassword';
import { resetPasswordMock, resetPasswordMockError } from '@mocks/handlers/auth';
import { createBrowserHistory } from 'history';
import { createSearchParams } from 'react-router-dom';

describe('Reset Password Page', () => {
  beforeEach(() => {
    const url = `/reset-password?${createSearchParams({
      token: '1234567890'
    })}`;
    const history = createBrowserHistory();
    history.push(url);
  });

  it('Should have password inputs', () => {
    customRender(<ResetPassword />);
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

    expect(newPasswordLabel).toBeInTheDocument();
    expect(confirmPasswordLabel).toBeInTheDocument();
  });

  it('Button should be disabled', () => {
    customRender(<ResetPassword />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();
  });

  it('Should have "Back to Login" text', () => {
    customRender(<ResetPassword />);

    const spanElement = screen.getByText('Back to Login');

    expect(spanElement).toBeInTheDocument();
  });

  it('Button should be enabled with inputs', () => {
    customRender(<ResetPassword />);

    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');

    expect(buttonElement).toBeEnabled();
  });

  it('Button should change label when clicked', async () => {
    server.use(resetPasswordMock);
    customRender(<ResetPassword />);

    const buttonElement = screen.getByRole('button');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');
    userEvent.click(buttonElement);
    const newButtonElement = screen.getByRole('button');

    expect(newButtonElement.textContent).toEqual('RESET PASSWORD IN PROGRESS...');

    await waitFor(() => {
      const newButtonElement1 = screen.getByRole('button');
      expect(newButtonElement1.textContent).toEqual('RESET PASSWORD');
    });
  });

  describe('Errors', () => {
    it('Should display error alert and border for passwords dont match', async () => {
      server.use(resetPasswordMockError);
      customRender(<ResetPassword />);

      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(confirmPasswordLabel).toHaveStyle({ border: '2px inset' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Passwords do not match');
    });
  });

  describe('Sucess', () => {
    it('Should display sucess alert for resetPassword updated', async () => {
      server.use(resetPasswordMock);
      customRender(<ResetPassword />);

      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'yordev');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password successfully updated.');
    });
  });
});
