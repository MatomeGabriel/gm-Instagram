import { posts, users } from "./mockInstagramData";

const state = {
  currentUser: {
    id: "user4",
    username: "user_4",
    name: "User 1",
    bio: "Bio of user 1",
    avatar: "https://i.pravatar.cc/150?img=1",
    followers: ["user6", "user2", "user17", "user19"],
    following: ["user17", "user14"],
    bookmarks: ["post1", "post5", "post10"],
  },
  users: [],
  posts: [],
};

state.users = users;
state.posts = posts;

export default state;
