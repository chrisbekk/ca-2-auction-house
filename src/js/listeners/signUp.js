import { register } from "../api/register.js";
import { registerSuccess } from "../components/registerSuccess.js";
import { formErrorMessage } from "../errors/formErrorMessage.js";
export async function signUp(e) {
  e.preventDefault();
  try {
    const form = document.getElementById("register-form");
    const name = document.getElementById("username");
    const email = document.getElementById("email");
    const password = document.getElementById("password");
    const avatar = document.getElementById("avatar");

    const userData = {
      name: name.value,
      email: email.value,
      password: password.value,
      avatar: avatar.value,
    };

    const responseData = await register(userData);
    console.log(responseData);
    registerSuccess();
    form.reset();
  } catch (error) {
    const errorMessage = document.getElementById("error-messages");
    console.log(error);
    errorMessage.innerHTML = "";
    const { status, data } = error;

    data.errors.forEach((error) => {
      const { message } = error;
      console.log(message);

      errorMessage.append(formErrorMessage(message));
    });
  }
}
