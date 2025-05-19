import { auth, storage, db } from "../firebase/config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
} from "firebase/firestore";
import {
  getPosts,
  setPosts,
  setUser,
  setUsers,
  updatePostLikes,
} from "../state/manageState";
import state from "../state/state";

export const updateUserAvatar = async (file) => {
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged In to upload");
    return;
  }
  try {
    const storageRef = ref(storage, `avatars/${user.uid}`);
    await uploadBytes(storageRef, file);

    const downloadURL = await getDownloadURL(storageRef);

    //   save to database
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { avatar: downloadURL });

    document.getElementById("js__profile-page-img").src = downloadURL;
  } catch (error) {
    console.log(error);
  }
};

export const updateProfileBio = async () => {
  const text = document.getElementById("js__profile-page-textarea").value;
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged In to upload");
    return;
  }
  try {
    const userRef = doc(db, "users", user.uid);
    await updateDoc(userRef, { bio: text });
    document.getElementById("js__overlay").style.display = "none";
    document.getElementById("js__profile-page-modal").style.display = "none";
    console.log(document.getElementById("js__profile-page-bio"));
    document.getElementById("js__profile-page-bio").textContent = text;
  } catch (error) {
    console.log(error);
  }
};

// gets all our posts
export const getAllPosts = async () => {
  try {
    const postsRef = collection(db, "posts");

    const querySnapshot = await getDocs(postsRef);
    console.log(querySnapshot);
    const posts = querySnapshot.docs.map((doc) => doc.data());
    console.log(posts);
    setPosts(posts);
    return posts;
  } catch (error) {
    console.log(error);
  }
};

export const getAllUsers = async () => {
  try {
    const userRef = collection(db, "users");

    const querySnapshot = await getDocs(userRef);
    console.log(querySnapshot);
    const users = querySnapshot.docs.map((doc) => doc.data());
    console.log(users);
    setUsers(users);
    return users;
  } catch (error) {
    console.log(error);
  }
};

export const createPost = async (file) => {
  const caption = document.getElementById("js__add-post-modal-textarea").value;
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged In to upload");
    return;
  }

  try {
    const postId = doc(collection(db, "posts")).id;

    const imageRef = ref(storage, `posts/${user.uid}/${postId}`);

    await uploadBytes(imageRef, file);
    const downloadURL = await getDownloadURL(imageRef);

    const postData = {
      id: postId,
      userId: user.uid,
      image: downloadURL,
      caption: caption,
      likes: [],
      comments: [],
      timestamp: serverTimestamp(),
    };

    await setDoc(doc(db, "posts", postId), postData);
    alert("Post Has Successfully Uploaded");
    const posts = await getAllPosts();
    setPosts(posts);

    document.getElementById("js__overlay").style.display = "none";
    document.getElementById("js__add-post-modal").style.display = "none";
    document.getElementById("js__add-post-modal-textarea").value = "";
    return state.posts.filter((post) => post.id === postId);
  } catch (error) {
    console.log(error);
  }
};

// takes in an object that allows us to reuse the function
export const updateArrayData = async (obj, callBackFn) => {
  const { docId, docData, docProperty, collection } = obj;
  const user = auth.currentUser;
  if (!user) {
    alert("You must be logged In to upload");
    return;
  }
  try {
    //   save to database
    const ref = doc(db, collection, docId);
    console.log(docData);
    await updateDoc(ref, docData);

    getArrayData(obj, callBackFn);
  } catch (error) {
    console.log(error);
  }
};

export const getArrayData = async (obj, callBackFn) => {
  const { docId, docProperty, collection } = obj;
  try {
    const ref = doc(db, collection, docId);
    const snapShot = await getDoc(ref);

    if (snapShot.exists()) {
      const data = snapShot.data()[docProperty];
      console.log(data);
      callBackFn(docId, data);
      return data;
    } else {
      console.log("No such document!");
      return [];
    }
  } catch (error) {
    console.log(error);
  }
};

// export const updateUserLike = async (postId, likesArr) => {
//   const user = auth.currentUser;
//   if (!user) {
//     alert("You must be logged In to upload");
//     return;
//   }
//   try {
//     //   save to database
//     const likesRef = doc(db, "posts", postId);
//     await updateDoc(likesRef, { likes: likesArr });

//     const likes = getLikesArray(postId);
//   } catch (error) {
//     console.log(error);
//   }
// };

// export const getLikesArray = async (obj) => {
//   const { postId, docData, docProperty, collection } = obj;
//   try {
//     const postsRef = doc(db, "posts", postId);
//     const postSnap = await getDoc(postsRef);

//     if (postSnap.exists()) {
//       const likes = postSnap.data().likes; // Extract likes array
//       console.log("Likes array:", likes);
//       updatePostLikes(postId, likes);
//       return likes;
//     } else {
//       console.log("No such document!");
//       return [];
//     }
//   } catch (error) {
//     console.log(error);
//   }
// };
// export const getAllUsers =
