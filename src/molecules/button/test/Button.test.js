import { customRender, screen } from '@root/test.utils';
import userEvent from '@testing-library/user-event';
import Button from '@molecules/button/Button';

describe('Button Component', () => {
  it('Should be disabled', () => {
    customRender(<Button label="Send" disabled={true} className="button" />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeDisabled();
  });

  it('Should be enabled', () => {
    customRender(<Button label="Send" disabled={false} className="button" />);

    const buttonElement = screen.getByRole('button');

    expect(buttonElement).toBeEnabled();
  });

  it('Should have label', () => {
    customRender(<Button label="Send" className="button" />);

    const buttonText = screen.getByText(/send/i);

    expect(buttonText).toBeInTheDocument();
  });

  it('Should handle click event', () => {
    const onClick = jest.fn();
    customRender(<Button label="Send" className="button" disabled={false} handleClick={onClick} />);

    const buttonElement = screen.getByRole('button');
    userEvent.click(buttonElement);

    expect(onClick).toHaveBeenCalledTimes(1);
  });
});
