import { getCurrentRoute, navigateTo } from "./routes/routeHandlers";
import { routes } from "./routes/routes";
import "./css/styles.css";

import { createLogin } from "./components/login/createLogin.js";
import { getCurrentUser, register } from "./helpers/auth.js";
import { auth } from "./firebase/config.js";
import { getPosts, getState, getUser, setUser } from "./state/manageState.js";
import {
  createAside,
  createMain,
  createMainContainer,
} from "./components/main-container/createMainContainer.js";
import state from "./state/state.js";
import { createSignup } from "./components/login/createSignup.js";
import { createProfilePage } from "./components/createProfilePage.js";
import {
  createPost,
  getAllPosts,
  getAllUsers,
  updateProfileBio,
  updateUserAvatar,
} from "./helpers/user.js";
import { createOverlay } from "./components/createOverlay.js";
import { createProfilePageModal } from "./components/createProfilePageModal.js";
import { updateProfile } from "firebase/auth";
import { createNavigation } from "./state/createNavigation.js";
import { createAddPostModal } from "./components/createAddPostModal.js";

const fileArr = [];
const isProfileRoute = (path) => {
  return path.startsWith("/profile-");
};

const showLoader = () => {
  document.getElementById(
    "js__container"
  ).innerHTML = `<span class="loader"></span>`;
};

const getProfiledId = (path) => {
  if (!path.startsWith("/profile-")) return null;

  return path.split("-")[1];
};
// handles History
const originalPushState = history.pushState;
history.pushState = function (state, title, url) {
  // we call the history.push with everything
  originalPushState.apply(history, arguments); //we call history.push with the value of this pointing to the history.
  window.dispatchEvent(new Event("urlChange")); // Dispatch custom event
};
window.addEventListener("urlChange", () => {
  // Your function logic here
  showLoader();
  setTimeout(() => {
    app();
  }, 500);
});

window.addEventListener("popstate", function (event) {
  console.log("Pop Ran");
  app();
});

const renderNav = () => {
  document.getElementById("js__aside").appendChild(createNavigation());
};

document.addEventListener("click", (e) => {
  const link = e.target.closest("[data-link]");
  if (link) {
    e.preventDefault();
    const path = link.getAttribute("href");
    const route = getCurrentRoute();
    if (route !== path) {
      navigateTo(path);
    }
  }
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
  showLoader();
  auth.onAuthStateChanged(async (currentUser) => {
    const route = getCurrentRoute();
    // 1. if user is logged in
    // 2. get all the posts and set them to the state
    if (currentUser) {
      try {
        const userData = await getCurrentUser(currentUser);
        setUser({ ...userData });
        const users = await getAllUsers();
        const posts = await getAllPosts();

        console.log("User", users);
        console.log("Posts", posts);
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
      switch (route) {
        case routes.signup:
          navigateTo(routes.signup);
          console.log("signup");
          break;
        default:
          navigateTo(routes.login);
          break;
      }
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
    .appendChild(createProfilePage(getProfiledId(getCurrentRoute())));

  document.getElementById("js__root").appendChild(createOverlay());
  console.log(createOverlay());
  document.getElementById("js__root").appendChild(createProfilePageModal());
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
    .addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) return;
      try {
        await updateUserAvatar(file);
      } catch (error) {
        console.log(error);
      }
    });

  document
    .getElementById("js__profile-page-btn-edit-profile")
    .addEventListener("click", (e) => {
      document.getElementById("js__overlay").style.display = "block";
      document.getElementById("js__profile-page-modal").style.display = "flex";
    });
  document.getElementById("js__overlay").addEventListener("click", (e) => {
    e.target.style.display = "none";
    document.getElementById("js__profile-page-modal").style.display = "none";
    document.getElementById("js__add-post-modal").style.display = "none";
  });

  document
    .getElementById("js__modal-profile-page-close-btn")
    .addEventListener("click", (e) => {
      document.getElementById("js__overlay").style.display = "none";
      document.getElementById("js__profile-page-modal").style.display = "none";
    });

  document
    .getElementById("js__modal-profile-page-submit-btn")
    .addEventListener("click", async (e) => {
      try {
        updateProfileBio();
      } catch (error) {
        console.log(error);
      }
    });
};

const addNavEventListeners = () => {
  document.getElementById("js__add-post-btn").addEventListener("click", (e) => {
    document.getElementById("js__add-post-modal").style.display = "flex";
    document.getElementById("js__overlay").style.display = "flex";
  });

  document
    .getElementById("js__add-post-img-btn")
    .addEventListener("click", () => {
      document.getElementById("js__add-file-img-input-upload").click();
    });

  document
    .getElementById("js__add-file-img-input-upload")
    .addEventListener("change", (e) => {
      const file = e.target.files[0];
      if (!file) return;
      fileArr.push(file);
      const reader = new FileReader();
      reader.onload = function (e) {
        const imgElement = document.getElementById("js__add-post-modal-img");
        imgElement.src = e.target.result;
      };
      reader.readAsDataURL(file); // Convert file to Data URL
    });

  document
    .getElementById("js__upload-post-img-btn")
    .addEventListener("click", async (e) => {
      const file = fileArr.pop();

      if (!file) return;
      try {
        createPost(file);
      } catch (error) {
        console.log(error);
      }
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

const setNav = () => {
  renderNav();
  document.getElementById("js__root").appendChild(createAddPostModal());
  document.getElementById("js__root").appendChild(createOverlay());
  addNavEventListeners();
};

const setPost = async () => {
  try {
    const { renderPosts, addPostEventListener } = await import(
      "./helpers/post.js"
    );

    renderPosts(getPosts(), document.getElementById("js__posts"));
    addPostEventListener(getState());
  } catch (error) {
    console.log(error);
  }
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

  document
    .getElementById("js__follow-section")
    .appendChild(createUserProfile(user));
};

const setHome = () => {
  cleanup();
  document.getElementById("js__main").appendChild(createMainContainer());
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
      setNav();
      setFollow();
      setPost();
      break;
    case isProfileRoute(getCurrentRoute()):
      setProfilePage();
      setNav();
      break;
    case route === routes.root:
      setHome();
      setNav();
      setFollow();
      setPost();
      break;
    case route === routes.login:
      setLogin();
      break;
    case route === routes.signup:
      setSignup();
      break;
  }
};

// document.addEventListener("DOMContentLoaded", () => {});
