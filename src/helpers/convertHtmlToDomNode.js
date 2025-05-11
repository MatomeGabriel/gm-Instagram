// const convert// // Convert our html string to a DOM node
const convertHTMLToDOMNode = (htmlString) => {
  const template = document.createElement("template");
  template.innerHTML = htmlString.trim();
  return template.content.firstElementChild;
};

export default convertHTMLToDOMNode;
