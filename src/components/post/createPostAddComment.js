import inputIcon from "../../assets/input.svg";

export const createPostAddComments = () => {
  return `<section class="post-add-comment">
    <input
      type="text"
      class="post-add-comment-input"
      placeholder="Add a comment"
    />
    <button class="btn post-add-comment-icon">
      <img src="${inputIcon}" alt="" />
    </button>
  </section>`;
};
