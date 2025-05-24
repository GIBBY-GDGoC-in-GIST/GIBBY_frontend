import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

const ChatPage = () => {
  const location = useLocation();
  const { hobby } = location.state || {};

  // 취미별 오픈카카오톡 링크 매핑
  const openChatLinks = {
    "등산": "https://open.kakao.com/o/example1",
    "요리": "https://open.kakao.com/o/example2",
    "게임": "https://open.kakao.com/o/example3",
    "독서": "https://open.kakao.com/o/example4",
    "음악 감상": "https://open.kakao.com/o/example5",
    "운동": "https://open.kakao.com/o/example6",
    "default": "https://open.kakao.com/o/default"
  };

  useEffect(() => {
    if (hobby) {
      const link = openChatLinks[hobby] || openChatLinks["default"];
      window.open(link, "_blank"); // 새 창으로 열기
    }
  }, [hobby]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-400 to-blue-300 flex items-center justify-center">
      <div className="bg-white p-8 rounded shadow text-center">
        <h2 className="text-xl font-bold mb-4">채팅방으로 이동 중...</h2>
        <p className="text-gray-600">잠시 후 오픈채팅방으로 이동합니다.</p>
        <p className="mt-4">만약 자동으로 이동하지 않으면 <br />
          <a
            href={openChatLinks[hobby] || openChatLinks["default"]}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 underline"
          >
            이 링크를 클릭하세요.
          </a>
        </p>
      </div>
    </div>
  );
};

export default ChatPage;
