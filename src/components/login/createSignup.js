import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";
import instagramImg from "../../assets/instagram.svg";

export const createSignup = () => {
  const signupFormHtml = `<div id="js__login" class="login">
      <div id="js__login-container" class="login-form-container">
        <header class="login-header">
          <img
            class="login-header-img"
            src="${instagramImg}"
            alt="" />
          <h4 class="md-semibold-text login-header-text">
            Sign up to see photos and videos from your friends.
          </h4>
          <button disabled class="btn btn-full login-btn">Login with something</button>
        </header>

        <div class="login-divider">
          <div class="devider"></div>
          <div class="login-divider-text">OR</div>
          <div class="devider"></div>
        </div>

        <form id="js__login-form" action="" class="login-form">
          <div class="login-form-input-group">
            <input name="email" autocomplete="email" required id="js__input-email" type="email" placeholder="Email" />
            <input required autocomplete="current-password"
              id="js__input-password"
              type="password"
              placeholder="Password" />
            <input autocomplete="name" required id="js__input-name" type="text" placeholder="Name" />
            <input id="js__input-username" type="text" placeholder="username" />
            <span>please note a username will be generated based on the username or email if username is not provided.</span>
          </div>
          <footer class="form-footer">
            <p class="login-form-footer-text">
              People who use our service may have uploaded your contact
              information to Instagram.
              <a href="#">Learn More</a><br />
              By signing up, you agree to our
              <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and
              <a href="#">Cookies Policy</a>.
            </p>
            <button type="submit" id="js__signup-btn" class="btn btn-full login-btn">Sign up</button>
          </footer>
        </form>
      </div>

      <div class="signup-box">
            <span>Have an Account <a class="generic-link" href="/login">SLogin in now</a></span>
        </div>
    </div>`;

  const signupFormNode = convertHTMLToDOMNode(signupFormHtml);

  return signupFormNode;
};
