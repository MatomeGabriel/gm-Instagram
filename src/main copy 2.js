import "./css/styles.css";
import state from "./state/state";
import createPost from "./components/post/createPost";

import likeIcon from "./assets/like.svg";
import likedIcon from "./assets/liked.svg";
import bookmarkIcon from "./assets/bookmark.svg";
import bookmarkedIcon from "./assets/bookmarked.svg";

const $posts = document.querySelector(".posts");

const renderPosts = (posts) => {
  posts.forEach((post) => {
    const postNode = createPost(post);
    $posts?.appendChild(postNode);
  });
};

const findPost = (id) => {
  return state.posts.find((post) => post.id === id);
};

const findPosts = (userId) => {
  console.log(userId);
  return state.posts.filter((post) => post.userId === userId);
};

const findUser = (id) => {
  return state.users.find((user) => user.id === id);
};

const addFollow = (data) => {
  const { postId } = data;
  // using the following
  const { following } = state.currentUser;
  const { userId } = findPost(data.postId);
  const isFollowing = following.includes(userId);
  const foundPosts = findPosts(userId);
  // const $btnFollowContainer = document.querySelector(
  //   `.js__post-follow-container-${postId}`
  // );
  // const $btnFollowDot = document.querySelector(
  //   `.js__post-follow-dot-${postId}`
  // );

  // seclect all element with the user of the following and  remove t

  if (!isFollowing) {
    foundPosts.forEach((foundPost) => {
      document
        .querySelector(`.js__post-follow-container-${foundPost.id}`)
        .remove();
      document.querySelector(`.js__post-follow-dot-${foundPost.id}`).remove();
    });
    following.push(userId);
  }
  console.log(following);
};

const toggleState = (arr, img, iconNormal, iconClicked) => {
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
};

const handleLike = (likeData) => {
  const img = likeData.btn.querySelector("img");
  const { likes } = findPost(likeData.postId);
  toggleState(likes, img, likeIcon, likedIcon);
  console.log(state.posts);
};
const handleBookmark = (data) => {
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
  console.log(state.currentUser);
};

const addPostEventListener = () => {
  $posts.addEventListener("click", (e) => {
    const el = e.target;

    if (el.closest(".btn-like")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(".btn-like");
      const data = { postId, btn };
      handleLike(data);
    } else if (el.closest(".btn-bookmark")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(".btn-bookmark");
      const data = { postId, btn };
      handleBookmark(data);
    } else if (el.closest(".js__post-follow-btn")) {
      const postId = el.closest(".js__post").dataset?.postId;
      const btn = el.closest(`.js__post-follow-btn-${postId}`);
      const data = { postId, btn };
      addFollow(data);
    }
  });
};

const path = "Path";
const app = () => {
  document.addEventListener("DOMContentLoaded", (e) => {
    const { posts } = state;

    renderPosts(posts);
  });
  addPostEventListener();
};

// run our app
app();

// // Convert our html string to a DOM node
// const convertHTMLToNode = (htmlString) => {
//   const template = document.createElement("template");
//   template.innerHTML = htmlString.trim();
//   return template.content.firstElementChild;
// };

// // Renders Posts
// const renderPosts = (state) => {
//   const { posts, users, currentUser } = state;
//   posts.forEach((post) => {
//     // 1. build html template
//     const htmlTemplate = buildPostTemplate(post, users, currentUser);
//     // 2. create the node and clone it
//     const clone = convertHTMLToNode(htmlTemplate).cloneNode(true);
//     // 3. append our node on the posts container
//     $posts.appendChild(clone);
//   });
// };
// // Renders suggestions
// const renderSuggestions = () => {};
// // Renders user Stories
// const renderUserStories = () => {};

// // Handlers
// const handleLikedPost = () => {};

// const $posts = document.getElementById("posts");

// const handleLike = (el) => {
//   // 2. show the red heart
//   const postId = el.closest(".js_btn-like").dataset.postId;
//   el.closest(".js_btn-like").classList.toggle("js_btn-like--liked");
//   // user clicks post -> update the state iwth use
//   // use unclicks the post -> updates the state

//   // 3. go through the posts, get an index of the current user under post and if it exist remove it or else add it to the post

//   // DO the same for the follow
//   state.posts.forEach((post) => {
//     if (post.id === postId) {
//       const index = post.likes.indexOf(state.currentUser.id);
//       post.likes.includes(state.currentUser.id)
//         ? post.likes.splice(index, 1)
//         : post.likes.push(state.currentUser.id);
//     }
//   });
// };

// const handleBookmark = (el) => {
//   const postId = el.closest(".js_post").dataset.postId;
//   el.closest(".js_btn-bookmark").classList.toggle(
//     "js_btn-bookmark--bookmarked"
//   );

//   const { currentUser } = state;
//   state.posts.forEach((post) => {
//     if (post.id === postId) {
//       const index = currentUser.bookmarks.indexOf(post.id);
//       currentUser.bookmarks.includes(post.id)
//         ? currentUser.bookmarks.splice(index, 1)
//         : currentUser.bookmarks.push(post.id);
//     }
//   });
// };

// const handleModal = () => {
//   console.log("Thsi open up the modal");
// };

// $posts.addEventListener("click", (e) => {
//   const el = e.target;
//   if (el.closest(".js_btn-like")) {
//     handleLike(el);
//   } else if (el.closest(".js_btn-bookmark")) {
//     handleBookmark(el);
//   } else if (el.closest(".js_btn-chat")) {
//     handleModal();
//   } else if (el.closest(".js_btn-likes")) {
//     console.log("Yes please finish, open likes modal");
//   } else if (el.closest(".js_user")) {
//     e.preventDefault();
//     console.log("Open User Page");
//   }
//   console.log(state);

//   // we already know the current user
//   // if the post is clicked, we add the clcked in our our usrid inyto the liked array
//   //  if not we remove it
// });

// renderPosts(state);
// console.log(state);
