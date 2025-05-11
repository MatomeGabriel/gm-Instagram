import { formatDistanceToNow } from "date-fns";

import verifiedIcon from "../../assets/verifiedIcon.svg";
import avatarImg from "../../assets/avatar.svg";
import avatarWrapperRedImg from "../../assets/avatarWrapperRed.svg";
import { createProfileUsername } from "./createProfileUsername";

const getTimeAgo = (timestamp) => {
  const timePast = new Date(timestamp);
  return formatDistanceToNow(timePast, { addSuffix: true });
};
export const createPostHeader = (postState) => {
  const { postUser, isCurrentUserFollowing, postData } = postState;
  const { avatar } = postUser;
  const { timestamp } = postData;
  const postUsername = createProfileUsername(postUser);

  const isUserFollowing = isCurrentUserFollowing
    ? ""
    : `<div class="profile-dot js__follow-dot js__post-follow-dot-${postData.id}">&middot;</div>
      <div  class="profile-label-container js__post-follow-container-${postData.id}">
        <button class="btn btn-blue profile-label js__post-follow-btn js__post-follow-btn-${postData.id}">Follow</button>
      </div>`;

  // What we need
  // 1. username & link to username, & username text
  //   2. post data for the username
  //   3. the current user
  return `<header class="post-header">
    <div class="profile profile--has-reel">
      <div class="profile-details">
        <a href="#" class="profile-avatar-container --sm">
          <img class="profile-avatar" src="${avatar}" alt="" />

          <img
            class="profile-avatar-reel"
            src="${avatarWrapperRedImg}"
            alt=""
          />
        </a>

        ${postUsername}
        
        <div class="profile-dot">&middot;</div>
        <div class="profile-datetime-container">
          <time datetime="" class="profile-datetime">
            ${getTimeAgo(timestamp)}
          </time>
        </div>
      </div>
      ${isUserFollowing}
      
    </div>

    <button class="btn">
      <img src="./public/img/more-1.svg" alt="" />
    </button>
  </header>`;
};
