import convertHTMLToDOMNode from "../helpers/convertHtmlToDomNode";

export const createProfilePageModal = () => {
  const profilePageModal = `<div id="js__profile-page-modal" class="modal-profile-page">
    <div class="modal-profile">
      <h3>Change profile</h3>

      <div class="textarea-group">
        <label for="js__profile-page-textarea">Bio</label>
        <textarea
          class="modal-profile-text-area"
          name=""
          id="js__profile-page-textarea"></textarea>
      </div>

      <button id="js__modal-profile-page-submit-btn" class="btn modal-profile-page-btn">Submit</button>
      <button id="js__modal-profile-page-close-btn" class="btn btn-absolute">
        &times;
      </button>
    </div>
  </div>`;

  return convertHTMLToDOMNode(profilePageModal);
};
