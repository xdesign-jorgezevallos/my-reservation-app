import { render, screen } from '../../../utils/test-utils';
// import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import { HomePage } from '../HomePage';

// const mockedUsedNavigate = jest.fn();

// jest.mock('react-router-dom', () => ({
//   ...jest.requireActual('react-router-dom'),
//   useNavigate: () => mockedUsedNavigate,
// }));

describe('HomePage', () => {
  //   it('should match homePage snapshot', () => {
  //     const homePage = renderer.create(<HomePage />).toJSON();
  //     expect(homePage).toMatchSnapshot();
  //   });

  it('should match homePage snapshot', () => {
    const wrapper = shallow(<HomePage />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });

  it('render HOME page', () => {
    render(<HomePage />);
    const homePageElement = screen.getByTestId('home-page');
    const titleElement = screen.getByTestId('title-page');

    expect(homePageElement).toBeInTheDocument();
    expect(titleElement).toBeInTheDocument();
    expect(titleElement).toHaveTextContent('Welcome Home');
    expect(homePageElement).toContainHTML('<p>This is home content</p>');
  });
});
