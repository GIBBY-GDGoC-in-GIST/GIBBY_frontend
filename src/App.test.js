import { render, screen, fireEvent } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

// Mock the pages components
jest.mock('./pages/LoginPage', () => () => <div>Login Page</div>);
jest.mock('./pages/PostPage', () => () => <div>Post Page</div>);
jest.mock('./pages/ProfilePage', () => () => <div>Profile Page</div>);
jest.mock('./pages/HobbyPage', () => () => <div>Hobby Page</div>);
jest.mock('./pages/AppointmentPage', () => () => <div>Appointment Page</div>);
jest.mock('./pages/ChatPage', () => () => <div>Chat Page</div>);

describe('App Component', () => {
  test('renders LoginPage when currentUser is null', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  test('renders navigation and home page when user is logged in', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Simulate login by finding and clicking login button
    const loginButton = screen.getByText('Login Page');
    fireEvent.click(loginButton);
    
    // Check if navigation links are present
    expect(screen.getByText('🏠 홈')).toBeInTheDocument();
    expect(screen.getByText('👤 프로필')).toBeInTheDocument();
    expect(screen.getByText('🎨 취미')).toBeInTheDocument();
    expect(screen.getByText('📅 약속')).toBeInTheDocument();
    expect(screen.getByText('💬 채팅')).toBeInTheDocument();
    
    // Check if home page is rendered by default
    expect(screen.getByText('Post Page')).toBeInTheDocument();
  });

  test('navigates to different pages when clicking navigation links', () => {
    render(
      <MemoryRouter>
        <App />
      </MemoryRouter>
    );
    
    // Simulate login
    const loginButton = screen.getByText('Login Page');
    fireEvent.click(loginButton);
    
    // Test navigation to different pages
    fireEvent.click(screen.getByText('👤 프로필'));
    expect(screen.getByText('Profile Page')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('🎨 취미'));
    expect(screen.getByText('Hobby Page')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('📅 약속'));
    expect(screen.getByText('Appointment Page')).toBeInTheDocument();
    
    fireEvent.click(screen.getByText('💬 채팅'));
    expect(screen.getByText('Chat Page')).toBeInTheDocument();
  });
});
