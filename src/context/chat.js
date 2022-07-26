import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  onSnapshot,
  query,
} from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyCKvC3O7Pbm7ewkitWZAKXtuufC0rBXNuc",
  authDomain: "fir-chatboxproyect.firebaseapp.com",
  projectId: "firebasechatboxproyect",
  storageBucket: "firebasechatboxproyect.appspot.com",
  messagingSenderId: "829978360453",
  appId: "1:829978360453:web:7b977e44773c2a7edfc7ec",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const ChatContext = createContext(null);

export const ChatProvider = ({ children }) => {
  // state del chat
  const [chatData, setChatData] = useState({
    from: "",
    time: "",
    message: "",
  });

  const [loading, setLoading] = useState(true);

  // guardar mensajes
  const sendMessage = async (from, message) => {
    try {
      if (message === "") return;
      const docRef = await addDoc(collection(db, "ChatDevApp"), {
        from: from,
        message: message,
        time: Date.now(),
      });
      return docRef;
    } catch (error) {
      console.error("Error enviando el mensaje", error);
    }
  };

  // recuperar el historial del chat

  // actualizar el historial del chat
  const getChatHistory = async () => {
    try {
      const querySnapshot = await getDocs(collection(db, "ChatDevApp"));

      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        if (doc.exists()) {
          tempChatData.push({ id: doc.id, ...doc.data() });
          setChatData([...tempChatData]);
          setLoading(false);
        }
      });
      const chatDiv = document.querySelector(".chat");
      chatDiv.scrollTop = chatDiv.scrollHeight;
    } catch (error) {
      console.log("Error con el historial", error);
    }
  };

  const updateChatHistory = () => {
    const q = query(collection(db, "ChatDevApp"));
    onSnapshot(q, (querySnapshot) => {
      let tempChatData = [];
      querySnapshot.forEach((doc) => {
        tempChatData.push({ id: doc.id, ...doc.data() });
        setChatData([...tempChatData]);
        setLoading(false);
      });
      const chatDiv = document.querySelector(".chat");
      chatDiv.scrollTop = chatDiv.scrollHeight;
    });
  };

  return (
    <ChatContext.Provider
      value={{
        sendMessage,
        getChatHistory,
        chatData,
        loading,
        updateChatHistory,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
};
