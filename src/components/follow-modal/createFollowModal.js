import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";
import { createFollowModalHeader } from "./createFollowModalHeader";

export const createFollowModal = () => {
  const modalHeader = createFollowModalHeader();

  const followModalHtml = `<div class="follow-modal js__follow-modal">
  ${modalHeader}
  </div>`;

  return convertHTMLToDOMNode(followModalHtml);
};
