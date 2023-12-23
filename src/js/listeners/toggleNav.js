export function toggleNav() {
  const navMenu = document.getElementById("nav-menu");
  if (navMenu.classList.contains("hidden")) {
    navMenu.classList.remove("hidden");
  } else {
    navMenu.classList.add("hidden");
  }
  window.addEventListener("resize", () => {
    if (window.innerWidth > 767) {
      navMenu.classList.add("hidden");
    }
  });
}
