import { rotateElement } from "./listeners/rotateElement.js";
import { toggleNav } from "./listeners/toggleNav.js";
import { userState } from "./auth/isAuth.js";
import { openModal } from "./listeners/openModal.js";
import { closeModal } from "./listeners/closeModal.js";
import { getItem } from "./storage/getItem.js";
import { setItem } from "./storage/setItem.js";
import { signUp } from "./listeners/signUp.js";
import { searchListings } from "./listeners/searchListings.js";
const navButton = document.getElementById("nav-button");
navButton.addEventListener("click", toggleNav);

const heroWrapper = document.getElementById("hero-wrapper");
document.addEventListener("mousemove", (e) => {
  rotateElement(e, heroWrapper);
});

const openLoginBtn = document.getElementById("open-login-modal");
openLoginBtn.addEventListener("click", () => openModal("login-modal"));

const closeLoginBtn = document.getElementById("close-login-modal");
closeLoginBtn.addEventListener("click", () => closeModal("login-modal"));

const loginModalOverlay = document.getElementById("login-modal");
loginModalOverlay.addEventListener("click", (e) => {
  if (e.target === e.currentTarget) {
    closeModal("login-modal");
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

// Test user state functionality
//setItem('token', 'token')

const searchButton = document.getElementById("search-button");
searchButton.addEventListener("click", searchListings);
