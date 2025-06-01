import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const hobbies = ["Hiking", "Cooking", "Game", "Reading", "Music", "Exercise"];

const HobbyPage = ({ currentUser }) => {
  const [selectedHobby, setSelectedHobby] = useState(null);
  const [userName, setUserName] = useState('');  // ✅ userName state 추가
  const navigate = useNavigate();

  // ✅ 프로필 조회 함수
  const fetchUserProfile = async () => {
    try {
      const token = localStorage.getItem('token');
      console.log('Profile fetch token:', token);

      const res = await axios.get('http://3.25.186.102:3333/auth/profile', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      console.log("✅ 프로필 정보:", res.data);
      setUserName(res.data.name || '');
    } catch (err) {
      console.error('프로필 조회 실패:', err.response?.data || err.message || err);
      setUserName('');  // 실패 시 빈 값
    }
  };

  // ✅ 페이지 로드 시 profile 가져오기
  useEffect(() => {
    fetchUserProfile();
  }, []);

  const handleSelectHobby = (hobby) => {
    setSelectedHobby(hobby);
  };

  const handleConfirm = () => {
    if (!selectedHobby) {
      alert("Choose the hobby!");
      return;
    }
    navigate("/appointment", { state: { hobby: selectedHobby } });
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">취미 선택</h1>

        {/* ✅ Welcome, userName 표시 */}
        <p className="text-gray-600 text-center">
          Welcome{userName ? `, ${userName}` : ''}!
        </p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {hobbies.map((hobby, index) => (
            <button
              key={index}
              className={`w-full p-2 rounded-lg font-medium transition 
                ${
                  selectedHobby === hobby
                    ? "bg-gray-400 text-white shadow-lg"
                    : "bg-neutral-100 text-neutral-800 border border-gray-300 shadow-md hover:bg-neutral-200 hover:shadow-lg"
                }`}
              onClick={() => handleSelectHobby(hobby)}
            >
              {hobby}
            </button>
          ))}
        </div>

        <button
          className="w-full mt-6 p-2 bg-white text-black rounded shadow-md hover:shadow-lg border border-gray-300"
          onClick={handleConfirm}
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default HobbyPage;
