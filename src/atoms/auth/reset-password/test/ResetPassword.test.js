import { customRender, screen, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { server } from '@mocks/server';
import ResetPassword from '../ResetPassword';
import { resetPasswordMock, resetPasswordMockError } from '@mocks/handlers/auth';
import { createBrowserHistory } from 'history'; // este se puede usar con la version de react-router-dom 6.3.0 OJO
import { createSearchParams } from 'react-router-dom';

// "describe" es el titulo del test, de lo que vas a testear
describe('Reset Password Page', () => {
  beforeEach(() => {
    // beforeAll es para verificar que el servidor este activo, de no ser asi lo activa

    // lo que esta dentro del before each es para disponibilizar la ruta para el test que lo vaya a necesitar... se tiene que hacer para poder acceder al token de la ruta
    const url = `/reset-password?${createSearchParams({
      token: '1234567890'
      // el token tiene que ser el mismo que se coloco dentro del endpoint del auth.js
    })}`;
    const history = createBrowserHistory();
    history.push(url); // dispinibilizara la ruta  para el test que lo vaya a necesitar
  });

  // UNITARY TEST 1
  it('Should have password inputs', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // GIVEN
    customRender(<ResetPassword />);
    // customRender permite renderizar el componente que voy a testear

    // WHEN
    const newPasswordLabel = screen.getByLabelText('New Password');
    // getByLabelText permite obtener valor de un elemento HTML mediante su label, en este caso el username
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');

    // THEN
    expect(newPasswordLabel).toBeInTheDocument();
    // expect: Es donde se define lo que esperas recibir del test
    expect(confirmPasswordLabel).toBeInTheDocument();
    // toBeInTheDocument permite verificar si el elemento existe en el documento
  });

  // UNITARY TEST 2
  it('Button should be disabled', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button

    // THEN
    expect(buttonElement).toBeDisabled();
    // toBeDisabled permite verificar si un elemento esta deshabilitado
  });

  // UNITARY TEST 3
  it('Should have "Back to Login" text', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const spanElement = screen.getByText('Back to Login');
    // getByText permitte obtener un elemento por su texto

    // THEN
    expect(spanElement).toBeInTheDocument();
  });

  // UNITARY TEST 4
  it('Button should be enabled with inputs', () => {
    // GIVEN
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    expect(buttonElement).toBeDisabled();
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');
    // con type hacemos la simulacion de llenar el input

    // THEN
    expect(buttonElement).toBeEnabled();
    // toBeEnabled permite verificar si un elemento se encuentra activo o habilitado
  });

  // INTEGRATION TEST 1
  it('Button should change label when clicked', async () => {
    // GIVEN
    server.use(resetPasswordMock);
    customRender(<ResetPassword />);

    // WHEN
    const buttonElement = screen.getByRole('button');
    const newPasswordLabel = screen.getByLabelText('New Password');
    const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
    userEvent.type(newPasswordLabel, 'yordev');
    userEvent.type(confirmPasswordLabel, 'yordev');
    userEvent.click(buttonElement); // se debe llamar al final de estos porque si no da error, se llena el formulario y ultimo se da click
    const newButtonElement = screen.getByRole('button');

    // THEN
    expect(newButtonElement.textContent).toEqual('RESET PASSWORD IN PROGRESS...');
    // toEqual Verificar que el valor es igual al esperado

    await waitFor(() => {
      //  waitFor permite esperar los acontecimientos al interactuar con los elementos
      const newButtonElement1 = screen.getByRole('button');
      expect(newButtonElement1.textContent).toEqual('RESET PASSWORD');
    });
  });

  // INTEGRATION TEST 2
  describe('Errors', () => {
    // GIVEN
    it('Should display error alert and border for passwords dont match', async () => {
      // GIVEN
      server.use(resetPasswordMockError);
      customRender(<ResetPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'tellito');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      await waitFor(() => expect(newPasswordLabel).toHaveStyle({ border: '2px inset' }));
      // toHaveStyle permite revisar que estilo tiene cierto elemento
      await waitFor(() => expect(confirmPasswordLabel).toHaveStyle({ border: '2px inset' }));
      expect(alert).toHaveClass('alert-error');
      expect(alert.textContent).toEqual('Passwords do not match');
    });
  });

  // INTEGRATION TEST 3
  describe('Sucess', () => {
    // GIVEN
    it('Should display sucess alert for resetPassword updated', async () => {
      // GIVEN
      server.use(resetPasswordMock);
      customRender(<ResetPassword />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const newPasswordLabel = screen.getByLabelText('New Password');
      const confirmPasswordLabel = screen.getByLabelText('Confirm Password');
      userEvent.type(newPasswordLabel, 'yordev');
      userEvent.type(confirmPasswordLabel, 'yordev');
      userEvent.click(buttonElement);
      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert).toHaveClass('alert-success');
      expect(alert.textContent).toEqual('Password successfully updated.');
    });
  });
});
