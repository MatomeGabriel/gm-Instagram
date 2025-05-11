import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";
import reelRedImg from "../assets/avatarWrapperRed.svg";
import verifiedImg from "../assets/verifiedIcon.svg";

export const createUserProfile = (user) => {
  const {
    id,
    username,
    name,
    avatar,
    hasReel,
    avatarSize,
    isVerified,
    curUser,
  } = user;

  const btnLabel = curUser ? "Switch" : "Follow";
  const reel = hasReel
    ? `<img
                  class="profile-avatar-reel"
                  src="${reelRedImg}"
                  alt="" />`
    : "";

  const href = `profile-${id}`;
  const verified = isVerified ? `<img src="${verifiedImg}" alt="" />` : "";
  const profileHtm = `<div id="js__profile" data-use-id="${id}" class="profile">
            <div  class="profile-details">
              <a href="${href}" class="profile-avatar-container ${avatarSize}">
                <img
                  class="profile-avatar"
                  src="${avatar}"
                  alt="${username}" />
                  ${reel}
              </a>

              <div class="profile-username-container">
                <a href="${href}" class="profile-username">${username}</a>
                <span class="profile-username-text">${name}</span>
                ${verified}
              </div>
              <div class="profile-dot">&middot;</div>
              <div class="profile-datetime-container">
                <time datetime="" class="profile-datetime">3d</time>
              </div>
            </div>
            <div class="profile-dot">&middot;</div>
            <div class="profile-label-container">
              <button data-can-follow="${btnLabel}" class="btn btn-blue profile-label">${btnLabel}</button>
            </div>
          </div>`;

  const profileNode = convertHTMLToDOMNode(profileHtm);

  return profileNode;
};
