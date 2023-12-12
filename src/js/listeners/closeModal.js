export function closeModal(selector) {
  document.getElementById(selector).classList.add("hidden");
  document.getElementById("error-messages").innerHTML = "";
  document.querySelectorAll("form").forEach((f) => f.reset());
}
