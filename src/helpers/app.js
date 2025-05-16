import { createNavigation } from "../components/createNavigation";
import {
  createAside,
  createMain,
  createMainContainer,
} from "../components/main-container/createMainContainer";
import { getCurrentRoute } from "../routes/routeHandlers";
import { routes } from "../routes/routes";

// EVENT LISTENERS :

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
export const cleanup = () => {
  // clears up the container element
  const route = getCurrentRoute();
  const $container = document.getElementById("js__container");
  $container.innerHTML = "";
};

export const cleanupMain = ($container) => {
  cleanup();
  console.log(createAside);
  $container.appendChild(createAside());
  $container.appendChild(createMain());
};

export const renderNav = () => {
  document.getElementById("js__aside").appendChild(createNavigation());
};

export const setNav = () => {
  renderNav();
  document.getElementById("js__root").appendChild(createAddPostModal());
  document.getElementById("js__root").appendChild(createOverlay());
  addNavEventListeners();
};

export const setHome = () => {
  cleanupMain(document.getElementById("js__container"));
  document.getElementById("js__main").appendChild(createMainContainer());
};
