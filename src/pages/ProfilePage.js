
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const ProfilePage = ({ currentUser }) => {
  const [nickname, setNickname] = useState('');
  const [message, setMessage] = useState('');

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const res = await axios.get("https://api.newbie.gistory.me/api/users/me", {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setNickname(res.data.nickname || '');
      } catch (err) {
        console.error("프로필 조회 실패:", err);
        setMessage("❌ 프로필 정보를 불러오지 못했습니다.");
      }
    };
    fetchProfile();
  }, []);

  const handleSave = async () => {
    if (!nickname.trim()) {
      setMessage("닉네임을 입력해주세요.");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      await axios.put("http://3.25.186.102:3333/api/profile", {
        nickname
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
        <h1 className="text-3xl font-bold">Profile</h1>
        <p className="text-gray-600 mt-2">Current User: {currentUser?.email}</p>

        <div className="mt-6">
          <input
            type="text"
            placeholder="Nickname"
            className="w-full p-2 border rounded mt-4"
            value={nickname}
            onChange={(e) => setNickname(e.target.value)}
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
