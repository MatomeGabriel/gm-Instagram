import { auth, storage, db } from "../firebase/config";

import { ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { doc, updateDoc } from "firebase/firestore";

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
