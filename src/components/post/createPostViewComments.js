export const createPostViewComments = (postState) => {
  const { comments } = postState.postData;
  const postComments =
    comments.length > 0
      ? ` <button class="btn post-comments">View all ${comments?.length} comments</button>`
      : "";
  return `<section class="post-view-comments">
   ${postComments}
  </section>`;
};
