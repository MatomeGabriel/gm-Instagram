import state from "./state";

export const getCurrentState = () => {
  return state;
};

export const setUser = (user) => {
  state.currentUser = user;
};

export const getUser = () => {
  return state.currentUser;
};

export const getUserPosts = (id) => {
  return state.posts.filter((post) => post.id === id);
};

export const getPostsByUserId = (id) => {
  return state.posts.filter((post) => post.userId === id);
};

export const getState = () => {
  return state;
};

export const getPosts = () => {
  return state.posts;
};

export const setPosts = (posts) => {
  state.posts = posts;
};

export const setUsers = (users) => {
  state.users = users;
};

export const getUserById = (id) => {
  return state.users.find((user) => user.id === id);
};

export const updatePostLikes = (postId, likes) => {
  return (state.posts.find((post) => post.id === postId).likes = likes);
};
export const updateBookmarks = (userId, bookmarks) => {
  return (state.users.find((user) => user.id === userId).bookmarks = bookmarks);
};
