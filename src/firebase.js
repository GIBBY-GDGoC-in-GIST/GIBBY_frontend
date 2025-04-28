import { initializeApp } from 'firebase/app';
import { 
  getAuth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut 
} from 'firebase/auth';
import { 
  getDatabase, 
  ref, 
  set, 
  get, 
  child, 
  push 
} from 'firebase/database';
import { 
  getStorage, 
  ref as storageRef, 
  uploadBytes, 
  getDownloadURL 
} from 'firebase/storage';

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyDtdE-O7IDVEftwBG3YFPDqe5V08UQqrmE",
  authDomain: "gibby-5c579.firebaseapp.com",
  databaseURL: "https://gibby-5c579-default-rtdb.firebaseio.com",
  projectId: "gibby-5c579",
  storageBucket: "gibby-5c579.appspot.com",
  messagingSenderId: "887938181386",
  appId: "1:887938181386:web:490468cbde44e91c3af2f3"
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const database = getDatabase(app);
const storage = getStorage(app);

// 모든 Firebase 모듈 export
export { 
  auth, 
  signInWithEmailAndPassword, 
  createUserWithEmailAndPassword, 
  signOut, 
  database, 
  ref, 
  set, 
  get, 
  child, 
  push, 
  storage, 
  storageRef, 
  uploadBytes, 
  getDownloadURL 
};
