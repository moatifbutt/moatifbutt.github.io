// Page enhancements loaded by _includes/enhance.liquid.
//   1. Scroll reveal: sections fade up the first time they enter the viewport.
//   2. Hover-to-explore: publication thumbnails step through result images
//      (frames from _data/preview_frames.yml) as the pointer moves across them.
(function () {
  "use strict";

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ---------------------------------------------------------------- reveal
  function setupReveal() {
    if (reduceMotion || !("IntersectionObserver" in window)) return;
    const targets = document.querySelectorAll(
      ".post > article > *, .post .news tr, .publications ol.bibliography > li, .research-palette, .thesis-map__item, .demo",
    );
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          e.target.classList.add("is-visible");
          io.unobserve(e.target);
        });
      },
      { rootMargin: "0px 0px -8% 0px" },
    );
    targets.forEach((t) => {
      // Content already on screen at load stays put; only later content animates.
      if (t.getBoundingClientRect().top < window.innerHeight) return;
      t.classList.add("reveal");
      io.observe(t);
    });
  }

  // ---------------------------------------------------------------- scrub
  function setupScrub() {
    const dataEl = document.getElementById("preview-frames");
    if (!dataEl) return;
    const frames = JSON.parse(dataEl.textContent || "{}") || {};
    const base = dataEl.dataset.base;

    Object.entries(frames).forEach(([key, files]) => {
      if (!files || !files.length) return;
      // The same paper can appear twice (selected list + full list).
      document.querySelectorAll(`[id="${key}"]`).forEach((entry) => {
        const row = entry.closest(".row") || entry.parentElement;
        const thumb = row && row.querySelector("img.preview");
        if (!thumb) return;
        attach(thumb, files.map((f) => base + f));
      });
    });
  }

  function attach(thumb, srcs) {
    const host = document.createElement("span");
    host.className = "scrub";
    thumb.parentNode.insertBefore(host, thumb);
    host.append(thumb);

    const frame = document.createElement("img");
    frame.className = "scrub__frame";
    frame.alt = "";
    const bar = document.createElement("span");
    bar.className = "scrub__bar";
    const fill = document.createElement("span");
    bar.append(fill);
    const hint = document.createElement("span");
    hint.className = "scrub__hint";
    hint.textContent = `${srcs.length} results`;
    host.append(frame, bar, hint);

    let loaded = false;
    function preload() {
      if (loaded) return;
      loaded = true;
      srcs.forEach((s) => (new Image().src = s));
    }

    function show(fraction) {
      const i = Math.min(srcs.length - 1, Math.max(0, Math.floor(fraction * srcs.length)));
      if (frame.dataset.i !== String(i)) {
        frame.src = srcs[i];
        frame.dataset.i = String(i);
      }
      fill.style.width = `${((i + 1) / srcs.length) * 100}%`;
    }

    function fromEvent(e) {
      const r = host.getBoundingClientRect();
      return (e.clientX - r.left) / r.width;
    }

    host.addEventListener("pointerenter", (e) => {
      preload();
      host.classList.add("is-active");
      show(fromEvent(e));
    });
    host.addEventListener("pointermove", (e) => show(fromEvent(e)));
    host.addEventListener("pointerleave", () => host.classList.remove("is-active"));
  }

  setupReveal();
  setupScrub();
})();
