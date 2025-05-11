import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";
import { getUserPosts } from "../state/manageState";

import cameraImg from "../assets/camera.svg";
const createProfilePageHeader = (user) => {
  const { id, avatar, username, followers, following, name, bio } = user;
  const posts = getUserPosts(id);
  return `<header id="js__profile-page-header" class="profile-page-header">
              <section class="profile-page-avatar-box">
                <button id="js__profile-page-upload-btn" class="btn btn-profile-page-upload">
                  <img
                    class="profile-page-img"
                    src="${avatar}"
                    alt="${username}" />

                  <img
                    src="${cameraImg}"
                    alt=""
                    class="profile-page-hover-icon" />
                </button>
                <input type="file" id="js__file-input-upload" accept="image/*" style="display: none;">
              </section>
              <section class="profile-page-user-detail">
                <span class="profile-page-username">${username}</span>
                <button class="btn btn-profile-page">Edit profile</button>
                <button class="btn btn-profile-page">View archive</button>
                <button class="btn">Settings</button>
              </section>
              <section class="profile-page-stats-detail">
                <div class="profile-page-stat">
                  <span class="number">${posts?.length}</span>
                  <span class="profile-page-stat-text">Posts</span>
                </div>
                <div class="profile-page-stat">
                  <span class="number">${followers?.length}</span>
                  <button class="btn profile-page-stat-text">Followers</button>
                </div>
                <div class="profile-page-stat">
                  <span class="number">${following?.length}</span>
                  <button class="btn profile-page-stat-text">Following</button>
                </div>
              </section>
              <section class="profile-page-name-detail">
                <div class="profile-page-name">${name}</div>
                <div class="profile-page-bio">${bio}</div>
              </section>
            </header>`;
};

const createProfilePagePostRow = () => {
  return ` <div class="profile-page-posts-row"><div>`;
};
const createProfilePost = () => {
  return `<button id="js__profile-page-post-btn" class="btn profile-page-post-btn rel">
                  <img
                    class="profile-page-post-img"
                    src="https://images.unsplash.com/photo-1564410267841-915d8e4d71ea?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    alt="" />

                  <div class="abs-center">
                    <div class="stats">
                      <div class="stat">
                        <img
                          src="/public/img/camera.svg"
                          alt=""
                          class="post-stat-img" />
                        <span class="post-stat-text">10</span>
                      </div>
                      <div class="stat">
                        <img
                          src="/public/img/camera.svg"
                          alt=""
                          class="post-stat-img" />
                        <span class="post-stat-text">10</span>
                      </div>
                    </div>
                  </div>
                </button>`;
};
const createProfilePagePosts = () => {
  const profilePostRow = createProfilePagePostRow();
  return `<div class="profile-page-posts"></div>`;
};

const createProfilePageTabs = () => {
  return `<div class="profile-page-tabs">
              <button class="btn profile-page-tab-btn active">
                <img src="/public/img/Grid.svg" alt="" />
                <span>Posts</span>
              </button>
              <button class="btn profile-page-tab-btn">
                <img src="/public/img/bookmark.svg" alt="" />
                <span>Saved</span>
              </button>
              <button class="btn profile-page-tab-btn">
                <img src="/public/img/Tag.svg" alt="" />
                <span>Tagged</span>
              </button>
            </div>`;
};
export const createProfilePage = (user, urlUserId) => {
  console.log(user.id === urlUserId);
  //    {
  //     id: uid,
  //     username: username,
  //     name: displayName,
  //     bio: "Write something cool about yourself!",
  //     avatar: `${avatarImg}`,
  //     followers: [],
  //     following: [],
  //     bookmarks: [],
  //     isVerified: isVerified,
  //     email: email,
  //   };
  //   1. see if the current user has a right to chnage things
  const { avatar, bio, id, username, name, isVerified } = user;
  const profileHeader = createProfilePageHeader(user);
  const profileTabs = createProfilePageTabs();

  const profilePosts = createProfilePagePosts();

  const profilePageHtml = ` <div class="profile-page">
            ${profileHeader}
            ${profileTabs}
          </div>`;

  const profilePageNode = convertHTMLToDOMNode(profilePageHtml);

  return profilePageNode;
};
