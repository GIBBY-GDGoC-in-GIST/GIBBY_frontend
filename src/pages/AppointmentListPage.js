import React, { useState, useEffect } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';

const db = getFirestore();

const AppointmentsListPage = () => {
  const [appointments, setAppointments] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchAppointments = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, "appointments"));
        const appointmentsList = [];
        querySnapshot.forEach((doc) => {
          appointmentsList.push(doc.data());
        });
        setAppointments(appointmentsList);
      } catch (error) {
        console.error("약속 목록 불러오기 실패:", error);
      }
    };
    
    fetchAppointments();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">약속 목록</h1>
        <div className="space-y-4">
          {appointments.map((appointment, index) => (
            <div key={index} className="border p-4 rounded-lg shadow-sm">
              <h3 className="text-xl font-semibold">{appointment.hobby}</h3>
              <p>날짜: {appointment.date}</p>
              <p>시간: {appointment.time}</p>
              <button
                className="mt-2 p-2 bg-blue-500 text-white rounded"
                onClick={() => navigate("/chat", { state: appointment })}
              >
                채팅하기
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentsListPage;
