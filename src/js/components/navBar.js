import { isAuth } from "../auth/isAuth.js";
import { logout } from "../listeners/logout.js";
import { openModal } from "../listeners/openModal.js";
const loginHTML = `
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none" 
        viewBox="0 0 24 24" 
        stroke-width="1.5" 
        stroke="currentColor" 
        class="w-6 h-6">
        <path 
            stroke-linecap="round" 
            stroke-linejoin="round" 
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15M12 9l-3 3m0 0l3 3m-3-3h12.75" />
    </svg>
    <p class="px-4 font-mono">Login</p>
`;

const logoutHTML = `
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="w-6 h-6 group-hover:text-cyan-400 translate">
        <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M15.75 9V5.25A2.25 2.25 0 0013.5 3h-6a2.25 2.25 0 00-2.25 2.25v13.5A2.25 2.25 0 007.5 21h6a2.25 2.25 0 002.25-2.25V15m3 0l3-3m0 0l-3-3m3 3H9"/>
    </svg>
    <p class="px-4 font-mono">Logout</p>
`;

export function loginButton() {
  const loginButton = document.getElementById("open-login-modal");
  const profileLink = document.querySelector("[data-status]");
  if (!isAuth()) {
    loginButton.innerHTML = loginHTML;
    profileLink.dataset.status = "false";
    loginButton.addEventListener("click", () => {
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
  } else {
    loginButton.innerHTML = logoutHTML;
    profileLink.dataset.status = "true";
    loginButton.addEventListener("click", logout);
  }
}

loginButton();
