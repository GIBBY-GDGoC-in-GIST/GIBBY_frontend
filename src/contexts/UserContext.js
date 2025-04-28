import { createContext, useContext, useState, useEffect } from 'react';
import { database, ref, get } from '../firebase';

const UserContext = createContext();

export const UserProvider = ({ children, currentUser }) => {
  const [nickname, setNickname] = useState('');

  useEffect(() => {
    const fetchNickname = async () => {
      if (currentUser) {
        const userRef = ref(database, `users/${currentUser.uid}`);
        const snapshot = await get(userRef);
        if (snapshot.exists()) {
          const data = snapshot.val();
          if (data.nickname) setNickname(data.nickname);
        }
      }
    };

    fetchNickname();
  }, [currentUser]);

  return (
    <UserContext.Provider value={{ nickname, setNickname }}>
      {children}
    </UserContext.Provider>
  );
};

// ✅ 이건 Context 외부에서만 사용하세요!
export const useUser = () => useContext(UserContext);
