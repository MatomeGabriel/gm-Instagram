import createPost from "../components/post/createPost";
import likeIcon from "../assets/like.svg";
import likedIcon from "../assets/liked.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import bookmarkedIcon from "../assets/bookmarked.svg";

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
  // using the following
  const { following } = state.currentUser;
  const { userId } = findPost(state, data.postId);
  const isFollowing = following.includes(userId);
  const foundPosts = findPosts(state, userId);

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

const toggleState = (state, arr, img, iconNormal, iconClicked) => {
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

const handleLike = (state, data) => {
  const img = data.btn.querySelector("img");
  const { likes } = findPost(state, data.postId);
  toggleState(state, likes, img, likeIcon, likedIcon);
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
  console.log(state.currentUser);
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
