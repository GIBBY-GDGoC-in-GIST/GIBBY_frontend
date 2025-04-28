import React, { useState } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
  database,
  ref,
  set,
} from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState(""); // ✅ 닉네임 추가
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setCurrentUser(user); // 로그인된 사용자 전달
      navigate('/home');
    } catch (error) {
      setErrorMessage("로그인 실패: " + error.message);
    }
  };

  const handleSignUp = async () => {
    if (!nickname) {
      setErrorMessage("Please write your nickname.");
      return;
    }
  
    try {
      const result = await createUserWithEmailAndPassword(auth, email, password);
      const user = result.user;
  
      const userRef = ref(database, `users/${user.uid}`);
      await set(userRef, { nickname });
  
      setCurrentUser(user);
  
      setSuccessMessage("🎉 Sign up done!");
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      setErrorMessage("Cannot sign up" + error.message);
    }
  };
  

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-yellow-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Sign up" : "Login"}</h2>

        <input
          className="w-full p-2 border rounded mb-2"
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          className="w-full p-2 border rounded mb-2"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        {/* ✅ 회원가입 모드일 때만 닉네임 입력 필드 보여줌 */}
        {isSignUp && (
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            placeholder="Nickname"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
          />
        )}

        <button
          className="w-full p-2 bg-pink-500 text-white rounded mt-2"
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "Sign up" : "Login"}
        </button>

        <button
          className="w-full p-2 bg-gray-300 rounded mt-2"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMessage(""); // 에러 초기화
          }}
        >
          {isSignUp ? "Go to Login page" : "Go to Sign up page"}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
        {successMessage && <p className="text-green-500 mt-2">{successMessage}</p>}

      </div>
    </div>
  );
};

export default LoginPage;
