import React, { useState, useEffect } from 'react';
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  auth,
  database,
  ref,
  set,
} from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser, currentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  // ✅ currentUser 변경 시 Home으로 자동 이동
  useEffect(() => {
    if (currentUser) {
      navigate('/home');
    }
  }, [currentUser, navigate]);

  const handleLogin = async () => {
    try {
      const result = await signInWithEmailAndPassword(auth, email, password);
      const user = result.user;
      setCurrentUser(user); // 로그인 성공 → currentUser 업데이트
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

      setCurrentUser(user); // 회원가입 성공 → currentUser 업데이트

      setSuccessMessage("🎉 Sign up done!");
    } catch (error) {
      setErrorMessage("Cannot sign up: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
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
          className="w-full p-2 bg-gray-500 text-white rounded mt-2"
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "Sign up" : "Login"}
        </button>

        <button
          className="w-full p-2 bg-gray-300 rounded mt-2"
          onClick={() => {
            setIsSignUp(!isSignUp);
            setErrorMessage("");
            setSuccessMessage("");
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
