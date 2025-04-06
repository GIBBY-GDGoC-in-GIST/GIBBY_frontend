import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';

// Mock react-router-dom
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div>{children}</div>,
  Routes: ({ children }) => <div>{children}</div>,
  Route: ({ children }) => <div>{children}</div>,
  Navigate: () => <div>Navigate</div>,
  Link: ({ children }) => <div>{children}</div>,
  MemoryRouter: ({ children }) => <div>{children}</div>
}));

// Mock the pages components
jest.mock('./pages/LoginPage', () => () => <div>Login Page</div>);
jest.mock('./pages/PostPage', () => () => <div>Post Page</div>);
jest.mock('./pages/ProfilePage', () => () => <div>Profile Page</div>);
jest.mock('./pages/HobbyPage', () => () => <div>Hobby Page</div>);
jest.mock('./pages/AppointmentPage', () => () => <div>Appointment Page</div>);
jest.mock('./pages/ChatPage', () => () => <div>Chat Page</div>);

describe('App Component', () => {
  test('renders LoginPage when currentUser is null', () => {
    render(<App />);
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders navigation when simulating login', () => {
    const { container } = render(<App />);
    // Click on LoginPage to simulate login
    const loginPage = screen.getByText('Login Page');
    fireEvent.click(loginPage);
    
    // Check for navigation items
    expect(screen.getByText('🏠 홈')).toBeInTheDocument();
    expect(screen.getByText('👤 프로필')).toBeInTheDocument();
  });
});
