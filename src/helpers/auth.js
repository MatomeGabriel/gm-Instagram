import { auth } from "../firebase/config";
import { db } from "../firebase/config";
import avatarImg from "../assets/avatar.svg";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
  signOut,
} from "firebase/auth";
import { setUser } from "../state/manageState";
import { setDoc, doc, getDoc } from "firebase/firestore";

const generateUsername = (email, username) => {
  const prefix = username ? username : email.split("@")[0];
  const randNum = Math.floor(Math.random() * 1000);

  return `${prefix}_${randNum}`;
};

const createUserObj = (uid, username, displayName = "", email, isVerified) => {
  return {
    id: uid,
    username: username,
    name: displayName,
    bio: "Write something cool about yourself!",
    avatar: `${avatarImg}`,
    followers: [],
    following: [],
    bookmarks: [],
    isVerified: isVerified,
    email: email,
  };
};

const randomVerified = () => {
  return Math.random < 0.5;
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

    const user = userCredential.user;
    const usernameGenerated = generateUsername(email, username.trim());
    const uid = user.uid;
    const displayName = name.trim();
    const isVerified = randomVerified();

    if (displayName) {
      await updateProfile(user, { displayName: displayName });
    }
    const userObject = createUserObj(
      uid,
      usernameGenerated,
      displayName,
      email,
      isVerified
    );

    await setDoc(doc(db, "users", uid), userObject);
    setUser(userObject);
    alert("Registration successful! 🎉");
  } catch (error) {
    alert("Failed to register ⛔" + error);
  }
};

// 2. Login Users

export const login = async (email, password) => {
  try {
    const userCredential = await signInWithEmailAndPassword(
      auth,
      email,
      password
    );
  } catch (error) {
    alert(`Failed to login ${error}`);
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
