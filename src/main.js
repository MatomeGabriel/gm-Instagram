import { getCurrentRoute, navigateTo } from "./routes/routeHandlers.js";
import { routes } from "./routes/routes.js";
import "./css/styles.css";

import { createLogin } from "./components/login/createLogin.js";
import { getCurrentUser, login, logout, register } from "./helpers/auth.js";
import { auth } from "./firebase/config.js";
import {
  getPostByUserId,
  getPosts,
  getPostsByUserId,
  getState,
  getUser,
  setUser,
} from "./state/manageState.js";
import {
  createAside,
  createMain,
  createMainContainer,
} from "./components/main-container/createMainContainer.js";
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
import { createNavigation } from "./components/createNavigation.js";
import { createAddPostModal } from "./components/createAddPostModal.js";
import { createSuggestedFollow } from "./components/createSuggestedFollow.js";
import {
  addFollow,
  addPostEventListener,
  addSuggestedFollow,
  renderPost,
  renderPosts,
} from "./helpers/post.js";
import convertHTMLToDOMNode from "./helpers/convertHtmlToDomNode.js";
import state from "./state/state.js";
// variables and constants
const fileArr = [];
const removeUploading = () => {
  document.getElementById("js__uploading")?.remove();
};

const showError = () => {
  document.getElementById(
    "js__container"
  ).innerHTML = `<h2 class="">Please reload the page failed to fetch the data</h2>`;
};

