// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Mock react-router-dom globally
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => children,
  Routes: ({ children }) => children,
  Route: ({ children, element }) => element || children,
  Navigate: () => 'Navigate',
  Link: ({ children }) => children,
  useNavigate: () => jest.fn()
}));

// Mock all page components globally
jest.mock('./pages/LoginPage', () => () => 'Login Page');
jest.mock('./pages/PostPage', () => () => 'Post Page');
jest.mock('./pages/ProfilePage', () => () => 'Profile Page');
jest.mock('./pages/HobbyPage', () => () => 'Hobby Page');
jest.mock('./pages/AppointmentPage', () => () => 'Appointment Page');
jest.mock('./pages/ChatPage', () => () => 'Chat Page');
