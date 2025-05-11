import { createProfileUsername } from "./createProfileUsername";

export const createPostInfo = (postState) => {
  const { postUser, postData } = postState;
  const profileUsername = createProfileUsername(postUser);

  return `<section class="post-info">
    <div class="post-info-content">
      ${profileUsername}
      <span class="sm-normal-text">
        ${postData?.caption}
      </span>
    </div>
  </section>`;
};
