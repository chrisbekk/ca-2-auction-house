import { rotateElement } from "./listeners/rotateElement.js";
import { toggleNav } from "./listeners/toggleNav.js";
import { userState } from "./auth/isAuth.js";
import { openModal } from "./listeners/openModal.js";
import { closeModal } from "./listeners/closeModal.js";
import { getItem } from "./storage/getItem.js";
import { setItem } from "./storage/setItem.js";
import { signUp } from "./listeners/signUp.js";
import { searchListings } from "./listeners/searchListings.js";
import { logIn } from "./listeners/logIn.js";
import { formValidation } from "./validation/formValidation.js";
import { logout } from "./listeners/logout.js";
import { register } from "./api/register.js";
const navButton = document.getElementById("nav-button");
navButton.addEventListener("click", toggleNav);

const openLoginBtn = document.getElementById("open-login-modal");
openLoginBtn.addEventListener("click", () => {
  openModal("login-modal");
  const navMenu = document.getElementById("nav-menu");
  navMenu.classList.remove("flex");
  navMenu.classList.add("hidden");
  const registerModal = document.getElementById("register-modal");
  if (registerModal.classList.contains("flex")) {
    registerModal.classList.remove("flex");
    registerModal.classList.add("hidden");
  }
});

const closeLoginBtn = document.getElementById("close-login-modal");
closeLoginBtn.addEventListener("click", () => closeModal("login-modal"));

const loginModalOverlay = document.getElementById("login-modal");
loginModalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal("login-modal");
    document.getElementById("login-feedback").innerText = "";
  } else {
    return;
  }
});

const openRegisterBtn = document.getElementById("open-register-modal");
openRegisterBtn.addEventListener("click", () => openModal("register-modal"));

const closeRegisterBtn = document.getElementById("close-register-modal");
closeRegisterBtn.addEventListener("click", () => closeModal("register-modal"));

const registerModalOverlay = document.getElementById("register-modal");
registerModalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal("register-modal");
  } else {
    return;
  }
});

const registerUserBtn = document.getElementById("register-button");
registerUserBtn.addEventListener("click", signUp);

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchListings);

const loginBtn = document.getElementById("login-button");
loginBtn.addEventListener("click", logIn);

formValidation("login-form");
formValidation("register-form");

const logoutBtn = document.getElementById("logout");
logoutBtn.addEventListener("click", logout);
