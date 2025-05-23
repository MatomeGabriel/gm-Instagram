import jsClasses from "../state/jsClasses";

const buildPostHeader = (postData, user) => {
  const { username, name, avatar } = user;
  const { timestamp } = postData;
  return `<div class="post-header">
                <a href="#" class="avatar avatar-only">
                    <div
                        class="avatar-img-box avatar-img-box--sm avatar-img-box-wrapper--md">
                        <img
                        src=${avatar}
                        alt="avatar"
                        class="avatar-img" />
                        <img
                        class="avatar-img-wrapper"
                        src="./img/Avatar-warepper-colorful.svg"
                        alt="" />
                    </div>
                    <span class="avatar-text"></span>
                </a>
                      <div class="post-header-info">
                        <div class="post-header-info-right">
                          <div class="post-header-info-top">
                            <a href="" class="user link js_user">
                              <span class="user-text">${username}</span>
                              <img src="./img/Verified-icon.svg" alt="" />
                            </a>
                            <span class="post-dot">&bull;</span>
                            <div class="post-date">9w</div>
                            <span class="post-dot">&bull;</span>
                            <button class="btn btn-blue">Follow</button>
                          </div>
                          <div class="post-header-info-bottom"></div>
                        </div>
                        <div class="post-header-info-left">
                          <img src="./img/more-1.svg" alt="" />
                        </div>
                      </div>
        </div>`;
};

const buildPostContent = ({ image }) => {
  return `<section class="post-content">
                <img
                src=${image}
                alt=""
                class="post-content-img" />
            </section>`;
};

const buildPostInfo = (postData, user, currentUser) => {
  const { comments, likes, id } = postData;
  const { username, id: userId } = user;

  // need correct implementation, ensure user is the current user
  const userLiked = Boolean(
    likes.find((likedId) => currentUser.id === likedId)
  );

  const userBookmarked = Boolean(
    currentUser.bookmarks.find((postId) => postId === id)
  );

  return `<div class="post-info">
                      <section class="post-info-icons">
                        <div class="post-info-icons-box-1">
                          <button data-post-id="${id}" class="btn js_btn-like ${
    userLiked ? jsClasses.jsBtnLiked : ""
  }">

                            <img
                              src="./img/like.svg"
                              alt=""
                              class="post-info-icon js_like" />

                              <img
                              src="./img/liked.svg"
                              alt=""
                              class="post-info-icon js_liked" />

                          </button>
                          <button class="btn js_btn-chat">
                            <img
                              src="./img/chat.svg"
                              alt=""
                              class="post-info-icon" />
                          </button>
                          <button class="btn">
                            <img
                              src="./img/send.svg"
                              alt=""
                              class="post-info-icon" />
                          </button>
                        </div>
                        <div class="post-info-icons-box-2">
                          <button class="btn js_btn-bookmark ${
                            userBookmarked ? jsClasses.jsBtnBookmarked : ""
                          } ">
                          
                            <img
                              src="./img/bookmark.svg"
                              alt=""
                              class="post-info-icon js_bookmark" />
                            <img
                              src="./img/bookmarked.svg"
                              alt=""
                              class="post-info-icon js_bookmarked" />
                          </button>
                        </div>
                      </section>
                      
                      ${
                        likes.length
                          ? `<div class="post-likes">
                        <span class="post-likes-content">${likes.length} Likes</span>
                      </div>`
                          : ""
                      }
                      
                      <div class="post-user">
                        <span class="post-user-link">
                          <a href="" class="user link js_user">
                            <span class="user-text">${username}</span>
                            <img src="./img/Verified-icon.svg" alt="" />
                          </a>
                        </span>
                        <span class="post-user-content">
                          You bring the vision, Shopify gives you the tools you
                          need to turn that idea into a success! Start Free
                          Trial today.
                        </span>
                      </div>
                      ${
                        comments.length
                          ? `<div class="post-view-comments">
                        <button class="btn post-comments">
                          View all ${comments.length} comments
                        </button>
                      </div>`
                          : ""
                      }
                      
                      <div class="post-add-comment">
                        <input
                          placeholder="Add comment..."
                          type="text"
                          class="post-add-comment-input" />
                        <img
                          class="post-add-comment-icon"
                          src="./img/input.svg"
                          alt="" />
                      </div>
            </div>`;
};

const buildPostTemplate = (postData, users, currentUser) => {
  const { userId, id } = postData;
  // 1. find the user of the post
  const user = users.find((user) => userId === user.id);

  // 3. for this post find a user who bookmarked it
  // 3.1 so find a user in which in their bookmarks the current post exist
  // 3.2 find a currentUser in whihc in their bookmarks the current pot exist

  return `<div data-post-id="${id}" class="post js_post">${
    buildPostHeader(postData, user) +
    buildPostContent(postData, user) +
    buildPostInfo(postData, user, currentUser)
  }</div>`;
};

export default buildPostTemplate;
