export const navigateTo = (path) => {
  window.history.pushState({}, "", path);
};

export const getCurrentRoute = () => {
  return window.location.pathname;
};
