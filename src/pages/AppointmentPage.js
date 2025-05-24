import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AppointmentPage = () => {
  const navigate = useNavigate();
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [hobby, setHobby] = useState("");
  const [error, setError] = useState("");

  const hobbies = ["등산", "요리", "게임", "독서", "음악 감상", "운동"];

  const handleAppointment = async () => {
    if (!date || !time || !hobby) {
      setError("모든 정보를 입력해주세요!");
      return;
    }

    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://3.25.186.102:3333/api/appointment",
        {
          hobby,
          date,
          time
        },
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      // 서버에서 roomId나 appointmentId 같은 정보 받을 수 있다면
      const roomId = response.data.roomId || "defaultRoomId";

      // 성공적으로 생성되었으면 채팅 페이지로 이동
      navigate("/chat", { state: { hobby, date, time, roomId } });
    } catch (err) {
      console.error("약속 설정 실패:", err);
      setError("약속 설정 중 오류가 발생했습니다.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 p-6">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">Appointment</h1>
        <p className="text-gray-600 text-center mb-4">Hobby: {hobby}</p>

        <div className="mb-4">
          <select
            value={hobby}
            onChange={(e) => setHobby(e.target.value)}
            className="w-full p-2 border rounded"
          >
            <option value="">Choose your hobby</option>
            {hobbies.map((hobbyOption, index) => (
              <option key={index} value={hobbyOption}>
                {hobbyOption}
              </option>
            ))}
          </select>
        </div>

        <input
          type="date"
          className="w-full p-2 border rounded mb-4"
          value={date}
          onChange={(e) => setDate(e.target.value)}
        />

        <input
          type="time"
          className="w-full p-2 border rounded mb-4"
          value={time}
          onChange={(e) => setTime(e.target.value)}
        />

        {error && <p className="text-red-500">{error}</p>}

        <button
          className="w-full mt-6 p-2 bg-gray-500 text-white rounded"
          onClick={handleAppointment}
        >
          Make an appointment
        </button>
      </div>
    </div>
  );
};

export default AppointmentPage;
