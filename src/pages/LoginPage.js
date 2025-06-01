import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");  // ✅ name 추가
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post('http://3.25.186.102:3333/auth/login', {
        email,
        password
      });

      const { access_token } = res.data;

      localStorage.setItem("token", access_token);
      console.log('Saved token:', access_token);

      setCurrentUser(access_token);

      navigate('/home');
    } catch (error) {
      setErrorMessage("로그인 실패: " + (error.response?.data?.message || error.message));
    }
  };
const handleSignUp = async () => {
  if (!name.trim()) {
    setErrorMessage("닉네임을 입력해주세요.");
    return;
  }

  try {
    const res = await axios.post('http://3.25.186.102:3333/auth/register', {
      name,
      email,
      password
    });

    const { access_token } = res.data;

    localStorage.setItem("token", access_token);
    console.log('Saved token (signup):', access_token);

    setCurrentUser(access_token);

    // ✅ 성공 메시지 추가
    setSuccessMessage("Sign up done!");
    setErrorMessage("");  // 에러메시지 초기화

    // ✅ 1~2초 후 home 이동 (원하면)
    setTimeout(() => {
      navigate('/home');
    }, 1000);

  } catch (error) {
    setErrorMessage("Cannot sign up: " + (error.response?.data?.message || error.message));
    setSuccessMessage("");  // 성공 메시지 초기화
  }
};


  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-md w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Sign up" : "Login"}</h2>

        {isSignUp && (
          <input
            className="w-full p-2 border rounded mb-2"
            type="text"
            placeholder="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        )}

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

        <button
          className="w-full p-2 bg-blue-500 text-white rounded mt-2"
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
        {successMessage && <p className="text-blue-600 mt-2">{successMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
