import createPost from "../components/post/createPost";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import bookmarkedIcon from "../assets/bookmarked.svg";
import {
  updateBookmarks,
  updateBookMarks,
  updatePostLikes,
} from "../state/manageState";
import { updateArrayData, updateUserLike } from "./user";
import { auth } from "../firebase/config";

const $posts = document.getElementById("js__posts");

export const renderPosts = (posts, $postEL) => {
  posts.forEach((post) => {
    const postNode = createPost(post);
    $postEL?.appendChild(postNode);
  });
};

export const findPost = (state, id) => {
  return state.posts.find((post) => post.id === id);
};

export const findPosts = (state, userId) => {
  return state.posts.filter((post) => post.userId === userId);
};

const findUser = (state, id) => {
  return state.users.find((user) => user.id === id);
};

const addFollow = (state, data) => {
  const { postId } = data;
  // current user following
  const { following } = state.currentUser;

  // the user who this post belongs to
  const { userId } = findPost(state, data.postId);

  // check if the current users has the userId in its followers
  const isFollowing = following.includes(userId);
  const { followers } = state.users.find((user) => user.id === userId);
  console.log(followers);
  //
  const foundPosts = findPosts(state, userId);
  // const postuder =
  // seclect all element with the user of the following and  remove t
  if (!isFollowing) {
    foundPosts.forEach((foundPost) => {
      document
        .querySelector(`.js__post-follow-container-${foundPost.id}`)
        .remove();
      document.querySelector(`.js__post-follow-dot-${foundPost.id}`).remove();
    });
    following.push(userId);
    followers.push(auth.currentUser.uid);
  }

  const obj1 = {
    docId: auth.currentUser.uid,
    docData: { following: following },
    docProperty: "following",
    collection: "users",
  };
  // the following
  updateArrayData(obj1, () => {
    return;
  });

  const obj2 = {
    docId: userId,
    docData: { followers: followers },
    docProperty: "follower",
    collection: "users",
  };
  // follower
  updateArrayData(obj2, () => {
    return;
  });
};

const toggleState = (state, arr, img, iconNormal, iconClicked, data) => {
  const { currentUser } = state;
  const isTrue = arr.includes(currentUser.id);

  if (isTrue) {
    const index = arr.indexOf(currentUser.id);
    arr.splice(index, 1);

    img.src = iconNormal;
  } else {
    arr.push(currentUser.id);
    img.src = iconClicked;
  }

  const obj = {
    docId: data.postId,
    docData: { likes: arr },
    docProperty: "likes",
    collection: "posts",
  };

  updateArrayData(obj, updatePostLikes);
};

const handleLike = (state, data) => {
  const img = data.btn.querySelector("img");
  const { likes } = findPost(state, data.postId);
  toggleState(state, likes, img, likeIcon, likedIcon, data);
};

const handleBookmark = (state, data) => {
  const img = data.btn.querySelector("img");
  const { postId } = data;
  const { bookmarks } = state.currentUser;

  const isBookmarked = bookmarks.includes(postId);

  if (isBookmarked) {
    const index = bookmarks.indexOf(postId);
    bookmarks.splice(index, 1);
    img.src = bookmarkIcon;
  } else {
    bookmarks.push(postId);
    img.src = bookmarkedIcon;
  }

  const obj = {
    docId: auth.currentUser.uid,
    docData: { bookmarks: bookmarks },
    docProperty: "bookmarks",
    collection: "users",
  };
  updateArrayData(obj, updateBookmarks);
};

export const addPostEventListener = (state) => {
  $posts.addEventListener("click", (e) => {
    const el = e.target;

    if (el.closest(".btn-like")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(".btn-like");
      const data = { postId, btn };
      handleLike(state, data);
    } else if (el.closest(".btn-bookmark")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(".btn-bookmark");
      const data = { postId, btn };
      handleBookmark(state, data);
    } else if (el.closest(".js__post-follow-btn")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(`.js__post-follow-btn-${postId}`);
      const data = { postId, btn };
      addFollow(state, data);
    }
  });
};
