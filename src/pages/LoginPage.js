import React, { useState, useEffect } from 'react';
import { signInWithEmailAndPassword, createUserWithEmailAndPassword, auth } from '../firebase';
import { useNavigate } from 'react-router-dom';

const LoginPage = ({ setCurrentUser }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isSignUp, setIsSignUp] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already stored in localStorage
    const storedUser = localStorage.getItem("currentUser");
    if (storedUser) {
      const user = JSON.parse(storedUser);
      setCurrentUser(user);
      navigate("/home");
    }
  }, [navigate, setCurrentUser]);

  const handleLogin = async () => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
      const user = { email };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user)); // store in localStorage
      navigate('/home');
    } catch (error) {
      setErrorMessage("Login failed: " + error.message);
    }
  };

  const handleSignUp = async () => {
    try {
      await createUserWithEmailAndPassword(auth, email, password);
      const user = { email };
      setCurrentUser(user);
      localStorage.setItem("currentUser", JSON.stringify(user)); // store in localStorage
      navigate('/home');
    } catch (error) {
      setErrorMessage("Sign-up failed: " + error.message);
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gradient-to-r from-pink-400 to-yellow-300">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80 text-center">
        <h2 className="text-2xl font-bold mb-4">{isSignUp ? "Sign Up" : "Log In"}</h2>

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
          className="w-full p-2 bg-pink-500 text-white rounded mt-2"
          onClick={isSignUp ? handleSignUp : handleLogin}
        >
          {isSignUp ? "Sign Up" : "Log In"}
        </button>

        <button 
          className="w-full p-2 bg-gray-300 rounded mt-2"
          onClick={() => setIsSignUp(!isSignUp)}
        >
          {isSignUp ? "Go to Log In" : "Go to Sign Up"}
        </button>

        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
    </div>
  );
};

export default LoginPage;
