/*==================== ACCORDION SKILLS ====================*/
document.querySelectorAll(".skills__header").forEach((header) => {
  header.addEventListener("click", () => {
    header.parentNode.classList.toggle("skills__open");
    header.parentNode.classList.toggle("skills__close");
  });
});

/*==================== QUALIFICATION TABS ====================*/
const tabs = document.querySelectorAll("[data-target]"),
  tabContents = document.querySelectorAll("[data-content]");

tabs.forEach((tab) => {
  tab.addEventListener("click", () => {
    tabContents.forEach((content) =>
      content.classList.remove("qualification__active")
    );
    document
      .querySelector(tab.dataset.target)
      .classList.add("qualification__active");

    tabs.forEach((other) => other.classList.remove("qualification__active"));
    tab.classList.add("qualification__active");
  });
});

/*==================== SCROLL SECTIONS ACTIVE LINK ====================*/
const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", () => {
  const scrollY = window.scrollY;

  sections.forEach((section) => {
    const link = document.querySelector(
      ".nav__menu a[href*=" + section.getAttribute("id") + "]"
    );
    if (!link) return;

    const top = section.offsetTop - 50;
    link.classList.toggle(
      "active-link",
      scrollY > top && scrollY <= top + section.offsetHeight
    );
  });
});

/*==================== WORK ====================*/
work.render();

/*==================== LANGUAGE ====================*/
i18n.init();
