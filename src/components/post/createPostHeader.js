import { formatDistanceToNow } from "date-fns";

import verifiedIcon from "../../assets/verifiedIcon.svg";
import moreImg from "../../assets/more.svg";
import avatarWrapperRedImg from "../../assets/avatarWrapperRed.svg";
import { createProfileUsername } from "./createProfileUsername";
import { auth } from "../../firebase/config";

const getTimeAgo = (timestamp) => {
  const timePast = timestamp.toDate();
  return formatDistanceToNow(timePast, { addSuffix: true });
};
export const createPostHeader = (postState) => {
  const { postUser, isCurrentUserFollowing, postData } = postState;
  const { avatar, id } = postUser;
  const { timestamp } = postData;

  const postUsername = createProfileUsername(postUser);

  // const
  const isUserFollowing =
    isCurrentUserFollowing || postUser.id === auth.currentUser.uid
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
        <a href="profile-${id}" class="profile-avatar-container --sm">
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
      <img src="${moreImg}" alt="" />
    </button>
  </header>`;
};
