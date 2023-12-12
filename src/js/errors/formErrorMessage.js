export function formErrorMessage(error) {
  const errorMessage = document.createElement("li");
  errorMessage.classList.add("text-red-400", "text-sm");
  errorMessage.textContent = error;
  return errorMessage;
}
