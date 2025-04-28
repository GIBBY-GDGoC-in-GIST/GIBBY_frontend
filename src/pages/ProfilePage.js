import React, { useState, useEffect } from 'react';
import { database, ref, set, get } from '../firebase';
import { useUser } from '../contexts/UserContext';

const ProfilePage = ({ currentUser }) => {
  const { nickname: globalNickname, setNickname: setGlobalNickname } = useUser();
  const [nickname, setNickname] = useState('');

  // Firebase에서 닉네임 초기 로딩
  useEffect(() => {
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.nickname) {
            setNickname(data.nickname);           // 입력창에 표시
            setGlobalNickname(data.nickname);     // 전역 상태로 저장
          }
        }
      });
    }
  }, [currentUser]);

  // 프로필 저장
  const handleSave = async () => {
    if (!nickname) {
      alert('Please write your nickname!');
      return;
    }

    try {
      const userRef = ref(database, `users/${currentUser.uid}`);
      await set(userRef, { nickname });             // Firebase에 저장
      setGlobalNickname(nickname);                  // 전역 상태 업데이트
      alert('Profile saved!');
    } catch (error) {
      console.error("Profile not saved", error);
      alert('Error occured while saving the profile.');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-r from-green-400 to-blue-300 p-6 flex justify-center">
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
  
          {/* ✅ 바로 반영되는 닉네임 표시 */}
          {globalNickname && (
            <p className="mt-4 text-lg font-semibold text-green-600">
              Saved nickname: {globalNickname}
            </p>
          )}
        </div>
      </div>
    </div>
  );
  
};

export default ProfilePage;
