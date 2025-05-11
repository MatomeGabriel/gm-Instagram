import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { setUser } from "../state/manageState";
import { setDoc, doc, getDoc } from "firebase/firestore";
import state from "../state/state";

const generateUsername = (email) => {
  const prefix = email.split("@")[0];
  const randNum = Math.floor(Math.random() * 1000);

  return `${prefix}_${randNum}`;
};

const createUserObj = (uid, username, name, email) => {
  return {
    id: uid,
    username: username,
    name: name,
    bio: "Write something cool about yourself!",
    avatar: `https://i.pravatar.cc/150?u=${uid}`, // Dynamic avatar URL
    followers: [],
    following: [],
    bookmarks: [],
    email: email,
  };
};
// 1. Register Users
// Working
export const register = async (email, password, name, username) => {
  try {
    const userCredential = await createUserWithEmailAndPassword(
      auth,
      email,
      password
    );

    const serializedUsername = username.trim();
    const user = userCredential.user;
    const username = generateUsername(email);
    const uid = user.uid;

    const userObject = createUserObj(uid, username, name, email);
    console.log("user Object", userObject);

    await setDoc(doc(db, "users", uid), userObject);

    setUser(userObject);
    console.log(state.currentUser);
  } catch (error) {
    console.log(error);
  }

  //   await updateProfile(userCredential.user, { displayName: name });
};

// 2. Login Users

export const login = async (email, password) => {
  try {
    await signInWithEmailAndPassword(auth, email, password);
  } catch (error) {
    console.log(error);
  }
};

export const logout = async () => {
  await signOut(auth);
};

// get Data

export const getCurrentUser = async (currentUser) => {
  const { uid } = currentUser;
  // users/{uid}
  const userRef = doc(db, "users", uid);
  const userDoc = await getDoc(userRef);
  if (userDoc.exists()) {
    console.log("User Data Exist", userDoc.data());
    return userDoc.data();
  } else {
    console.log("No DOcument Found");
    // return null;
  }
  try {
  } catch (error) {
    console.log(error);
  }
};
