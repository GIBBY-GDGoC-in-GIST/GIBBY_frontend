import React, { useState } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState(""); // 오류 메시지 상태
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentUser({ email });
      navigate('/home');
    } catch (error) {
      setErrorMessage("로그인 실패: " + error.message);  // 오류 메시지 표시
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setCurrentUser({ email });
      navigate('/home');
    } catch (error) {
      setErrorMessage("회원가입 실패: " + error.message);  // 오류 메시지 표시
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-yellow-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? "회원가입" : "로그인"}</h2>

        <input 
          className="w-full p-2 border rounded mb-2"
          type="email" 
          placeholder="이메일"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input 
          className="w-full p-2 border rounded mb-2"
          type="password" 
          placeholder="비밀번호"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        
        <button 
          className="w-full p-2 bg-pink-500 text-white rounded mt-2"
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "회원가입" : "로그인"}
        </button>

        <button 
          className="w-full p-2 bg-gray-300 rounded mt-2"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "로그인으로 돌아가기" : "회원가입으로 가기"}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
