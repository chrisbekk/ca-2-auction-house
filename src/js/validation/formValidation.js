import { emailValidation } from "./emailValidation.js";
import { usernameValidation } from "./usernameValidation.js";
export function formValidation(form) {
  const currentForm = document.getElementById(form);
  const inputs = currentForm.querySelectorAll("input");
  inputs.forEach((input) => {
    input.addEventListener("change", () => {
      if (input.type === "email") {
        if (!emailValidation(input.value.trim())) {
          input.classList.remove("border-gray-300");
          input.classList.add("border-red-400");
        } else {
          input.classList.add("border-gray-300");
          input.classList.remove("border-red-400");
        }
      } else if (input.id === "username") {
        if (!usernameValidation(input.value.trim())) {
          input.classList.remove("border-gray-300");
          input.classList.add("border-red-400");
        } else {
          input.classList.add("border-gray-300");
          input.classList.remove("border-red-400");
        }
      } else if (input.type === "password") {
        if (input.minLength > input.value.trim().length) {
          input.classList.remove("border-gray-300");
          input.classList.add("border-red-400");
        } else {
          input.classList.add("border-gray-300");
          input.classList.remove("border-red-400");
        }
      }
      if (input.value === "") {
        input.classList.add("border-gray-300");
        input.classList.remove("border-red-400");
      }
    });
  });
}
