import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const hobbies = ["hiking", "cooking", "game", "reading", "music", "exercise"];

const HobbyPage = ({ currentUser }) => {
  const [selectedHobby, setSelectedHobby] = useState(null); // ✅ 선택한 취미 상태 저장
  const navigate = useNavigate();

  const handleSelectHobby = (hobby) => {
    setSelectedHobby(hobby); // 선택한 취미 업데이트
  };

  const handleConfirm = () => {
    if (!selectedHobby) {
      alert("Choose the hobby!"); // ✅ 선택
      //  안 했을 경우 경고창
      return;
    }
    navigate("/appointment", { state: { hobby: selectedHobby } }); // ✅ 선택한 취미와 함께 이동
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">취미 선택</h1>
        <p className="text-gray-600 text-center">환영합니다, {currentUser?.email}님!</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {hobbies.map((hobby, index) => (
            <button
              key={index}
              className={`p-3 rounded-lg ${
                selectedHobby === hobby ? "bg-indigo-700 text-white" : "bg-indigo-500 text-white"
              }`}
              onClick={() => handleSelectHobby(hobby)} // ✅ 버튼 클릭 시 선택한 취미 업데이트
            >
              {hobby}
            </button>
          ))}
        </div>

        <button 
          className="w-full mt-6 p-2 bg-green-500 text-white rounded"
          onClick={handleConfirm} // ✅ '선택 완료' 버튼 클릭 시 페이지 이동
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default HobbyPage;
