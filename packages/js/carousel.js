/*==================== CAROUSEL ====================*/
window.carousel = (function () {
  const INTERVAL = 5000;
  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)");

  function mount(root, images) {
    if (!root || !images || !images.length) return;

    const track = document.createElement("div");
    track.className = "carousel__track";

    const slides = images.map((src, i) => {
      const img = document.createElement("img");
      img.className = "carousel__slide";
      img.src = src;
      img.alt = "";
      img.loading = i === 0 ? "eager" : "lazy";
      track.appendChild(img);
      return img;
    });

    root.appendChild(track);

    if (slides.length === 1) {
      slides[0].classList.add("carousel__slide--active");
      return;
    }

    const dots = images.map((_, i) => {
      const dot = document.createElement("button");
      dot.type = "button";
      dot.className = "carousel__dot";
      dot.setAttribute("aria-label", String(i + 1));
      dot.addEventListener("click", () => {
        show(i);
        restart();
      });
      return dot;
    });

    const nav = document.createElement("div");
    nav.className = "carousel__dots";
    nav.append(...dots);
    root.appendChild(nav);

    let index = 0;
    let timer = null;

    function show(n) {
      index = (n + slides.length) % slides.length;
      slides.forEach((slide, i) =>
        slide.classList.toggle("carousel__slide--active", i === index)
      );
      dots.forEach((dot, i) => {
        dot.classList.toggle("carousel__dot--active", i === index);
        dot.setAttribute("aria-current", String(i === index));
      });
    }

    function start() {
      if (timer || reduceMotion.matches) return;
      timer = setInterval(() => show(index + 1), INTERVAL);
    }

    function stop() {
      clearInterval(timer);
      timer = null;
    }

    function restart() {
      stop();
      start();
    }

    root.addEventListener("mouseenter", stop);
    root.addEventListener("mouseleave", start);
    root.addEventListener("focusin", stop);
    root.addEventListener("focusout", start);
    reduceMotion.addEventListener("change", restart);

    show(0);
    start();
  }

  return { mount };
})();
