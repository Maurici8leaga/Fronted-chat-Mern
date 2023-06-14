import { customRender, screen, within, fireEvent } from '@root/test.utils';
import AuthTabs from '../AuthTabs';

// "describe" es el titulo del test, de lo que vas a testear
describe('AuthTabs', () => {
  // UNITARY TEST 1
  it('Sign In tab should be displayed', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // GIVEN
    customRender(<AuthTabs />);
    // customRender permite renderizar el componente que voy a testear

    // WHEN
    const listElement = screen.getByRole('list');
    // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button
    const { getAllByRole } = within(listElement);
    // getAllByRole  es una propiedad del within que esta dentro, se tiene que usar primero within para poder acceder a ella con una destructuracion
    const items = getAllByRole('listitem');
    // getAllByRole permite obtener todos los elementos por su rol

    // THEN
    expect(items[0]).toHaveTextContent('Sign In');
    // expect: Es donde se define lo que esperas recibir del test
    expect(items[0]).toHaveClass('active');
    // toHaveClass permite revisar que estilo tiene cierto elemento dentro de un classname, se usa porque el estilo esta contenido en un class
  });

  // UNITARY TEST 2
  it('Sign up tab should be displayed', () => {
    // GIVEN
    customRender(<AuthTabs />);

    // WHEN
    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    fireEvent.click(items[1]);
    // fireEvent para interactuar con el DOM .. se usa para disparar un proceso que no sea asincrono

    // THEN
    expect(items[1]).toHaveTextContent('Sign Up');
    expect(items[1]).toHaveClass('active');
  });
});
