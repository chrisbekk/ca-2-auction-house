import { signInUser } from "../api/signInUser.js";
import { formErrorMessage } from "../errors/formErrorMessage.js";
import { setItem } from "../storage/setItem.js";
export async function logIn() {
  const email = document.getElementById("login-email");
  const password = document.getElementById("login-password");

  try {
    const response = await signInUser({
      email: email.value,
      password: password.value,
    });
    setItem("user", response);
    localStorage.setItem("token", response.accessToken);
    window.location.href = "/profile.html";
  } catch (error) {
    // Handle Error Messages from server
    console.log(error.data);
    const { errors, statusCode } = error.data;
    const feedback = document.getElementById("login-feedback");
    if (statusCode === 400) {
      feedback.textContent = "Please provide a valid email or password";
    }
    if (statusCode === 401) {
      feedback.textContent = "Invalid email or password. Please try again.";
    }
  }
}
