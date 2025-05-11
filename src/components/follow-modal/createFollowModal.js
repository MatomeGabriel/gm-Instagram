import { createFollowModalHeader } from "./createFollowModalHeader";

const createFollowModal = () => {
  const modalHeader = createFollowModalHeader();

  const followModalHtml = `<div class="follow-modal js__follow-modal">
  ${modalHeader}
  </div>`;
};
