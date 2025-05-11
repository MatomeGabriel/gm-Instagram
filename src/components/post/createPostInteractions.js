import likeIcon from "../../assets/like.svg";
import likedIcon from "../../assets/liked.svg";
import chatIcon from "../../assets/chat.svg";
import shareIcon from "../../assets/send.svg";
import bookmarkIcon from "../../assets/bookmark.svg";
import bookmarkedIcon from "../../assets/bookmarked.svg";

export const createPostInteractions = (postState) => {
  const { isCurrentPostLiked, isCurrentPostBookmarked } = postState;

  const isLikedImg = isCurrentPostLiked ? likedIcon : likeIcon;
  const isBookmarkedImg = isCurrentPostBookmarked
    ? bookmarkedIcon
    : bookmarkIcon;
  return `<section class="post-interactions">
    <div class="post-interact">
      <button class="btn btn-like">
        <img src="${isLikedImg}" alt="like" />
      </button>
      <button class="btn btn-comment">
        <img src="${chatIcon}" alt="chat" />
      </button>
      <button class="btn btn-share">
        <img src="${shareIcon}" alt="share" />
      </button>
    </div>
    <div class="post-bookmark">
      <button class="btn btn-bookmark">
        <button class="btn btn-bookmark">
          <img src="${isBookmarkedImg}" alt="bookmark" />
        </button>
      </button>
    </div>
  </section>`;
};
