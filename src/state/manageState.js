import state from "./state";

export const getCurrentState = () => {
  return state;
};

export const getCurrentUserNull = () => {
  return null;
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
