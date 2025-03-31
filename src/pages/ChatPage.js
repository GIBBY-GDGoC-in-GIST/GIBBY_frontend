import React, { useState, useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { getFirestore, collection, addDoc, query, orderBy, onSnapshot } from 'firebase/firestore';
import { auth } from '../firebase'; // Firebase 인증

const db = getFirestore();

const ChatPage = () => {
  const location = useLocation();
  const { hobby, date, time } = location.state || {};
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    // Firestore에서 실시간으로 메시지 받아오기
    const q = query(
      collection(db, "chats"),
      orderBy("timestamp")
    );
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messagesData = [];
      querySnapshot.forEach((doc) => {
        messagesData.push(doc.data());
      });
      setMessages(messagesData);
    });
    
    return () => unsubscribe();
  }, []);

  const handleSendMessage = async () => {
    if (message.trim() === "") return;

    try {
      await addDoc(collection(db, "chats"), {
        text: message,
        timestamp: new Date(),
        sender: auth.currentUser?.email,
        hobby,
        date,
        time
      });
      setMessage(""); // 메시지 입력 후 비우기
    } catch (error) {
      console.error("Error adding message: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-4">
      <div className="max-w-3xl mx-auto bg-white shadow-lg rounded-lg p-6">
        <h1 className="text-3xl font-bold text-center mb-4">채팅하기</h1>
        <p className="text-gray-600 text-center mb-4">취미: {hobby}</p>
        <p className="text-gray-600 text-center mb-4">약속 날짜: {date} 시간: {time}</p>

        {/* 채팅 메시지 목록 */}
        <div className="h-80 overflow-y-scroll mb-4 border-b pb-4">
          {messages.map((msg, index) => (
            <div key={index} className="mb-2">
              <p className="font-bold">{msg.sender}</p>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>

        {/* 메시지 입력 */}
        <input
          type="text"
          className="w-full p-2 border rounded mb-2"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="메시지를 입력하세요..."
        />
        <button 
          className="w-full p-2 bg-blue-500 text-white rounded"
          onClick={handleSendMessage}
        >
          메시지 보내기
        </button>
      </div>
    </div>
  );
};

export default ChatPage;
