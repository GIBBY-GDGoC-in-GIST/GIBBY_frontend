import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import ProfilePage from './ProfilePage';

// 필요한 props 모킹
const mockCurrentUser = {
  id: 1,
  name: '테스트 사용자',
  email: 'test@example.com',
  profileImage: 'https://via.placeholder.com/150',
  hobbies: ['독서', '여행', '요리']
};

// 필요한 함수 모킹
const mockUpdateProfile = jest.fn();
const mockLogout = jest.fn();

// ProfilePage 컴포넌트에서 사용할 수 있는 모든 함수나 객체를 모킹
jest.mock('react-router-dom', () => ({
  useNavigate: () => jest.fn()
}), { virtual: true });

describe('ProfilePage 컴포넌트 테스트', () => {
  beforeEach(() => {
    // 각 테스트 전에 모의 함수 초기화
    mockUpdateProfile.mockClear();
    mockLogout.mockClear();
  });

  test('사용자 정보가 올바르게 표시된다', () => {
    render(
      <ProfilePage 
        currentUser={mockCurrentUser}
        updateProfile={mockUpdateProfile}
        logout={mockLogout}
      />
    );
    
    // 사용자 이름 확인
    expect(screen.getByText(mockCurrentUser.name)).toBeInTheDocument();
    // 사용자 이메일 확인
    expect(screen.getByText(mockCurrentUser.email)).toBeInTheDocument();
  });
  
  test('취미 목록이 올바르게 표시된다', () => {
    render(
      <ProfilePage 
        currentUser={mockCurrentUser}
        updateProfile={mockUpdateProfile}
        logout={mockLogout}
      />
    );
    
    // 취미 목록 확인
    mockCurrentUser.hobbies.forEach(hobby => {
      expect(screen.getByText(hobby)).toBeInTheDocument();
    });
  });
  
  test('프로필 수정 버튼 클릭 시 updateProfile 함수가 호출된다', () => {
    render(
      <ProfilePage 
        currentUser={mockCurrentUser}
        updateProfile={mockUpdateProfile}
        logout={mockLogout}
      />
    );
    
    // 편집 버튼 찾기
    const editButton = screen.getByText('프로필 수정');
    // 버튼 클릭
    fireEvent.click(editButton);
    // updateProfile 함수가 호출되었는지 확인
    expect(mockUpdateProfile).toHaveBeenCalledTimes(1);
  });
  
  test('로그아웃 버튼 클릭 시 logout 함수가 호출된다', () => {
    render(
      <ProfilePage 
        currentUser={mockCurrentUser}
        updateProfile={mockUpdateProfile}
        logout={mockLogout}
      />
    );
    
    // 로그아웃 버튼 찾기
    const logoutButton = screen.getByText('로그아웃');
    // 버튼 클릭
    fireEvent.click(logoutButton);
    // logout 함수가 호출되었는지 확인
    expect(mockLogout).toHaveBeenCalledTimes(1);
  });
}); 