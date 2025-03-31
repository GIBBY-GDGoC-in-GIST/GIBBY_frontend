import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import HobbyPage from './pages/HobbyPage';
import AppointmentPage from './pages/AppointmentPage';
import ChatPage from './pages/ChatPage';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div>
        {!currentUser ? (
          <LoginPage setCurrentUser={setCurrentUser} />
        ) : (
          <>
            {/* 🏠 네비게이션 바 추가 */}
            <nav className="bg-blue-500 p-4 text-white flex justify-around">
              <Link to="/home" className="hover:underline">🏠 홈</Link>
              <Link to="/profile" className="hover:underline">👤 프로필</Link>
              <Link to="/hobby" className="hover:underline">🎨 취미</Link>
              <Link to="/appointment" className="hover:underline">📅 약속</Link>
              <Link to="/chat" className="hover:underline">💬 채팅</Link>
            </nav>

            <Routes>
              {/* 로그인 후 홈 페이지로 이동 */}
              <Route path="/" element={<Navigate to="/home" />} />
              <Route path="/home" element={<PostPage currentUser={currentUser} />} />
              <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
              <Route path="/hobby" element={<HobbyPage currentUser={currentUser} />} />
              <Route path="/appointment" element={<AppointmentPage />} />
              <Route path="/chat" element={<ChatPage />} />
            </Routes>
          </>
        )}
      </div>
    </Router>
  );
}

export default App;
