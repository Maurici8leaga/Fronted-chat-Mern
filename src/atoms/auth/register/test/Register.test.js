import { screen, customRender, waitFor } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import { act } from 'react-dom/test-utils';
// import Register from '../Register';
import Register from '@atoms/auth/register/Register';
import { server } from '@mocks/server';
import { UtilsService } from '@services/utils/utils.service';
import { signUpMock, signUpMockErrorEmailNotValid } from '@mocks/handlers/auth';

const mockedUseNavigate = jest.fn(); // para simular a useNavigate a la hora de redireccionar a otra pag
jest.mock('react-router-dom', () => ({
  // se usa jes.mock para emular el comportamiento del react-router-dom
  ...jest.requireActual('react-router-dom'), // con esto mantenemos el comportamientto y funcionalidades del react-router-dom
  useNavigate: () => mockedUseNavigate
  // y  de esta forma reemplazamos el nombre del hook "useNavigate" por el mockedUseNavigate a la hora de redireccionar a otra pag
}));

// "describe" es el titulo del test, de lo que vas a testear
describe('Register Page', () => {
  // UNITARY TEST 1
  it('Signup form should have its labels', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // GIVEN
    customRender(<Register />);
    // customRender permite renderizar el componente que voy a testear

    // WHEN
    const usernameLabel = screen.getByLabelText('Username');
    // screen permite interactuar con el DOM
    // getByLabelText permite obtener valor de un elemento HTML mediante su label, en este caso el username
    const emailLabel = screen.getByLabelText('Email');
    const passwordLabel = screen.getByLabelText('Password');

    // THEN
    expect(usernameLabel).toBeInTheDocument();
    // expect: Es donde se define lo que esperas recibir del test
    expect(emailLabel).toBeInTheDocument();
    // toBeInTheDocument permite verificar si el elemento existe en el documento
    expect(passwordLabel).toBeInTheDocument();
  });

  // DATO OJO se puede tener varios describe que se quieran
  describe('Button Element', () => {
    // UNITARY TEST 2
    it('Should be disabled', () => {
      // GIVEN
      customRender(<Register />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button

      // THEN
      expect(buttonElement).toBeDisabled();
      // toBeDisabled permite verificar si un elemento esta deshabilitado
    });

    it('Button should be enabled with input values', () => {
      // UNITARY TEST 3
      // GIVEN
      customRender(<Register />);

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      // llenar el formulario
      userEvent.type(usernameLabel, 'yorman');
      // con type hacemos la simulacion de llenar el input
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

      // THEN
      expect(buttonElement).toBeEnabled();
      // toBeEnabled permite verificar si un elemento se encuentra activo o habilitado
    });

    it('Should change label when clicked button', async () => {
      // INTEGRATION TEST 4
      // GIVEN
      customRender(<Register />);
      jest.spyOn(UtilsService, 'avatarColor');
      // spyOn  Permite realizar pruebas de integracion mediante observadores de procesos, esto se hace mediante inspectores espias, que luego pueden ser escuchados por otros espias.
      jest.spyOn(UtilsService, 'generateAvatar').mockReturnValue('yorman image');
      //  mockReturnValue retorna un mock function mediante un valor como parametro

      // WHEN
      const buttonElement = screen.getByRole('button');
      const usernameLabel = screen.getByLabelText('Username');
      const emailLabel = screen.getByLabelText('Email');
      const passwordLabel = screen.getByLabelText('Password');

      userEvent.type(usernameLabel, 'yorman');
      userEvent.type(emailLabel, 'yordev@gmail.com');
      userEvent.type(passwordLabel, 'yordev');

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
        expect(newButtonElement.textContent).toEqual('SIGN UP IN PROGRESS...');
        // textContent es para el contexto que tendra el elemento
        // toEqual Verificar que el valor es igual al esperado
      });
    });
  });

  describe('Errors', () => {
    // INTEGRATION TEST 2
    it('Should display error alert and border for email is not valid', async () => {
      // GIVEN
      server.use(signUpMockErrorEmailNotValid);
      // server.use  es para simular el server de node y. asi poder probar el request del endpoint

      // WHEN
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
      userEvent.click(buttonElement); // se debe llamar al final de estos porque si no da error, se llena el formulario y ultimo se da click

      const alert = await screen.findByRole('alert');

      // THEN
      expect(alert).toBeInTheDocument();
      expect(alert.textContent).toEqual('Email must be valid');
      await waitFor(() => expect(usernameElement).toHaveStyle({ border: '2px inset' }));
      // toHaveStyle permite revisar que estilo tiene cierto elemento
      await waitFor(() => expect(emailElement).toHaveStyle({ border: '2px inset' }));
      await waitFor(() => expect(passwordElement).toHaveStyle({ border: '2px inset' }));
    });

    describe('Success', () => {
      // INTEGRATION TEST 2
      it('Should navigate to streams page', async () => {
        // GIVEN
        server.use(signUpMock);

        // WHEN
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

        // THEN
        await waitFor(() => expect(mockedUseNavigate).toHaveBeenCalledWith('/app/social/streams'));
        // aqui se usa el navigate ya que una vez el usuario corectamente registrado lo redireccion a la siguiente pag
      });
    });
  });
});
