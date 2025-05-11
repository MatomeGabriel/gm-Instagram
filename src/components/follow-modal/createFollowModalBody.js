export const createFollowModalBody = () => {
  return `<div class="modal-body">
        <div class="modal-followers">
          <div class="profile">
            <div class="profile-details">
              <a href="#" class="profile-avatar-container --md">
                <img
                  class="profile-avatar"
                  src="./public/img/Avatar.svg"
                  alt="" />

                <img
                  class="profile-avatar-reel"
                  src="./public/img/Avatar-warepper-colorful.svg"
                  alt="" />
              </a>

              <div class="profile-username-container">
                <a href="" class="profile-username">username</a>
                <span class="profile-username-text"></span>
                <img src="./public/img/Verified-icon.svg" alt="" />
              </div>
              <div class="profile-dot">&middot;</div>
              <div class="profile-datetime-container">
                <time datetime="" class="profile-datetime">3d</time>
              </div>
            </div>
            <div class="profile-dot">&middot;</div>
            <div class="profile-label-container">
              <button class="btn btn-blue profile-label">Follow</button>
            </div>
            <script type="module" src="/src/test.js"></script>
          </div>
        </div>
      </div>`;
};
