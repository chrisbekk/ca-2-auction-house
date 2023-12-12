export function validateForm(selector) {
  const form = document.getElementById(selector);
  const inputs = form.querySelectorAll("input");
  inputs.forEach((input) => {
    if (input.required) {
      const value = input.value.trim();
      if (value === "") {
        input.classList.add("border-red-400");
      }
    }
  });
}
