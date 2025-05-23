import { auth } from "../firebase/config";
import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";
import state from "../state/state";
import { createUserProfile } from "./createUserProfile";

const createSuggestedText = () => {
  return `<div class="suggested-texts">
                    <span class="suggested-text">Suggested for you</span>
                   
                  </div>`;
};
const createProfiles = () => {
  let added = ``;
  const usersToFollow = state.users
    .filter((user) => !user.followers.includes(auth.currentUser.uid))
    .filter((user) => user.id !== auth.currentUser.uid);

  const FiveUsersToFollow =
    usersToFollow.length > 5 ? usersToFollow.slice(0, 5) : usersToFollow;

  FiveUsersToFollow.forEach((user) => {
    added += createUserProfile({
      ...user,
      avatarSize: "--sm",
      diffId: true,
    }).outerHTML;
  });
  return added;
};
const createSuggestedProfiles = () => {
  const profiles = createProfiles();
  return `  <div class="suggested-profiles">${profiles}</div>`;
};

export const createSuggestedFollow = () => {
  const suggestedText = createSuggestedText();
  const suggestedProfiles = createSuggestedProfiles();
  const suggestedFollow = `<section id="js__suggested" class="suggested">
                  ${suggestedText}
${suggestedProfiles}
                  
                  
                </section>`;

  return convertHTMLToDOMNode(suggestedFollow);
};
