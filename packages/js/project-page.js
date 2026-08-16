/*==================== PROJECT PAGE ====================*/
(function () {
  const id = new URLSearchParams(window.location.search).get("id");
  const project = window.PROJECTS.find((p) => p.id === id);

  const article = document.getElementById("project");
  const notFound = document.getElementById("project-not-found");

  if (!project) {
    article.hidden = true;
    notFound.hidden = false;
    i18n.init();
    return;
  }

  const base = "work.projects." + project.id;
  const bind = (elementId, key) => {
    document.getElementById(elementId).dataset.i18n = key;
  };

  bind("project-title", base + ".title");
  bind("project-category", "work.categories." + project.category);
  bind("project-description", base + ".description");

  document.getElementById("project-year").textContent = project.year;

  if (project.thumb) {
    const img = document.createElement("img");
    img.src = project.thumb;
    img.alt = "";
    document.getElementById("project-thumb").appendChild(img);
  }

  if (project.video) {
    const frame = document.createElement("iframe");
    frame.src = "https://www.youtube-nocookie.com/embed/" + project.video;
    frame.loading = "lazy";
    frame.allow =
      "accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share";
    frame.allowFullscreen = true;
    frame.dataset.i18nAttr = "title:" + base + ".title";
    document.getElementById("project-video").appendChild(frame);
  }

  carousel.mount(document.getElementById("project-carousel"), project.carousel);

  // i18n owns document.title, so re-apply ours after every language change
  function syncTitle() {
    document.title =
      i18n.t(base + ".title") + " — " + i18n.t("common.fullName");
  }

  document.addEventListener("languagechange", syncTitle);
  i18n.init();
  syncTitle();
})();
