import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [nickname, setNickname] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const [successMessage, setSuccessMessage] = useState("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await axios.post("http://3.25.186.102:3333/api/login", {
        email,
        password
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setCurrentUser(user);
      navigate('/home');
    } catch (error) {
      setErrorMessage("로그인 실패: " + (error.response?.data?.message || error.message));
    }
  };

  const handleSignUp = async () => {
    if (!nickname) {
      setErrorMessage("Please write your nickname.");
      return;
    }

    try {
      const res = await axios.post("http://3.25.186.102:3333/api/register", {
        email,
        password,
        nickname
      });
      const { token, user } = res.data;
      localStorage.setItem("token", token);
      setCurrentUser(user);
      setSuccessMessage("🎉 Sign up done!");
      setTimeout(() => {
        navigate('/home');
      }, 1500);
    } catch (error) {
      setErrorMessage("회원가입 실패: " + (error.response?.data?.message || error.message));
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
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
