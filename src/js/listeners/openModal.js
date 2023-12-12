export function openModal(selector) {
  console.log("click");
  // JavaScript (assuming you have a separate JavaScript file)
  document.getElementById(selector).classList.remove("hidden");
  document.getElementById(selector).classList.add("flex");
}
