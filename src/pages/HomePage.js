import React from 'react';
import { Link } from 'react-router-dom';
import Login from '../components/Login';
import { useUser } from '../contexts/UserContext'; // 전역 닉네임 가져오는 훅

function HomePage() {
  const { nickname } = useUser(); // 👈 닉네임 불러오기

  return (
    <div>
      <h2>Login</h2>
      <Login />
      {/* 👇 닉네임이 있을 때만 환영 인사 표시 */}
      {nickname && (
        <p className="mt-4 text-lg text-gray-700">
          Welcome, <strong>{nickname}</strong>!
        </p>
      )}
      <Link to="/profile">Go to profile</Link>
      <Link to="/hobbies">Show Hobby list</Link>
    </div>
    
  );
}

export default HomePage;