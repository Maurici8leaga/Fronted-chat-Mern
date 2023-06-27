import { customRender, screen, within, fireEvent } from '@root/test.utils';
import AuthTabs from '../AuthTabs';

describe('AuthTabs', () => {
  it('Sign In tab should be displayed', () => {
    customRender(<AuthTabs />);

    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');

    expect(items[0]).toHaveTextContent('Sign In');
    expect(items[0]).toHaveClass('active');
  });

  it('Sign up tab should be displayed', () => {
    customRender(<AuthTabs />);

    const listElement = screen.getByRole('list');
    const { getAllByRole } = within(listElement);
    const items = getAllByRole('listitem');
    fireEvent.click(items[1]);

    expect(items[1]).toHaveTextContent('Sign Up');
    expect(items[1]).toHaveClass('active');
  });
});
