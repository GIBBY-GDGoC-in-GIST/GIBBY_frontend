import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ currentUser }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.patch("http://3.25.186.102:3333/auth/update", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });

        console.log("✅ 프로필 조회:", res.data);

        // 서버 응답 예시가 nickname or name 이면 name으로 쓰자!
        setName(res.data.name || res.data.nickname || '');
        setEmail(res.data.email || '');
      } catch (err) {
        console.error("프로필 조회 실패:", err);
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!name.trim() || !email.trim() || !password.trim()) {
      setMessage("이름, 이메일, 비밀번호 모두 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      console.log("Saving profile with:", {
        name,
        email,
        password
      });

      await axios.patch("http://3.25.186.102:3333/auth/update", {
        name,
        email,
        password
      }, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      setMessage("✅ 프로필이 저장되었습니다.");
    } catch (err) {
      console.error("프로필 저장 실패:", err);
      setMessage("❌ 프로필 저장에 실패했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold mb-4">Profile</h1>

        <div className="mt-4">
          <input
            type="text"
            placeholder="Name"
            className="w-full p-2 border rounded mb-3"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />

          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded mb-3"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <input
            type="password"
            placeholder="New Password"
            className="w-full p-2 border rounded mb-3"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />

          <button
            className="w-full mt-4 p-2 bg-gray-500 text-white rounded"
            onClick={handleSave}
          >
            Save Profile
          </button>

          {message && (
            <p className="mt-4 text-md text-blue-600">{message}</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
