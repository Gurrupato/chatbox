import { createContext, useState } from "react";
import { initializeApp } from "firebase/app";
import {
  getAuth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const auth = getAuth();

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(null);
  const [error, setError] = useState(null);
  const [message, setMessage] = useState("");

  const createNewUser = async (email, password) => {
    try {
      setError(false);
      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Debes rellenar todos los campos");

        return;
      }

      const newUser = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );
      setUser(newUser.user);
      localStorage.setItem("chat-user", JSON.stringify({ email }));
      setLoading(false);
      return newUser;
    } catch (error) {
      console.error("Error creating user", error);
      if (error.code === "auth/email-already-in-use") {
        setError(true);

        setMessage("Ya estas registrado");
      }
      if (error.code === "auth/invalid-email") {
        setError(true);

        setMessage("Porfavor registrate con un correo de verdad");
      }
    } finally {
      setLoading(false);
    }
  };

  const loginUser = async (email, password) => {
    try {
      setError(false);

      setLoading(true);
      if (email === "" || password === "") {
        setError(true);
        setMessage("Debes rellenar todos los campos");

        return;
      }
      const signedInUser = await signInWithEmailAndPassword(
        auth,
        email,
        password
      );
      localStorage.setItem("chat-user", JSON.stringify({ email }));
      setUser(signedInUser.user);
      setLoading(false);
      return signedInUser;
    } catch (error) {
      console.error("Usuario o contraseña incorrectos", error);
      if (error.code === "auth/wrong-password") {
        setError(true);

        setMessage("Contraseña incorrecta");
      }
    } finally {
      setLoading(false);
    }
  };

  const persistUser = () => {
    const userExist = localStorage.getItem("chat-user");
    if (userExist) {
      const user = JSON.parse(userExist);
      setUser(user);
      return true;
    } else {
      return false;
    }
  };

  const signOut = () => {
    localStorage.removeItem("chat-user");
  };

  return (
    <AuthContext.Provider
      value={{
        createNewUser,
        loginUser,
        persistUser,
        signOut,
        loading,
        error,
        message,
        user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCKvC3O7Pbm7ewkitWZAKXtuufC0rBXNuc",
  authDomain: "fir-chatboxproyect.firebaseapp.com",
  projectId: "firebasechatboxproyect",
  storageBucket: "firebasechatboxproyect.appspot.com",
  messagingSenderId: "829978360453",
  appId: "1:829978360453:web:7b977e44773c2a7edfc7ec",
};

const app = initializeApp(firebaseConfig);

// Initialize Firebase
