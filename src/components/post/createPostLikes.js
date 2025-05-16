import state from "../../state/state";

export const createPostLikes = (postState) => {
  const { likes } = postState.postData;
  const likedBy = state.users.find((user) => user.id === likes[0]);

  let postLikes =
    likes.length < 10
      ? `<p class="sm-normal-text">
              Liked by <a href="/profile-${likedBy?.id}" class="generic-link" href="">${likedBy?.username}</a> and
              <button class="btn btn--semibold">others</button>
            </p>`
      : `<button class="btn btn--semibold">${likes.length} likes</button>`;

  postLikes = likes.length > 0 ? postLikes : "";
  return `<section class="post-likes">
     ${postLikes}
  </section>`;
};
