import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";

export const createAddPostModal = () => {
  const addPostModal = `<div id="js__add-post-modal" class="add-post-modal">
        <div class="add-post-modal-img-box">
          <img id="js__add-post-modal-img" class="add-post-modal-img" src="" alt="" />
        </div>
        <div class="add-post-modal-text-box">
          <h3>Add Post Content</h3>
          <textarea id="js__add-post-modal-textarea" name="" id=""></textarea>
          <div class="add-post-modal-btn-group">
            <button
              id="js__add-post-img-btn"
              class="btn add-post-modal-btn add-btn">
              <span class="material-symbols-outlined icon">
                add_photo_alternate
              </span>
            </button>
            <input type="file" id="js__add-file-img-input-upload" accept="image/*" style="display: none;">
            <button id="js__upload-post-img-btn" class="btn add-post-modal-btn">
              <span class="material-symbols-outlined icon"> cloud </span>Upload
            </button>
          </div>
        </div>
      </div>`;

  return convertHTMLToDOMNode(addPostModal);
};
