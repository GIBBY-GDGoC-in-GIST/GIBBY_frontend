import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from './App';
import React from 'react';

// LoginPage 컴포넌트를 수동으로 모킹하여 setCurrentUser 함수를 접근할 수 있게 함
jest.mock('./pages/LoginPage', () => {
  return function MockedLoginPage(props) {
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

describe('App 컴포넌트', () => {
  test('초기 상태에서 LoginPage 컴포넌트가 렌더링된다', () => {
    render(<App />);
    
    // 로그인 페이지가 렌더링되었는지 확인
    expect(screen.getByTestId('login-page')).toBeInTheDocument();
    expect(screen.getByText('로그인 페이지')).toBeInTheDocument();
    
    // 네비게이션 바는 보이지 않아야 함
    expect(screen.queryByText('🏠 홈')).not.toBeInTheDocument();
  });

  test('로그인 버튼 클릭 시 네비게이션 바가 표시된다', () => {
    render(<App />);
    
    // 로그인 버튼 클릭
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 네비게이션 바가 보여야 함
    expect(screen.getByText('🏠 홈')).toBeInTheDocument();
    expect(screen.getByText('👤 프로필')).toBeInTheDocument();
    expect(screen.getByText('🎨 취미')).toBeInTheDocument();
    expect(screen.getByText('📅 약속')).toBeInTheDocument();
    expect(screen.getByText('💬 채팅')).toBeInTheDocument();
  });

  test('로그인 후 메뉴 클릭 시 해당 페이지가 렌더링된다', async () => {
    render(<App />);
    
    // 로그인
    fireEvent.click(screen.getByTestId('login-button'));
    
    // 기본적으로 홈 페이지가 렌더링되어야 함
    expect(screen.getByText('Post Page')).toBeInTheDocument();
    
    // 프로필 메뉴 클릭
    fireEvent.click(screen.getByText('👤 프로필'));
    
    // 프로필 페이지가 렌더링되어야 함
    await waitFor(() => {
      expect(screen.getByText('Profile Page')).toBeInTheDocument();
    });
    
    // 취미 메뉴 클릭
    fireEvent.click(screen.getByText('🎨 취미'));
    
    // 취미 페이지가 렌더링되어야 함
    await waitFor(() => {
      expect(screen.getByText('Hobby Page')).toBeInTheDocument();
    });
  });
});
