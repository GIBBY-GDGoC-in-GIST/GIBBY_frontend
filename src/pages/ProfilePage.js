import React from 'react';

const ProfilePage = ({ currentUser }) => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-300 p-6 flex justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg text-center w-96">
        <h1 className="text-3xl font-bold">프로필</h1>
        <p className="text-gray-600 mt-2">현재 로그인된 사용자: {currentUser?.email}</p>

        <div className="mt-6">
          <img 
            src="https://via.placeholder.com/150"
            alt="프로필 사진"
            className="w-24 h-24 mx-auto rounded-full border-2 border-gray-300"
          />
          <button className="w-full mt-4 p-2 bg-gray-500 text-white rounded">프로필 수정</button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
