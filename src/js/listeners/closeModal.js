export function closeModal(selector) {
  const inputs = document.querySelectorAll("input");
  inputs.forEach((input) => {
    input.classList.remove("border-red-400");
    input.classList.add("border-grey-300");
  });
  document.getElementById(selector).classList.add("hidden");
  document.getElementById("error-messages").innerHTML = "";
  document.querySelectorAll("form").forEach((f) => f.reset());
}
