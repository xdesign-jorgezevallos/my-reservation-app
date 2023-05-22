import { render, screen } from '../../../utils/test-utils';
import NavBarMenu from './NavBarMenu';

jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => jest.fn(),
}));

test('render NAVBAR menu', () => {
  render(<NavBarMenu />);
  const linkElement = screen.getByTestId('navbar-menu');
  expect(linkElement).toBeInTheDocument();
});
