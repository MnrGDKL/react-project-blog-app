// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { 
  createUserWithEmailAndPassword,
  getAuth,
  GoogleAuthProvider,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut, 
  updateProfile} from "firebase/auth";
  import { toast } from "react-toastify";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyBB3U6qYj9LSXM2sDIUppApbR-1YgTW4rA",
  authDomain: "react-blog-app-f28fb.firebaseapp.com",
  databaseURL: "https://react-blog-app-f28fb-default-rtdb.firebaseio.com",
  projectId: "react-blog-app-f28fb",
  storageBucket: "react-blog-app-f28fb.appspot.com",
  messagingSenderId: "33543989821",
  appId: "1:33543989821:web:cfc9d5bb48212c47cf1854"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);

//! register user
export const signUp = (email,password,toastSuccessNotify, toastErrorNotify, navigate, user, setUser) => {
  try {
    createUserWithEmailAndPassword(auth, email, password);
    navigate("/");
    toastSuccessNotify("🦄 Logged in successfully!");
    console.log("Signed Up:", email)
  } 
  catch (error) {
    console.log(error);
    toastErrorNotify(error.message);
  }
};

//! login user
export const signIn = (email, password, toastSuccessNotify, toastErrorNotify, navigate, user, setUser) => {
  signInWithEmailAndPassword(auth, email, password)
  .then(() => {
    toastSuccessNotify("🦄 Logged in successfully!");
    navigate("/");
    console.log("Logged In:", email)

  })
  .catch(error => {
    toastErrorNotify(error.message);
    console.log(error);
  });
};


//! logout user
export const logOut = () => {
  signOut(auth);
  alert("🦄 You have been logged out");
}

//! update user profile
export const updateUserProfile =(displayName, password)=>{
  updateProfile(auth.currentUser, {
    user: displayName, 
    password: password
  
  }).catch((error) => {
    toast(error)
  });
}
//! sign in with google
export const loginWithGoogle = (toastSuccessNotify, toastErrorNotify, setUser, navigate) => {
    const provider = new GoogleAuthProvider();
    signInWithPopup(auth, provider)
    .then(() => {      
      toastSuccessNotify("🦄 Logged in successfully!");
      navigate("/");

    })
    .catch(error => {
      toastErrorNotify(error.message);
      console.log(error);
    });
  };