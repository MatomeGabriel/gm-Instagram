import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";
import {
  getPostsByUserId,
  getUserById,
  getUserPosts,
} from "../state/manageState";
import cameraIcon from "../assets/camera.svg";
import { auth } from "../firebase/config";

import gridIcon from "../assets/Grid.svg";
import bookmarkIcon from "../assets/bookmark.svg";
import tagIcon from "../assets/Tag.svg";
import chatIcon from "../assets/chatFilled.svg";
import likeIcon from "../assets/likeFilled.svg";
import state from "../state/state";
import { findPosts } from "../helpers/post";

const createProfilePageHeader = (userId) => {
  const user = getUserById(userId);
  const currentUseId = auth.currentUser.uid;
  const { id, avatar, username, followers, following, name, bio } = user;

  const showUpdateProfile = currentUseId === userId ? "" : "disabled";
  const showEditProfile = currentUseId === userId ? "" : "disabled";
  const logoutBtn =
    currentUseId === userId
      ? `<button id="js__profile-page-logout-btn" class="btn btn-profile-page">Logout</button>`
      : "";
  const inputUploadFile =
    currentUseId === userId
      ? `<input type="file" id="js__file-input-upload" accept="image/*" style="display: none;">`
      : "";
  const cameraImg =
    currentUseId === userId
      ? `<img src="${cameraIcon}"
                    alt=""
                    class="profile-page-hover-icon" />`
      : "";
  const posts = getPostsByUserId(id);
  return `<header id="js__profile-page-header" class="profile-page-header">
              <section class="profile-page-avatar-box">
                <button ${showUpdateProfile} id="js__profile-page-upload-btn" class="btn btn-profile-page-upload">
                  <img id="js__profile-page-img"
                    class="profile-page-img"
                    src="${avatar}"
                    alt="${username}" />

                  ${cameraImg}
                </button>
                ${inputUploadFile}
              </section>
              <section class="profile-page-user-detail">
                <span class="profile-page-username">${username}</span>
                <div class="profile-page-user-detail-btn">
                <button ${showEditProfile} id="js__profile-page-btn-edit-profile" class="btn btn-profile-page">Edit profile</button>
                ${logoutBtn}
                <button class="btn">
                <span class="material-symbols-outlined">
                    settings
                    </span>
                </button>
                </div>
                
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
                <div style="white-space: pre-wrap;" id="js__profile-page-bio" class="profile-page-bio">${bio}</div>
              </section>
            </header>`;
};

const createProfilePageBtn = (post) => {
  const { image, caption, comments, likes } = post;
  return `<button class="btn profile-page-post-btn rel">
            <img
              class="profile-page-post-img"
              src="${image}"
              alt="" />

            <div class="abs-center">
              <div class="stats">
                <div class="stat">
                  <img
                    src="${chatIcon}"
                    alt=""
                    class="post-stat-img" />
                  <span class="post-stat-text">${comments.length}</span>
                </div>
                <div class="stat">
                  <img
                    src="${likeIcon}"
                    alt=""
                    class="post-stat-img" />
                  <span class="post-stat-text">${likes.length}</span>
                </div>
              </div>
            </div>
          </button>`;
};
const createProfilePagePostRow = (userPosts) => {
  const appendedProfilePost = userPosts?.reduce(
    (acc, post) => acc + "" + createProfilePageBtn(post),
    ""
  );
  return appendedProfilePost;
};

const createProfilePagePosts = (userPosts) => {
  const profilePostRow = createProfilePagePostRow(userPosts);
  return `<div class="profile-page-posts"><div class="profile-page-posts-row">${profilePostRow}<div></div>`;
};

const createProfilePageTabs = () => {
  return `<div class="profile-page-tabs">
              <button class="btn profile-page-tab-btn active">
                <img src="${gridIcon}" alt="" />
                <span>Posts</span>
              </button>
              <button class="btn profile-page-tab-btn">
                <img src="${bookmarkIcon}" alt="" />
                <span>Saved</span>
              </button>
              <button class="btn profile-page-tab-btn">
                <img src="${tagIcon}" alt="" />
                <span>Tagged</span>
              </button>
            </div>`;
};
export const createProfilePage = (userId, urlUserId) => {
  // console.log(user.id === urlUserId);
  const userPosts = getPostsByUserId(userId);

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
  // const { avatar, bio, id, username, name, isVerified } = user;
  const profileHeader = createProfilePageHeader(userId);
  const profileTabs = createProfilePageTabs();
  const profilePosts = createProfilePagePosts(userPosts);

  const profilePageHtml = ` <div class="profile-page">
            ${profileHeader}
            ${profileTabs}
            ${profilePosts}
          </div>`;

  const profilePageNode = convertHTMLToDOMNode(profilePageHtml);

  return profilePageNode;
};
