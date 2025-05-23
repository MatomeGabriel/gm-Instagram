import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";
import { auth } from "../firebase/config";
import { getUserById } from "../state/manageState";

export const createNavigation = () => {
  const { avatar } = getUserById(auth.currentUser.uid);
  const nav = `<nav class="nav">
              <div class="nav-logo">
                <a data-link href="/home" class="nav-logo-link">
                  <img src="img/Logo.svg" alt="" class="nav-logo-img" />
                  <img
                    src="img/Instagram-icon.svg"
                    alt=""
                    class="nav-logo-icon" />
                </a>
              </div>

              <ul class="nav-items">
                <!-- Home -->
                <li class="nav-item nav-item--active">
                  <a data-link href="/home" class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >home</span
                    >
                    <span class="nav-item-text">Home</span>
                  </a>
                </li>

                <!-- Search -->
                <li class="nav-item hidden">
                  <a data-link  class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >search</span
                    >
                    <span class="nav-item-text">Search</span>
                  </a>
                </li>

                <!-- Explore -->
                <li class="nav-item">
                  <a data-link  class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >explore</span
                    >
                    <span class="nav-item-text">Explore</span>
                  </a>
                </li>

                <!-- Reels -->
                <li class="nav-item">
                  <a data-link  class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >movie</span
                    >
                    <span class="nav-item-text">Reels</span>
                  </a>
                </li>

                <!-- Messages -->
                <li class="nav-item hidden">
                  <a data-link href="/profile-${auth.currentUser.uid}" class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >chat</span
                    >
                    <span class="nav-item-text">Messages</span>
                  </a>
                </li>

                <!-- Notifications -->
                <li class="nav-item hidden">
                  <a data-link href="/profile-${auth.currentUser.uid}" class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >notifications</span
                    >
                    <span class="nav-item-text">Notifications</span>
                  </a>
                </li>

                <!-- Create -->
                <li class="nav-item">
                  <btn id="js__add-post-btn" class="nav-item-link btn">
                    <span class="material-symbols-outlined nav-item-icon"
                      >add_circle</span
                    >
                    <span class="nav-item-text">Create</span>
                  </btn>
                </li>

                <!-- Profile -->
                <li class="nav-item">
                  <a data-link href="/profile-${auth.currentUser.uid}" class="nav-item-link">
                  <img class="nav-item-profile-img" src="${avatar}"/>
                    
                    <span class="nav-item-text">Profile</span>
                  </a>
                </li>

                <!-- More -->
                <li class="nav-item hidden">
                  <a data-link  class="nav-item-link">
                    <span class="material-symbols-outlined nav-item-icon"
                      >more_horiz</span
                    >
                    <span class="nav-item-text">More</span>
                  </a>
                </li>
              </ul>
            </nav>`;

  return convertHTMLToDOMNode(nav);
};
