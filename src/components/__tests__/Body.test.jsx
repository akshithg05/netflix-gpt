import { render, screen } from '@testing-library/react';
import Body from '../Body';

jest.mock('../Login', () => () => <div>Login Page</div>);
jest.mock('../BrowsePage', () => () => <div>Browse Page</div>);
jest.mock('../ErrorPage', () => () => <div>Error Page</div>);

describe('Body', () => {
  it('renders Login page by default', () => {
    window.history.pushState({}, '', '/');
    render(<Body />);
    expect(screen.getByText(/login page/i)).toBeInTheDocument();
  });

  it('renders Browse page for /browse route', () => {
    window.history.pushState({}, '', '/browse');
    render(<Body />);
    expect(screen.getByText(/browse page/i)).toBeInTheDocument();
  });

  it('renders Error page for /error route', () => {
    window.history.pushState({}, '', '/error');
    render(<Body />);
    expect(screen.getByText(/error page/i)).toBeInTheDocument();
  });

  it('renders Error page for unknown route', () => {
    window.history.pushState({}, '', '/unknown');
    render(<Body />);
    expect(screen.getByText(/error page/i)).toBeInTheDocument();
  });
});
