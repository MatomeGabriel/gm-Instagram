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
