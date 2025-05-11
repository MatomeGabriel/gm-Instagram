import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";

export const createOverlay = () => {
  const modal = `<div id="js__overlay" class="overlay"></div>`;
  return convertHTMLToDOMNode(modal);
};