const originalPushState = history.pushState; // handles History
history.pushState = function (state, title, url) {
  // we call the history.push with everything
  originalPushState.apply(history, arguments); //we call history.push with the value of this pointing to the history.
  window.dispatchEvent(new Event("urlChange")); // Dispatch custom event
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

const addLoginEventListener = () => {
  // listen for login clicks
  document
    .getElementById("js__login-form")
    .addEventListener("submit", async (e) => {
      // 1. prevent default behavior
      e.preventDefault();
      const email = document.getElementById("js__input-email").value;
      const password = document.getElementById("js__input-password").value;
      try {
        showLoginLoader();
        await login(email, password);
      } catch (error) {
        alert("Failed to register ⛔" + error);
      } finally {
        removeLoginLoader("Login");
      }
      // 3. go to the posts page
    });
  // document
  //   .getElementById("js__form-login-btn")
  //   .addEventListener("click", async (e) => {
  //     // 1. prevent default behavior
  //     e.preventDefault();
  //     const email = document.getElementById("js__input-email").value;
  //     const password = document.getElementById("js__input-password").value;
  //     try {
  //       await register(email, password);
  //       alert("Registration successful! 🎉");
  //     } catch (error) {
  //       alert("Failed to register ⛔" + error);
  //     }

  //     // 3. go to the posts page
  //   });
};
const addSignupEventListeners = () => {
  // listen for login clicks
  // document
  //   .getElementById("js__signup-btn")
  //   .addEventListener("click", async (e) => {
  //     // 1. prevent default behavior
  //     e.preventDefault();
  //     const email = document.getElementById("js__input-email").value;
  //     const password = document.getElementById("js__input-password").value;
  //     const name = document.getElementById("js__input-name").value;
  //     const username = document.getElementById("js__input-username").value;

  //     try {
  //       await register(email, password, name, username);
  //       alert("Registration successful! 🎉");
  //     } catch (error) {
  //       alert("Failed to register ⛔" + error);
  //     }

  //     // 3. go to the posts page
  //   });

  document
    .getElementById("js__login-form")
    .addEventListener("submit", async (e) => {
      // 1. prevent default behavior
      e.preventDefault();
      const email = document.getElementById("js__input-email").value;
      const password = document.getElementById("js__input-password").value;
      const name = document.getElementById("js__input-name").value;
      const username = document.getElementById("js__input-username").value;
      try {
        showSignupLoader();
        await register(email, password, name, username);
      } catch (error) {
        alert("Failed to register ⛔" + error);
      } finally {
        removeSignupLoader();
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
    ?.addEventListener("change", async (e) => {
      const file = e.target.files[0];
      if (!file) {
        alert("Please insert an image to continue");
        return;
      }
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

  document
    .getElementById("js__profile-page-logout-btn")
    ?.addEventListener("click", async (e) => {
      try {
        await logout();
      } catch (error) {
        console.log(error);
      }
    });
};
const addSuggestedProfileEventListeners = () => {
  document
    .querySelector(".suggested-profiles")
    .addEventListener("click", (e) => {
      const btn = e.target.closest("[data-can-follow]");
      const userId = btn.dataset?.userId;
      console.log(userId);
      addSuggestedFollow(state, userId);
      btn.style.display = "none";
    });
};
const scrollToElement = (attributeValue) => {
  console.log("Attribute Value", attributeValue);
  const element = document.querySelector(`[data-post-id="${attributeValue}"]`);
  if (element) element.scrollIntoView({ behavior: "smooth", block: "start" });
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
      if (!file) {
        return;
      }
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

      if (!file) {
        alert("Please insert an image to continue");
        console.log("Please insert an image");
        return;
      }
      try {
        showUploading();
        // 1 create the post
        const [post] = await createPost(file);
        // 2. attach the post to the posts
        renderPost(post, document.getElementById("js__posts"));

        // 3. move to the newly create post
        removeUploading();
        scrollToElement(post.id);
      } catch (error) {
        removeUploading();
        console.log(error);
      }
    });
};

const isProfileRoute = (path) => {
  return path.startsWith("/profile-");
};

const showLoader = () => {
  document.getElementById(
    "js__container"
  ).innerHTML = `<div id="js__loading" class="uploading"><span class="loader"></span></div>`;
};

const showUploading = () => {
  document
    .getElementById("js__root")
    .appendChild(
      convertHTMLToDOMNode(
        `<div id="js__uploading" class="uploading"><span class="loader"></span></div>`
      )
    );
};

const showLoginLoader = () => {
  document.getElementById("js__form-login-btn").style.display = "none";
  const node = convertHTMLToDOMNode(
    '<div id="js__login-loader" class="login-loader"><span class="loader"></span></div>'
  );

  document.querySelector(".form-footer").appendChild(node);
};

const removeLoginLoader = () => {
  document.getElementById("js__form-login-btn").style.display = "flex";
  document.getElementById("js__login-loader").remove();
};

const showSignupLoader = () => {
  document.getElementById("js__signup-btn").style.display = "none";
  const node = convertHTMLToDOMNode(
    '<div id="js__login-loader" class="login-loader"><span class="loader"></span></div>'
  );

  document.querySelector(".form-footer").appendChild(node);
};

const removeSignupLoader = () => {
  document.getElementById("js__signup-btn").style.display = "flex";
  document.getElementById("js__login-loader").remove();
};
// this function is causing problems
// 1. let us only get the user
// 2. lets display all things that remain static
// 3. let us fetch the data
// 4. lets us display that data

// User login checks if the user is logged in and get the user data
const checkIsUserLoggedIn = () => {
  console.log("Is user Logged In Ran");
  showLoader();
  auth.onAuthStateChanged(async (currentUser) => {
    const route = getCurrentRoute();
    if (currentUser) {
      try {
        const userData = await getCurrentUser(currentUser);
        setUser({ ...userData });
        await getAllUsers();
        await getAllPosts();
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
        // showError();
      }
    } else {
      switch (route) {
        case routes.signup:
          navigateTo(routes.signup);
          break;
        default:
          navigateTo(routes.login);
          break;
      }
    }
  });
};

window.addEventListener("urlChange", () => {
  // Your function logic here
  showLoader();
  setTimeout(() => {
    app();
  }, 300);
});

window.addEventListener("popstate", function (event) {
  console.log("Pop Ran");
  checkIsUserLoggedIn();
  app();
});

console.log("Top Level user Login about to run");
checkIsUserLoggedIn();

// Functions

const cleanup = () => {
  // clears up the container element
  const route = getCurrentRoute();
  const $container = document.getElementById("js__container");
  $container.innerHTML = "";
  if (route !== routes.login && route !== routes.signup) {
    $container.appendChild(createAside());
    $container.appendChild(createMain());
  }
};

const renderNav = () => {
  document.getElementById("js__aside").appendChild(createNavigation());
};

const getProfiledId = (path) => {
  if (!path.startsWith("/profile-")) return null;
  return path.split("-")[1];
};
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
  document.getElementById("js__root").appendChild(createProfilePageModal());
};

const setProfilePage = () => {
  cleanup();
  console.log("After Cleanup");
  renderProfilePage();
  console.log("After Render");
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
    // const { renderPosts, addPostEventListener } = await import(
    //   "./helpers/post.js"
    // );

    renderPosts(getPosts(), document.getElementById("js__posts"));
    addPostEventListener(getState(), document.getElementById("js__posts"));
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
  document
    .getElementById("js__follow-section")
    .appendChild(createSuggestedFollow());

  addSuggestedProfileEventListeners();
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
const displayHome = () => {
  setHome();
  setNav();
  setFollow();
  setPost();
};
const app = () => {
  const route = getCurrentRoute();
  // cleanup()
  switch (true) {
    case route === routes.home:
      displayHome();
      break;
    case isProfileRoute(getCurrentRoute()):
      setProfilePage();
      console.log("Is done");
      setNav();
      break;
    case route === routes.root:
      displayHome();
      break;
    case route === routes.login:
      setLogin();
      break;
    case route === routes.signup:
      setSignup();
      break;
  }
};
