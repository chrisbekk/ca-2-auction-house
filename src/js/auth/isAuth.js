import { getItem } from "../storage/getItem.js";
export function isAuth() {
  return getItem("token") ? true : false;
}

export function userState() {
  const elements = document.querySelectorAll("[data-status]");
  if (!isAuth()) {
    elements.forEach((element) => {
      element.dataset.status = "false";
    });
  } else {
    elements.forEach((element) => {
      element.dataset.status = "true";
    });
  }
}
userState();
