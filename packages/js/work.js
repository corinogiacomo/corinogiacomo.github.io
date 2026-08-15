/*==================== WORK GRID ====================*/
window.work = (function () {
  function projectLink(project) {
    const link = document.createElement("a");
    link.className = "work__item";
    link.href = "./project.html?id=" + encodeURIComponent(project.id);

    const thumb = document.createElement("span");
    thumb.className = "work__thumb";
    if (project.thumb) {
      const img = document.createElement("img");
      img.src = project.thumb;
      img.alt = "";
      thumb.appendChild(img);
    }

    const name = document.createElement("span");
    name.className = "work__name";
    name.dataset.i18n = "work.projects." + project.id + ".title";

    link.append(thumb, name);
    return link;
  }

  function categoryGroup(category) {
    const items = window.PROJECTS.filter((p) => p.category === category);
    if (!items.length) return null;

    const group = document.createElement("div");
    group.className = "work__group";

    const heading = document.createElement("h3");
    heading.className = "work__category";
    heading.dataset.i18n = "work.categories." + category;

    const list = document.createElement("div");
    list.className = "work__items";
    items.forEach((project) => list.appendChild(projectLink(project)));

    group.append(heading, list);
    return group;
  }

  // Must run before i18n.init() so the generated data-i18n hooks get translated
  function render() {
    const container = document.getElementById("work-grid");
    if (!container) return;

    container.replaceChildren(
      ...window.PROJECT_CATEGORIES.map(categoryGroup).filter(Boolean)
    );
  }

  return { render };
})();
