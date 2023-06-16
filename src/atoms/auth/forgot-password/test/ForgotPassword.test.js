import { customRender, screen, waitFor } from '@root/test.utils';
import ForgotPassword from '@atoms/auth/forgot-password/ForgotPassword';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import { forgotPasswordMock, forgotPasswordMockError } from '@mocks/handlers/auth';

// "describe" es el titulo del test, de lo que vas a testear
describe('Forgot Password Page', () => {
  // UNITARY TEST 1
  it('Form should have email label', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // GIVEN
    customRender(<ForgotPassword />);
    // customRender permite renderizar el componente que voy a testear

    // WHEN
    const emailLabel = screen.getByLabelText('Email');
    // getByLabelText permite obtener valor de un elemento HTML mediante su label, en este caso el username

    // THEN
    expect(emailLabel).toBeInTheDocument();
    // expect: Es donde se define lo que esperas recibir del test
    // toBeInTheDocument permite verificar si el elemento existe en el documento
  });

  // UNITARY TEST 2
  it('Should have "Back to Login" text', () => {
    // GIVEN
    customRender(<ForgotPassword />);

    // WHEN
    const spanElement = screen.getByText('Back to Login');
    // getByText permitte obtener un elemento por su texto

    // THEN
    expect(spanElement).toBeInTheDocument();
  });

  // UNITARY TEST 3
  describe('Button', () => {
    // GIVEN
    it('Button should be disabled', () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button

      // THEN
      expect(buttonElement).toBeInTheDocument();
    });

    // UNITARY TEST 4
    it('Should be enabled with input', () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      // toBeDisabled permite verificar si un elemento esta deshabilitado
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');
      // con type hacemos la simulacion de llenar el input

      // THEN
      expect(buttonElement).toBeEnabled();
    });

    // UNITARY TEST 5
    it('Should change label when clicked', async () => {
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'yorman@test.com');
      userEvent.click(buttonElement); // se debe llamar al final de estos porque si no da error, se llena el formulario y ultimo se da click

      // THEN
      const newButtonElement = screen.getByRole('button');
      expect(newButtonElement.textContent).toEqual('FORGOT PASSWORD IN PROGRESS...');

      await waitFor(() => {
        //  waitFor permite esperar los acontecimientos al interactuar con los elementos
        const newButtonElement1 = screen.getByRole('button');
        expect(newButtonElement1.textContent).toEqual('FORGOT PASSWORD');
        // toEqual Verificar que el valor es igual al esperado
      });
    });
  });

  describe('Errors', () => {
    // INTEGRATION TEST 1
    it('Should display error alert and border of invalid email', async () => {
      // GIVEN
      server.use(forgotPasswordMockError);
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      // toHaveStyle permite revisar que estilo tiene cierto elemento
      expect(alert).toHaveClass('alert-error');
      // toHaveClass permite revisar que estilo tiene cierto elemento dentro de un classname, se usa porque el estilo esta contenido en un class
      expect(alert.textContent).toEqual('Email must be valid');
    });
  });

  describe('Success', () => {
    // INTEGRATION TEST 1
    it('Should display sucess alert', async () => {
      // GIVEN
      server.use(forgotPasswordMock);
      customRender(<ForgotPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const emailElement = screen.getByLabelText('Email');
      userEvent.type(emailElement, 'tellito@gmail.com');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password reset email sent.');
    });
  });
});
