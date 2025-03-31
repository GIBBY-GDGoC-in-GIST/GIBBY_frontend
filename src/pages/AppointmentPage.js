import React, { useState } from 'react';
import { getFirestore, doc, setDoc, collection } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; // Firebase 인증

const db = getFirestore();

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hobby, setHobby] = useState("");  // hobby 선택 상태
  const [error, setError] = useState(null);

  // 취미 선택을 위한 예시 데이터
  const hobbies = ["등산", "요리", "게임", "독서", "음악 감상", "운동"];

  const handleAppointment = async () => {
    if (!date || !time || !hobby) {  // hobby 값이 없을 경우
      setError("모든 정보를 입력해주세요!");
      return;
    }

    // 로그인 확인
    const userId = auth.currentUser?.uid;
    if (!userId) {
      setError("로그인 상태가 아닙니다. 로그인 후 다시 시도해주세요.");
      return;
    }

    try {
      // 약속 정보 콘솔에 출력
      console.log("약속 정보:", { userId, hobby, date, time });

      // Firebase에 약속 저장
      const appointmentRef = doc(collection(db, 'appointments')); // appointments 컬렉션에 새 약속 생성
      await setDoc(appointmentRef, {
        userId: userId,
        hobby: hobby,
        date: date,
        time: time,
        timestamp: new Date(),
      });

      // 약속 설정 후 채팅 페이지로 이동
      navigate("/chat", { state: { hobby, date, time } });
    } catch (error) {
      console.error("약속 설정 실패:", error);
      setError("약속 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">약속 잡기</h1>
        <p className="text-gray-600 text-center mb-4">취미: {hobby}</p>

        {/* 취미 선택 */}
        <div className="mb-4">
          <select
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">취미를 선택하세요</option>
            {hobbies.map((hobbyOption, index) => (
              <option key={index} value={hobbyOption}>
                {hobbyOption}
              </option>
            ))}
          </select>
        </div>

        {/* 날짜 선택 */}
        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        {/* 시간 선택 */}
        <input
          type="time"
          className="w-full p-2 border rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {/* 오류 메시지 */}
        {error && <p className="text-red-500">{error}</p>}

        {/* 약속 잡기 버튼 */}
        <button
          className="w-full mt-6 p-2 bg-green-500 text-white rounded"
          onClick={handleAppointment}
        >
          약속 잡기
        </button>
      </div>
    </div>
  );
};

export default AppointmentPage;
