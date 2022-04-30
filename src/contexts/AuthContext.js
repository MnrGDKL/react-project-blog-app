import { initializeApp } from 'firebase/app';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { createContext, useEffect, useState } from 'react';
import { app } from '../helpers/firebase';

export const AuthContext = createContext();
const auth = getAuth(app);

const AuthContextProvider = ({children}) => {
  const [user, setUser] = useState(false);
  const userObserver = (setUser) => {
    onAuthStateChanged(auth, (user) =>{
      user ? setUser(user) : setUser(false);
    });
    }

  useEffect(() => {
    userObserver(setUser);
  }, []);
  
  return (
    <AuthContext.Provider value={{user, setUser}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthContextProvider;