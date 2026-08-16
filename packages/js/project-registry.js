/*==================== PROJECT REGISTRY ====================*/
/* Every file in ./projects/ calls defineProject() exactly once.
   Structural fields land in window.PROJECTS; the `text` block is folded into
   window.TRANSLATIONS so the usual data-i18n keys keep resolving.

   Image paths follow the on-disk convention, so a project only names its
   folder and its carousel filenames:
     packages/images/Projects/<folder>/icon.png
     packages/images/Projects/<folder>/Carousel/<file>

   Script order in the HTML sets the display order inside each category. */
window.PROJECT_CATEGORIES = ["vr", "mobile", "jam"];
window.PROJECTS = [];

window.defineProject = (function () {
  const IMAGE_ROOT = "./packages/images/Projects/";
  const seen = new Set();

  return function defineProject({ id, folder, text, carousel = [], ...rest }) {
    if (seen.has(id)) {
      console.warn(`[projects] duplicate id "${id}" — later definition wins`);
    }
    seen.add(id);

    const base = IMAGE_ROOT + folder + "/";

    window.PROJECTS.push({
      id,
      ...rest,
      thumb: base + "icon.png",
      carousel: carousel.map((file) => base + "Carousel/" + file),
    });

    Object.keys(window.TRANSLATIONS).forEach((lang) => {
      const strings = text[lang];
      if (!strings) {
        console.warn(`[projects] "${id}" is missing its ${lang} text`);
        return;
      }

      const work = window.TRANSLATIONS[lang].work;
      work.projects = work.projects || {};
      work.projects[id] = strings;
    });
  };
})();
