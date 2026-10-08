import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { onAuthStateChanged, signOut, signInWithPopup, createUserWithEmailAndPassword, signInWithEmailAndPassword, updateProfile } from "firebase/auth";
import { auth, googleProvider } from '../services/firebaseConfig';
import { syncUser } from '../services/authService';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState();
  const [authLoading, setAuthLoading] = useState(true);
  const navigate = useNavigate();
  const [signUpError, setSignUpError] = useState("");
  const [logoutMsg, setLogoutMsg] = useState("");
  const [logoutType, setLogoutType] = useState("");

  const [authModal, setAuthModal] = useState(null);

  const openLogin = () => setAuthModal('login');
  const openSignUp = () => setAuthModal('signup');
  const closeModal = () => setAuthModal(null);


  const handleSignUp = async (uname, email, passwd) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, passwd);
      await updateProfile(userCredential.user, {
        displayName: uname
      });
      await userCredential.user.reload();

      await syncUser(userCredential.user);

      setUser(userCredential.user);

      return true;

    } catch (err) {
      let errorMsg = "Something went wrong. Please try again!";

      if (err.code === "auth/email-already-in-use") {
        errorMsg = "Email is already registered";
      } else if (err.code === "auth/password-does-not-meet-requirements") {
        errorMsg = err.message;
      }

      setSignUpError(errorMsg);

      setTimeout(() => {
        setSignUpError("")
      }, 4000);

      return false;
    }
  };

  const login = async (email, password) => {
    const credential = await signInWithEmailAndPassword(auth, email, password);
    await syncUser(credential.user);
    return credential;
  }

  const logout = async () => {
    try {
      await signOut(auth);
      setLogoutMsg("You have successfully logged out");
      setLogoutType("success");
      navigate('/');
    } catch (error) {
      console.error("Logout failed:", error);
      setLogoutMsg("Sorry! unable to log out. Please try again.");
      setLogoutType("failure");
    }
  };

  const signInWithGoogle = async () => {
    const credential = await signInWithPopup(auth, googleProvider);
    await syncUser(credential.user);
    return credential;
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setAuthLoading(false);
    });
    return unsubscribe;
  }, []);

  const value = {
    user,
    handleSignUp,
    signUpError,
    login,
    logout,
    signInWithGoogle,
    authModal,
    openLogin,
    openSignUp,
    closeModal,
    authLoading,
    logoutMsg, setLogoutMsg, logoutType
  }

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};


export default AuthProvider;