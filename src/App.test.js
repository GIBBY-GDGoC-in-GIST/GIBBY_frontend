import { render, screen } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('renders LoginPage when currentUser is null', () => {
  render(<App />);
  const loginPageElement = screen.getByText(/login/i); // Assuming LoginPage contains "login" text
  expect(loginPageElement).toBeInTheDocument();
});

test('renders navigation bar when currentUser is not null', () => {
  render(
    <MemoryRouter>
      <App />
    </MemoryRouter>
  );
  
  // LoginPage에서 setCurrentUser를 호출하는 방법을 구현해야 합니다
  // 예: LoginPage 컴포넌트에 테스트용 버튼 추가 또는 mock 함수 사용
});

test('redirects to /home when navigating to /', () => {
  render(
    <MemoryRouter initialEntries={['/']}>
      <App />
    </MemoryRouter>
  );
  
  // 리다이렉션을 확인하는 방법을 구현해야 합니다
  // 예: useLocation 훅을 사용하여 현재 경로 확인
});
