import { createContext, useContext, useState, useEffect } from "react";
import { app } from "../libs/firebase";
import { makeMagic } from "../libs/magic";
import {
  getAuth,
  getIdToken,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  sendPasswordResetEmail,
  signOut,
} from "firebase/auth";

const AuthContext = createContext(null);

export const useAuthContext = () => {
  const context = useContext(AuthContext);

  if (context === undefined) {
    throw new Error("useAuthContext cannot be used outside of it's Provider");
  }
  return context;
};

export const AuthContextProvider = ({ children }) => {
  const [magic, setMagic] = useState(null);
  const [metadata, setMetadata] = useState({});
  const auth = getAuth(app);

  useEffect(() => {
    setMagic(makeMagic);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getToken = async () => {
    const { currentUser } = auth;
    return await getIdToken(currentUser);
  };

  const getMagic = async (token) => {
    const jwt = token ? token : await getToken();
    await magic.openid.loginWithOIDC({
      jwt,
      providerId: process.env.REACT_APP_MAGIC_PROVIDER_ID,
    });
    const metadata = await magic.user.getMetadata();
    setMetadata(metadata);
  };

  const logInWithEmailAndPassword = async (email, password) => {
    try {
      const res = await signInWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const token = user.accessToken;
      await getMagic(token);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const registerWithEmailAndPassword = async (email, password) => {
    try {
      const res = await createUserWithEmailAndPassword(auth, email, password);
      const user = res.user;
      const token = user.accessToken;
      await getMagic(token);
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const sendPasswordReset = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert("Password reset link sent!");
    } catch (err) {
      console.error(err);
      alert(err.message);
    }
  };

  const logout = async () => {
    signOut(auth);
    await magic.user.logout();
  };

  return (
    <AuthContext.Provider
      value={{
        auth,
        metadata,
        getMagic,
        getToken,
        logInWithEmailAndPassword,
        registerWithEmailAndPassword,
        sendPasswordReset,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
