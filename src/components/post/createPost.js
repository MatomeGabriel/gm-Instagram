// create a post

import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";
import state from "../../state/state";
import { createPostBody } from "./createPostBody";
import { createPostFooter } from "./createPostFooter";
import { createPostHeader } from "./createPostHeader";

import { auth } from "../../firebase/config";

const createPost = (postData) => {
  const { currentUser } = state;
  // 1. the user that the current post belongs to
  const postUser = state.users.find((user) => user.id === postData.userId);
  const { likes } = postData;
  // const { followers } = postUser;

  // 2. find if the current users is a follower of the current postUser

  // the current user contains the id of the post

  // is following

  // 2 things to do here

  // 1. get the post user and see if the current user
  const userId = state.posts.find((post) => postData.id === post.id).userId;
  const { followers } = state.users.find((user) => user.id === userId);

  // const iscurrentuserFollowing
  const isCurrentUserFollowing =
    followers.includes(currentUser.id) &&
    currentUser.following?.includes(userId);
  const isCurrentPostLiked = likes.includes(currentUser.id);
  const isCurrentPostBookmarked = currentUser.bookmarks?.includes(postData.id);

  const postState = {
    postData,
    postUser,
    isCurrentPostBookmarked,
    isCurrentPostLiked,
    isCurrentUserFollowing,
  };

  const postHeader = createPostHeader(postState);
  const postBody = createPostBody(postState);
  const postFooter = createPostFooter(postState);

  const post = `<article id="js__${postData.id}" data-post-id="${postData.id}" class="post js__post">
    ${postHeader}
    ${postBody}
    ${postFooter}
    </article>`;

  const postNodeCopy = convertHTMLToDOMNode(post).cloneNode(true);
  // returns a post node
  return postNodeCopy;
};

export default createPost;
