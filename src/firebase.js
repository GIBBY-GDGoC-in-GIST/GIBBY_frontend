// firebase.js
import { initializeApp } from 'firebase/app';
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut } from 'firebase/auth'; // auth 기능 import
import { getDatabase, ref, set, get, child, push } from 'firebase/database'; // database 기능 import

// Firebase 프로젝트 설정
const firebaseConfig = {
  apiKey: "AIzaSyDtdE-O7IDVEftwBG3YFPDqe5V08UQqrmE",  // 여기에 Firebase 콘솔에서 제공한 apiKey 입력
  authDomain: "gibby-5c579.firebaseapp.com",          // 여기에 Firebase 콘솔에서 제공한 authDomain 입력
  databaseURL: "https://gibby-5c579-default-rtdb.firebaseio.com", // 여기에 Firebase 콘솔에서 제공한 databaseURL 입력
  projectId: "gibby-5c579",                            // 여기에 Firebase 콘솔에서 제공한 projectId 입력
  storageBucket: "gibby-5c579.appspot.com",            // 여기에 Firebase 콘솔에서 제공한 storageBucket 입력
  messagingSenderId: "887938181386",                   // 여기에 Firebase 콘솔에서 제공한 messagingSenderId 입력
  appId: "1:887938181386:web:490468cbde44e91c3af2f3"   // 여기에 Firebase 콘솔에서 제공한 appId 입력
};

// Firebase 초기화
const app = initializeApp(firebaseConfig);

// Firebase 인증 및 데이터베이스 초기화
const auth = getAuth(app);
const database = getDatabase(app);

export { auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, signOut, database, ref, set, get, child, push };
