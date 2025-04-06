import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders LoginPage when currentUser is null', () => {
  render(<App />);
  const loginPageElement = screen.getByText(/login/i);
  expect(loginPageElement).toBeInTheDocument();
});

test('renders navigation bar when currentUser is not null', () => {
  const { container } = render(<App />);
  const setCurrentUser = container.querySelector('LoginPage').props.setCurrentUser;
  setCurrentUser({ id: 1, name: 'Test User' });
  const navElement = screen.getByText(/🏠 홈/i);
  expect(navElement).toBeInTheDocument();
});

test('redirects to /home when navigating to /', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  const homeLink = screen.getByText(/🏠 홈/i);
  expect(homeLink).toBeInTheDocument();
});
