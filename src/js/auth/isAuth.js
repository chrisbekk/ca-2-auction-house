import { getItem } from "../storage/getItem.js";
export function isAuth() {
  return getItem("token") ? true : false;
}

export function userState() {
  const elements = document.querySelectorAll("[data-status]");
  const loginBtn = document.getElementById("open-login-modal");
  const logoutBtn = document.getElementById("logout");
  if (!isAuth()) {
    elements.forEach((element) => {
      element.dataset.status = "false";
      logoutBtn.classList.add("hidden");
    });
  } else {
    elements.forEach((element) => {
      element.dataset.status = "true";
      loginBtn.classList.add("hidden");
    });
  }
}
userState();
