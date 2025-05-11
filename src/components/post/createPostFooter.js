import { createPostAddComments } from "./createPostAddComment";
import { createPostInfo } from "./createPostInfo";
import { createPostInteractions } from "./createPostInteractions";
import { createPostLikes } from "./createPostLikes";
import { createPostViewComments } from "./createPostViewComments";

export const createPostFooter = (postState) => {
  const { postUser } = postState;

  const postInteractions = createPostInteractions(postState);
  const postLikes = createPostLikes(postState);
  const postInfo = createPostInfo(postState);
  const postViewComments = createPostViewComments(postState);
  const postAddComment = createPostAddComments();
  return `<footer class="post-footer">
    ${postInteractions}
    ${postLikes}
    ${postInfo}
    ${postViewComments}
    ${postAddComment}
  </footer>`;
};
