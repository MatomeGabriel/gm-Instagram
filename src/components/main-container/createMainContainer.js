import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";

const createContentSection = () => {
  return `<section id="js__content-section" class="content-section">
  <div id="js__story" class="story"></div>
  <div id="js__posts" class="posts"></div>
  </section>`;
};

const createFollowSection = () => {
  return `<section id="js__follow-section" class="follow-section"></section>`;
};

export const createMainContainer = () => {
  const contentSection = createContentSection();
  const followSection = createFollowSection();
  const mainContainerHtml = `<div id="js__main-container" class="main-container">
  ${contentSection}
  ${followSection}
  </div>`;

  const mainContainerNode = convertHTMLToDOMNode(mainContainerHtml);
  return mainContainerNode;
};

export const createMain = () => {
  const mainHtml = `<main id="js__main" class="main"></main>`;
  const mainNode = convertHTMLToDOMNode(mainHtml);
  return mainNode;
};

export const createAside = () => {
  const asideHtml = ` <aside id="js__aside" class="sidebar"></aside>`;
  const asideNode = convertHTMLToDOMNode(asideHtml);
  return asideNode;
};
