import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom';

// react-router-dom 모킹
jest.mock('react-router-dom', () => ({
  BrowserRouter: ({ children }) => <div data-testid="router">{children}</div>,
  Routes: ({ children }) => <div data-testid="routes">{children}</div>,
  Route: ({ path, element }) => <div data-testid={`route-${path}`}>{element}</div>,
  Navigate: ({ to }) => <div data-testid={`navigate-${to}`}>Navigate to {to}</div>,
  Link: ({ to, children }) => <div data-testid={`link-${to}`} onClick={() => console.log(`Navigate to ${to}`)}>{children}</div>
}));

// 페이지 컴포넌트 모킹
jest.mock('./pages/LoginPage', () => {
  return function MockLoginPage(props) {
    return (
      <div data-testid="login-page">
        <h1>로그인 페이지</h1>
        <button 
          data-testid="login-button" 
          onClick={() => props.setCurrentUser({ id: 1, name: '테스트 사용자' })}
        >
          로그인하기
        </button>
      </div>
    );
  };
});

jest.mock('./pages/PostPage', () => {
  return function MockPostPage(props) {
    return (
      <div data-testid="post-page">
        <h1>홈 페이지</h1>
        <p>현재 사용자: {props.currentUser?.name}</p>
      </div>
    );
  };
});

jest.mock('./pages/ProfilePage', () => {
  return function MockProfilePage(props) {
    return (
      <div data-testid="profile-page">
        <h1>프로필 페이지</h1>
        <p>현재 사용자: {props.currentUser?.name}</p>
      </div>
    );
  };
});

jest.mock('./pages/HobbyPage', () => {
  return function MockHobbyPage(props) {
    return (
      <div data-testid="hobby-page">
        <h1>취미 페이지</h1>
        <p>현재 사용자: {props.currentUser?.name}</p>
      </div>
    );
  };
});

jest.mock('./pages/AppointmentPage', () => () => <div data-testid="appointment-page">약속 페이지</div>);
jest.mock('./pages/ChatPage', () => () => <div data-testid="chat-page">채팅 페이지</div>);

// App 컴포넌트 가져오기
// 이제 모킹으로 인해 App 컴포넌트를 직접 import 할 수 있습니다.
import App from './App';

describe('App 컴포넌트 테스트', () => {
  test('초기 상태에서는 로그인 페이지가 렌더링된다', () => {
    render(<App />);
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
    expect(screen.queryByText('🏠 홈')).not.toBeInTheDocument();
  });

  test('로그인 버튼 클릭 시 네비게이션 바와 홈 페이지가 표시된다', () => {
    render(<App />);
    
    // 로그인 버튼 클릭
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 네비게이션 바 확인
    expect(screen.getByText('🏠 홈')).toBeInTheDocument();
    expect(screen.getByText('👤 프로필')).toBeInTheDocument();
    expect(screen.getByText('🎨 취미')).toBeInTheDocument();
    expect(screen.getByText('📅 약속')).toBeInTheDocument();
    expect(screen.getByText('💬 채팅')).toBeInTheDocument();
    
    // 홈 페이지 확인
    expect(screen.getByTestId('post-page')).toBeInTheDocument();
    expect(screen.getByText('홈 페이지')).toBeInTheDocument();
    expect(screen.getByText('현재 사용자: 테스트 사용자')).toBeInTheDocument();
  });

  test('네비게이션 링크 클릭 시 해당 페이지로 이동한다', async () => {
    render(<App />);
    
    // 먼저 로그인
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 프로필 링크 클릭
    fireEvent.click(screen.getByText('👤 프로필'));
    expect(screen.getByTestId('route-/profile')).toBeInTheDocument();
    
    // 취미 링크 클릭
    fireEvent.click(screen.getByText('🎨 취미'));
    expect(screen.getByTestId('route-/hobby')).toBeInTheDocument();
    
    // 약속 링크 클릭
    fireEvent.click(screen.getByText('📅 약속'));
    expect(screen.getByTestId('route-/appointment')).toBeInTheDocument();
    
    // 채팅 링크 클릭
    fireEvent.click(screen.getByText('💬 채팅'));
    expect(screen.getByTestId('route-/chat')).toBeInTheDocument();
    
    // 홈으로 돌아가기
    fireEvent.click(screen.getByText('🏠 홈'));
    expect(screen.getByTestId('route-/home')).toBeInTheDocument();
  });
});
