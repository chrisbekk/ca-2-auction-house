export function registerSuccess() {
  const errorMessage = document.getElementById("error-messages");
  console.log(errorMessage);
  errorMessage.innerHTML = "";
  errorMessage.innerHTML = `<li class="text-green-400 text-md">Successful registration. Close this window, and login to join the auction!</li>`;
}
