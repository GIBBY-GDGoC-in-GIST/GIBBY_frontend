import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';

function HomePage() {
  return (
    <div>
      <h2>로그인</h2>
      <Login />
      <Link to="/profile">프로필로 가기</Link>
      <Link to="/hobbies">취미 목록 보기</Link>
    </div>
  );
}

export default HomePage;
