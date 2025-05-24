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
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">취미 선택</h1>
        <p className="text-gray-600 text-center">환영합니다, {currentUser?.email}님!</p>

        <div className="grid grid-cols-2 gap-4 mt-6">
          {hobbies.map((hobby, index) => (
            <button
              key={index}
              className={`w-full p-2 rounded-lg font-medium transition 
                ${
                  selectedHobby === hobby
                    ? "bg-gray-400 text-white shadow-lg" // ✅ 선택된 버튼은 음영 유지
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
            onClick={handleConfirm} // ✅ '선택 완료' 버튼 클릭 시 페이지 이동
        >
          Done
        </button>
      </div>
    </div>
  );
};

export default HobbyPage;
