import { customRender, screen, waitFor } from '@root/test.utils';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import { forgotPasswordMock, forgotPasswordMockError } from '@mocks/handlers/auth';

describe('Forgot Password Page', () => {
  it('Form should have email label', () => {
    customRender(<ForgotPassword />);

    const emailLabel = screen.getByLabelText('Email');

    expect(emailLabel).toBeInTheDocument();
  });

  it('Should have "Back to Login" text', () => {
    customRender(<ForgotPassword />);

    const spanElement = screen.getByText('Back to Login');

    expect(spanElement).toBeInTheDocument();
  });

  describe('Button', () => {
    it('Button should be disabled', () => {
      customRender(<ForgotPassword />);

      const buttonElement = screen.getByRole('button');

      expect(buttonElement).toBeInTheDocument();
    });

    it('Should be enabled with input', () => {
      customRender(<ForgotPassword />);

      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');

      expect(buttonElement).toBeEnabled();
    });

    it('Should change label when clicked', async () => {
      customRender(<ForgotPassword />);

      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');
      userEvent.click(buttonElement);

      const newButtonElement = screen.getByRole('button');
      expect(newButtonElement.textContent).toEqual('FORGOT PASSWORD IN PROGRESS...');

      await waitFor(() => {
        const newButtonElement1 = screen.getByRole('button');
        expect(newButtonElement1.textContent).toEqual('FORGOT PASSWORD');
      });
    });
  });

  describe('Errors', () => {
    it('Should display error alert and border of invalid email', async () => {
      server.use(forgotPasswordMockError);
      customRender(<ForgotPassword />);

      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Email must be valid');
    });
  });

  describe('Success', () => {
    it('Should display sucess alert', async () => {
      server.use(forgotPasswordMock);
      customRender(<ForgotPassword />);

      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito@gmail.com');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password reset email sent.');
    });
  });
});
