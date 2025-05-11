import { getCurrentRoute, navigateTo } from "./routes/routeHandlers";
import { routes } from "./routes/routes";
import "./css/styles.css";

import { createLogin } from "./components/login/createLogin.js";
import { getCurrentUser, register } from "./helpers/auth.js";
import { auth } from "./firebase/config.js";
import { getUser, setUser } from "./state/manageState.js";
import {
  createAside,
  createMain,
  createMainContainer,
} from "./components/main-container/createMainContainer.js";
import state from "./state/state.js";
import { createSignup } from "./components/login/createSignup.js";
import { createProfilePage } from "./components/createProfilePage.js";

const isProfileRoute = (path) => {
  return path.startsWith("/profile-");
};

const getProfiledId = (path) => {
  if (!path.startsWith("/profile-")) return null;

  return path.split("-")[1];
};
const originalPushState = history.pushState;
history.pushState = function (state, title, url) {
  // we call the history.push with everything
  originalPushState.apply(history, arguments); //we call history.push with the value of this pointing to the history.
  window.dispatchEvent(new Event("urlChange")); // Dispatch custom event
};

window.addEventListener("urlChange", () => {
  console.log("URL changed using pushState!");
  // Your function logic here
  const route = getCurrentRoute();
  console.log("Route", route);
  app();
});

const cleanup = () => {
  // clears up the container element
  const route = getCurrentRoute();
  const $container = document.getElementById("js__container");
  $container.innerHTML = "";
  if (route !== routes.login && route !== routes.signup) {
    console.log("True");
    $container.appendChild(createAside());
    $container.appendChild(createMain());
  }
};

const checkIsUserLoggedIn = () => {
  auth.onAuthStateChanged(async (currentUser) => {
    const route = getCurrentRoute();
    if (currentUser) {
      try {
        const userData = await getCurrentUser(currentUser);
        console.log(userData);
        console.log("User Got", userData);
        setUser({ ...userData });

        switch (route) {
          case routes.login:
            navigateTo(routes.home);
            break;
          case routes.signup:
            navigateTo(routes.home);
            break;
          default:
            app();
            break;
        }
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log("user Does Not exists");
      navigateTo(routes.signup);
    }
  });
};

checkIsUserLoggedIn();

const renderLogin = () => {
  // renders the login page
  const $container = document.getElementById("js__container");
  $container.appendChild(createLogin());
};

const renderSignup = () => {
  const $container = document.getElementById("js__container");
  $container.appendChild(createSignup());
};

const renderProfilePage = () => {
  document
    .getElementById("js__main")
    .appendChild(
      createProfilePage(getUser(), getProfiledId(getCurrentRoute()))
    );
};

const addLoginEventListener = () => {
  // listen for login clicks
  document
    .getElementById("js__form-login-btn")
    .addEventListener("click", async (e) => {
      // 1. prevent default behavior
      e.preventDefault();
      const email = document.getElementById("js__input-email").value;
      const password = document.getElementById("js__input-password").value;
      try {
        await register(email, password);
        alert("Registration successful! 🎉");
      } catch (error) {
        alert("Failed to register ⛔" + error);
      }

      // 3. go to the posts page
    });
};
const addSignupEventListeners = () => {
  // listen for login clicks
  document
    .getElementById("js__signup-btn")
    .addEventListener("click", async (e) => {
      // 1. prevent default behavior
      e.preventDefault();
      const email = document.getElementById("js__input-email").value;
      const password = document.getElementById("js__input-password").value;
      const name = document.getElementById("js__input-name").value;
      const username = document.getElementById("js__input-username").value;

      try {
        await register(email, password, name, username);
        alert("Registration successful! 🎉");
      } catch (error) {
        alert("Failed to register ⛔" + error);
      }

      // 3. go to the posts page
    });
};

const addProfilePageEventListeners = () => {
  document
    .getElementById("js__profile-page-upload-btn")
    .addEventListener("click", () => {
      document.getElementById("js__file-input-upload").click();
      console.log("Click");
    });
  document
    .getElementById("js__file-input-upload")
    .addEventListener("change", (e) => {
      const file = e.target.files[0];
    });
};

const setProfilePage = () => {
  cleanup();
  renderProfilePage();
  addProfilePageEventListeners();
};
const setLogin = () => {
  cleanup();
  renderLogin();
  addLoginEventListener();
};
const setPost = async () => {
  const { renderPosts, addPostEventListener } = await import(
    "./helpers/post.js"
  );

  renderPosts(state.posts);
  addPostEventListener(state);
};

const setFollow = async () => {
  const { createUserProfile } = await import(
    "./components/createUserProfile.js"
  );
  const user = {
    ...getUser(),
    avatarSize: "--md",
    curUser: true,
    hasReel: false,
  };

  console.log(getUser());
  document
    .getElementById("js__follow-section")
    .appendChild(createUserProfile(user));
};
const setHome = () => {
  cleanup();
  document.getElementById("js__main").appendChild(createMainContainer());
  setPost();
  // setFollow();
};
const setSignup = () => {
  cleanup();
  renderSignup();
  addSignupEventListeners();
};

const app = () => {
  const route = getCurrentRoute();
  switch (true) {
    case route === routes.home:
      setHome();
      setFollow();
      break;
    case isProfileRoute(getCurrentRoute()):
      setProfilePage();
      break;
    case route === routes.root:
      setHome();
      setFollow();
      break;
    case route === routes.login:
      setLogin();
      break;
    case route === routes.signup:
      setSignup();
      break;
  }
};

document.addEventListener("DOMContentLoaded", () => {});
