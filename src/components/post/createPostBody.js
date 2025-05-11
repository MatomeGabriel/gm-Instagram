export const createPostBody = (postState) => {
  const { postData } = postState;
  return `<section class="post-body">
    <div class="post-content">
      <img
        class="post-content-img"
        src="${postData.image}"
        alt=""
      />
    </div>
  </section>`;
};
