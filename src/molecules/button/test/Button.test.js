import { customRender, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import Button from '@molecules/button/Button';

// "describe" es el titulo del test, de lo que vas a testear
describe('Button Component', () => {
  // UNITARY TEST 1
  it('Should be disabled', () => {
    // IT: describes que es lo que se va a testear y como se va a hacer

    // GIVEN
    customRender(<Button label="Send" disabled={true} className="button" />);
    // el component button recibe 3 props  OJO, label classname y disabled

    // WHEN
    const buttonElement = screen.getByRole('button');
    // getByRole permite obtener un elemento por su tipo, en  este caso como es el unico boton se coloca button

    // THEN
    expect(buttonElement).toBeDisabled();
    // toBeDisabled permite verificar si un elemento esta deshabilitado
  });

  // UNITARY TEST 2
  it('Should be enabled', () => {
    // GIVEN
    customRender(<Button label="Send" disabled={false} className="button" />);

    // WHEN
    const buttonElement = screen.getByRole('button');

    // THEN
    expect(buttonElement).toBeEnabled();
    // toBeEnabled permite verificar si un elemento se encuentra activo o habilitado
  });

  // UNITARY TEST 3
  it('Should have label', () => {
    // GIVEN
    customRender(<Button label="Send" className="button" />);

    // WHEN
    const buttonText = screen.getByText(/send/i);
    // /send/i es una expresion regular para que no sea case sensitive y asi solo se interesa que se pase el valor

    // THEN
    expect(buttonText).toBeInTheDocument();
    // toBeInTheDocument permite verificar si el elemento existe en el documento
  });

  // UNITARY TEST 4
  it('Should handle click event', () => {
    // GIVEN
    const onClick = jest.fn(); // para simular el metodo onClick
    customRender(<Button label="Send" className="button" disabled={false} handleClick={onClick} />); // este tiene un prop adicional que es el evento onClick

    // WHEN
    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    // THEN
    expect(onClick).toHaveBeenCalledTimes(1);
    // toHaveBeenCalledTimes este delimita y verifica la cantidad de ejecuciones para resolver un test
  });
});
