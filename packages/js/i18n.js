/*==================== I18N ====================*/
window.i18n = (function () {
  const DEFAULT_LANG = "en";
  const STORAGE_KEY = "selected-language";
  const languages = window.TRANSLATIONS;

  let currentLang = DEFAULT_LANG;

  function resolve(dict, key) {
    return key.split(".").reduce((value, part) => {
      return value && typeof value === "object" ? value[part] : undefined;
    }, dict);
  }

  function t(key, lang = currentLang) {
    const value = resolve(languages[lang], key);
    if (value !== undefined) return value;

    const fallback = resolve(languages[DEFAULT_LANG], key);
    if (fallback !== undefined) return fallback;

    console.warn(`[i18n] missing translation for "${key}"`);
    return key;
  }

  function detectLanguage() {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored && languages[stored]) return stored;

    const browserLang = (navigator.language || "").slice(0, 2);
    return languages[browserLang] ? browserLang : DEFAULT_LANG;
  }

  function translateDocument() {
    document.documentElement.lang = currentLang;
    document.title = t("meta.title");

    document.querySelectorAll("[data-i18n]").forEach((el) => {
      el.textContent = t(el.dataset.i18n);
    });

    document.querySelectorAll("[data-i18n-html]").forEach((el) => {
      el.innerHTML = t(el.dataset.i18nHtml);
    });

    // data-i18n-attr="placeholder:contact.formName; aria-label:nav.home"
    document.querySelectorAll("[data-i18n-attr]").forEach((el) => {
      el.dataset.i18nAttr.split(";").forEach((pair) => {
        const [attr, key] = pair.split(":").map((s) => s.trim());
        if (attr && key) el.setAttribute(attr, t(key));
      });
    });

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      const active = btn.dataset.lang === currentLang;
      btn.classList.toggle("lang-switch__btn--active", active);
      btn.setAttribute("aria-pressed", String(active));
    });
  }

  function setLanguage(lang) {
    if (!languages[lang]) return;
    currentLang = lang;
    localStorage.setItem(STORAGE_KEY, lang);
    translateDocument();
    document.dispatchEvent(
      new CustomEvent("languagechange", { detail: { lang } })
    );
  }

  function init() {
    currentLang = detectLanguage();
    translateDocument();

    document.querySelectorAll("[data-lang]").forEach((btn) => {
      btn.addEventListener("click", () => setLanguage(btn.dataset.lang));
    });
  }

  return {
    init,
    setLanguage,
    t,
    getLanguage: () => currentLang,
  };
})();
