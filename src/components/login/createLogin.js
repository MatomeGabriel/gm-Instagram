import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";
import instagramImg from "../../assets/instagram.svg";

export const createLogin = () => {
  const loginFormHtml = `    <div id="js__login" class="login">
      <div id="js__login-container" class="login-form-container">
        <header class="login-header">
          <img
            class="login-header-img"
            src="${instagramImg}"
            alt="" />
        </header>

        <form id="js__login-form" action="" class="login-form">
          <div class="login-form-input-group">
            <input required autocomplete="email" id="js__input-email" type="email" placeholder="Email" />
            <input
            required
            autocomplete="current-password"
              id="js__input-password"
              type="password"
              placeholder="Password" />
          </div>
          <footer class="form-footer">
            <button id="js__form-login-btn" class="btn btn-full login-btn">Login</button>
          </footer>
           <div class="login-divider">
          <div class="devider"></div>
          <div class="login-divider-text">OR</div>
          <div class="devider"></div>
        </div>

        <button class="btn btn-blue">Login with facebook</button>
        </form>

        
      </div>
        <div class="signup-box">
            <span>Don't have an account <a class="generic-link" href="/signup">Sign up now</a></span>
        </div>
      
    </div>`;

  const loginFormNode = convertHTMLToDOMNode(loginFormHtml);

  return loginFormNode;
};
