import "./css/styles.css";
import state from "./state/state";
import buildPostTemplate from "./components/buildPostTemplate";
import jsClasses from "./state/jsClasses";

// Convert our html string to a DOM node
const convertHTMLToNode = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
};

// Renders Posts
const renderPosts = (state) => {
  const { posts, users, currentUser } = state;
  posts.forEach((post) => {
    // 1. build html template
    const htmlTemplate = buildPostTemplate(post, users, currentUser);
    // 2. create the node and clone it
    const clone = convertHTMLToNode(htmlTemplate).cloneNode(true);
    // 3. append our node on the posts container
    $posts.appendChild(clone);
  });
};
// Renders suggestions
const renderSuggestions = () => {};
// Renders user Stories
const renderUserStories = () => {};

// Handlers
const handleLikedPost = () => {};

const $posts = document.getElementById("posts");

const handleLike = (el) => {
  // 2. show the red heart
  const postId = el.closest(".js_btn-like").dataset.postId;
  el.closest(".js_btn-like").classList.toggle("js_btn-like--liked");
  // user clicks post -> update the state iwth use
  // use unclicks the post -> updates the state

  // 3. go through the posts, get an index of the current user under post and if it exist remove it or else add it to the post

  // DO the same for the follow
  state.posts.forEach((post) => {
    if (post.id === postId) {
      const index = post.likes.indexOf(state.currentUser.id);
      post.likes.includes(state.currentUser.id)
        ? post.likes.splice(index, 1)
        : post.likes.push(state.currentUser.id);
    }
  });
};

const handleBookmark = (el) => {
  const postId = el.closest(".js_post").dataset.postId;
  el.closest(".js_btn-bookmark").classList.toggle(
    "js_btn-bookmark--bookmarked"
  );

  const { currentUser } = state;
  state.posts.forEach((post) => {
    if (post.id === postId) {
      const index = currentUser.bookmarks.indexOf(post.id);
      currentUser.bookmarks.includes(post.id)
        ? currentUser.bookmarks.splice(index, 1)
        : currentUser.bookmarks.push(post.id);
    }
  });
};

const handleModal = () => {
  console.log("Thsi open up the modal");
};

$posts.addEventListener("click", (e) => {
  const el = e.target;
  if (el.closest(".js_btn-like")) {
    handleLike(el);
  } else if (el.closest(".js_btn-bookmark")) {
    handleBookmark(el);
  } else if (el.closest(".js_btn-chat")) {
    handleModal();
  } else if (el.closest(".js_btn-likes")) {
    console.log("Yes please finish, open likes modal");
  } else if (el.closest(".js_user")) {
    e.preventDefault();
    console.log("Open User Page");
  }
  console.log(state);

  // we already know the current user
  // if the post is clicked, we add the clcked in our our usrid inyto the liked array
  //  if not we remove it
});

renderPosts(state);
console.log(state);
