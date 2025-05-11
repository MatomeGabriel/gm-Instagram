import convertHTMLToDOMNode from "../../helpers/convertHtmlToDomNode";

const createLoginHeader = (formType) => {
  const loginHeader =
    formType === "isLogin"
      ? `<img
              class="login-header-img"
              src="./public/img/instagram.svg"
              alt="" />`
      : `<img
              class="login-header-img"
              src="./public/img/instagram.svg"
              alt="" />
            <h4 class="md-semibold-text login-header-text">
              Sign up to see photos and videos from your friends.
            </h4>
            <button class="btn btn-full login-btn">Login with something</button>`;

  return ` <header class="login-header">
            ${loginHeader}
          </header>`;
};

const createLoginDivider = () => {
  return `<div class="login-divider">
            <div class="devider"></div>
            <div class="login-divider-text">OR</div>
            <div class="devider"></div>
          </div>`;
};

const createFormFooter = (formType) => {
  const text = formType === "isLogin" ? "Login" : "Signup";
  const formFooter =
    formType === "isLogin"
      ? `<button class="btn btn-full login-btn">Sign up</button>`
      : `<p class="login-form-footer-text">
                People who use our service may have uploaded your contact
                information to Instagram.
                <a href="#">Learn More</a><br />
                By signing up, you agree to our
                <a href="#">Terms</a>, <a href="#">Privacy Policy</a> and
                <a href="#">Cookies Policy</a>.
              </p>
              <button class="btn btn-full login-btn">${text}</button>`;

  return `<footer class="form-footer">
              ${formFooter}
            </footer>`;
};
const createInputNameAndUsername = () => {
  return `<input id="js__input-name" type="text" placeholder="Name" />
              <input id="js__input-username" type="text" placeholder="username" />`;
};

const createLoginForm = (formType) => {
  const formFooter = createFormFooter(formType);
  const inputNameAndUsername =
    formType === "isLogin" ? createInputNameAndUsername() : "";

  return `<form action="" class="login-form">
          <div class="login-form-input-group">
            <input id="js__input-email" type="email" placeholder="Email" />
            <input
              id="js__input-password"
              type="password"
              placeholder="Password" />
            ${inputNameAndUsername}
          </div>
          ${formFooter}
        </form>`;
};

export const createLogin = (formType = "isLogin") => {
  const isLogin = formType;
  const loginHeader = createLoginHeader(isLogin);
  const loginDivider = createLoginDivider();
  const loginForm = createLoginForm(isLogin);
  const loginFormHtml = `<div id="js__login" class="login"><div class="login-form-container">
  ${loginHeader}
  ${formType === `isLogin` ? loginForm : loginDivider}
  </div></div>`;

  const loginFormNode = convertHTMLToDOMNode(loginFormHtml);

  return loginFormNode;
};
