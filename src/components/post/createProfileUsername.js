import verifiedIcon from "../../assets/verifiedIcon.svg";

export const createProfileUsername = (postUser) => {
  const { username } = postUser;
  return `<div class="profile-username-container">
              <a href="" class="profile-username">
          ${username}
              </a>
              <span class="profile-username-text"></span>
              <img src="${verifiedIcon}" alt="" />
            </div>`;
};
