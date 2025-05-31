import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import PostPage from './pages/PostPage';
import ProfilePage from './pages/ProfilePage';
import HobbyPage from './pages/HobbyPage';
import AppointmentPage from './pages/AppointmentPage';
import ChatPage from './pages/ChatPage';
//import TagSearchPage from './pages/TagSearchPage';
import { UserProvider } from './contexts/UserContext';

function App() {
  const [currentUser, setCurrentUser] = useState(null);

  return (
    <Router>
      <div>
        {!currentUser ? (
          <Routes>
            {/* ✅ 로그인 안 해도 접근 가능한 페이지들 */}
            <Route path="*" element={<LoginPage setCurrentUser={setCurrentUser} />} />
          </Routes>
        ) : (
          <UserProvider currentUser={currentUser}>
            <>
              <nav className="bg-white p-4 text-black flex justify-around shadow">
                <Link to="/home" className="hover:underline">Home</Link>
                <Link to="/profile" className="hover:underline"> Profile</Link>
                <Link to="/hobby" className="hover:underline"> Hobby</Link>
                <Link to="/appointment" className="hover:underline"> Appointment</Link>
                <Link to="/chat" className="hover:underline">Chatting</Link>
              </nav>

              <Routes>
                <Route path="/" element={<Navigate to="/home" />} />
                <Route path="/home" element={<PostPage currentUser={currentUser} />} />
                <Route path="/profile" element={<ProfilePage currentUser={currentUser} />} />
                <Route path="/hobby" element={<HobbyPage currentUser={currentUser} />} />
                <Route path="/appointment" element={<AppointmentPage />} />
                <Route path="/chat" element={<ChatPage />} />
                
              </Routes>
            </>
          </UserProvider>
        )}
      </div>
    </Router>
  );
}

export default App;