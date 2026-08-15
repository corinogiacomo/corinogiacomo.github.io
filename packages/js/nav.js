/*==================== MENU SHOW Y HIDDEN ====================*/
const navMenu = document.getElementById("nav-menu"),
  navToggle = document.getElementById("nav-toggle"),
  navClose = document.getElementById("nav-close");

if (navMenu) {
  if (navToggle) {
    navToggle.addEventListener("click", () => {
      navMenu.classList.add("show-menu");
    });
  }

  /*==================== REMOVE MENU MOBILE ====================*/
  const closers = [navClose, ...document.querySelectorAll(".nav__link")];
  closers.filter(Boolean).forEach((el) => {
    el.addEventListener("click", () => {
      navMenu.classList.remove("show-menu");
    });
  });
}

/*==================== CHANGE BACKGROUND HEADER ====================*/
window.addEventListener("scroll", () => {
  const header = document.getElementById("header");
  if (header) header.classList.toggle("scroll-header", window.scrollY >= 80);
});

/*==================== SHOW SCROLL UP ====================*/
window.addEventListener("scroll", () => {
  const scrollUp = document.getElementById("scroll-up");
  if (scrollUp) scrollUp.classList.toggle("show-scroll", window.scrollY >= 560);
});
