import verifiedIcon from "../../assets/verifiedIcon.svg";

export const createProfileUsername = (postUser) => {
  const { isVerified, username, id } = postUser;
  const isVerifiedImg = isVerified
    ? ` <img src="${verifiedIcon}" alt="" />`
    : "";

  return `<div class="profile-username-container">
              <a href="profile-${id}" class="profile-username">
          ${username}
              </a>
              <span class="profile-username-text"></span>
              ${isVerifiedImg}
            </div>`;
};
