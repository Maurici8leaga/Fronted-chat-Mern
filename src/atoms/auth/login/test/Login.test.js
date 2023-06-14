import { signInMock, signInMockError } from '@mocks/handlers/auth';
import { server } from '@mocks/server';
import Login from '@atoms/auth/login/Login';
import { fireEvent, screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';

const mockedUseNavigate = jest.fn(); // para simular a useNavigate a la hora de redireccionar a otra pag
jest.mock('react-router-dom', () => ({
  // se usa jes.mock para emular el comportamiento del react-router-dom
  ...jest.requireActual('react-router-dom'), // con esto mantenemos el comportamientto y funcionalidades del react-router-dom
  useNavigate: () => mockedUseNavigate
  // y  de esta forma reemplazamos el nombre del hook "useNavigate" por el mockedUseNavigate a la hora de redireccionar a otra pag
}));

// "describe" es el titulo del test, de lo que vas a testear
describe('Sign In Page', () => {
  // UNITARY TEST 1
  it('Sign In form should have its labels', () => {
    // GIVEN
    customRender(<Login />);
    // customRender permite renderizar el componente que voy a testear

    // WHEN
    const usernameLabel = screen.getByLabelText('Username');
    // screen permite interactuar con el DOM
    // getByLabelText permite obtener valor de un elemento HTML mediante su label, en este caso el username
    const passwordLabel = screen.getByLabelText('Password');
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    // THEN
    expect(usernameLabel).toBeInTheDocument();
    // expect: Es donde se define lo que esperas recibir del test
    expect(passwordLabel).toBeInTheDocument();
    // toBeInTheDocument permite verificar si el elemento existe en el documento
    expect(checkBoxLabel).toBeInTheDocument();
  });

  // UNITARY TEST 2
  it('CheckBox should be unchecked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxLabel = screen.getByLabelText('Keep me signed in');

    // THEN
    expect(checkBoxLabel).not.toBeChecked();
    // toBeChecked permite verificar si el campo esta  marcado o no
  });

  // UNITARY TEST 3
  it('CheckBox should be checked when clicked', () => {
    // GIVEN
    customRender(<Login />);

    // WHEN
    const checkBoxElement = screen.getByLabelText('Keep me signed in');
    expect(checkBoxElement).not.toBeChecked();

    // THEN
    fireEvent.click(checkBoxElement);
    expect(checkBoxElement).toBeChecked();
  });

  describe('Button', () => {
    // UNITARY TEST 4
    it('Should be disabled', () => {
      // GIVEN
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button

      // THEN
      expect(buttonElement).toBeDisabled();
      // toBeDisabled permite verificar si un elemento esta deshabilitado
    });

    // UNITARY TEST 5
    it('Should be enabled with inputs', () => {
      // GIVEN
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      expect(buttonElement).toBeDisabled();
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      fireEvent.change(usernameElement, { target: { value: 'yorman' } });
      // fireEvent.change es otra forma de llenar los input
      fireEvent.change(passwordElement, { target: { value: 'yordev' } });

      // THEN
      expect(buttonElement).toBeEnabled();
      // toBeEnabled permite verificar si un elemento se encuentra activo o habilitado
    });

    // INTEGRATION TEST 1
    it('Should change label when clicked', async () => {
      // GIVEN
      server.use(signInMock);
      // server.use debe ir arrirba del render porque tiene que existir primero el servidor para poder acceder a los elementos del render
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      // con type hacemos la simulacion de llenar el input
      userEvent.type(passwordElement, 'yordev');

      // OJO PARA LOS PROCESOS ASINCRONOS QUE LLEVEN ACT DEBE IR EL AWAIT SI NO SE ROMPE EL CODIGO
      await act(() => {
        // act permite gestionar eventos asincronos de manera controlada
        userEvent.click(buttonElement);
        // como este un proceso que tiene que esperar a que se haga click, se ulta el metodo click y el await a esperar que sea ejecutado
      });

      // THEN
      await waitFor(() => {
        //  waitFor permite esperar los acontecimientos al interactuar con los elementos

        const newButtonElement = screen.getByRole('button');
        expect(newButtonElement.textContent).toEqual('SIGNIN IN PROGRESS...');
        // toEqual Verificar que el valor es igual al esperado
      });
    });
  });

  // INTEGRATION TEST 2
  describe('Error', () => {
    it('should display error alert and border', async () => {
      // GIVEN
      server.use(signInMockError);
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yor');
      userEvent.type(passwordElement, 'yorman');
      userEvent.click(buttonElement);

      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Invalid credentials');

      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });
  });

  // INTEGRATION TEST 3
  describe('Success', () => {
    it('should navigate to streams page', async () => {
      // GIVEN
      server.use(signInMock);
      customRender(<Login />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameElement = screen.getByLabelText('Username');
      const passwordElement = screen.getByLabelText('Password');
      userEvent.type(usernameElement, 'yorman');
      userEvent.type(passwordElement, 'yordev');
      userEvent.click(buttonElement);

      // THEN
      await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/app/social/streams'));
    });
  });
});
