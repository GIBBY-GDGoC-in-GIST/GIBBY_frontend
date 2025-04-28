import React, { createContext, useContext, useState, useEffect } from 'react';
import { auth, database, ref, get } from '../firebase';

// Context 생성
const UserContext = createContext();

// Context Provider 컴포넌트
export const UserProvider = ({ children }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const currentUser = auth.currentUser;
    if (currentUser) {
      const userRef = ref(database, `users/${currentUser.uid}`);
      get(userRef).then((snapshot) => {
        if (snapshot.exists()) {
          const data = snapshot.val();
          setNickname(data.nickname || '');  // 기본값으로 빈 문자열 사용
        }
      });
    }
  }, []);

  return (
    <UserContext.Provider value={{ nickname }}>
      {children}
    </UserContext.Provider>
  );
};

// `UserContext`를 사용하는 custom hook
export const useUser = () => {
  return useContext(UserContext);
};
