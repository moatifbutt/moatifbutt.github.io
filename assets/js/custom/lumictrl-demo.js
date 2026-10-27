// LumiCtrl demo: slide through the 7 learned illuminant tokens for a concept.
(function () {
  "use strict";

  const root = document.querySelector('[data-demo="lumictrl"]');
  if (!root || !window.SiteDemo) return;
  const { payload, el, img, preload } = window.SiteDemo;

  const data = payload(root);
  const base = root.dataset.base;
  const n = data.illuminants;
  const src = (concept, tag) => `${base}${concept}_${tag}.jpg`;

  let concept = data.concepts[0].id;
  let timer = null;

  // ---- layout
  const inputImg = img("", "input image");
  const outputImg = img("", "relit image");
  const outputCap = el("figcaption");
  const stage = el("div", { class: "lc__stage" }, [
    el("figure", {}, [inputImg, el("figcaption", { text: "input" })]),
    el("figure", {}, [outputImg, outputCap]),
  ]);

  const slider = el("input", { class: "lc__slider", type: "range", min: "1", max: String(n), step: "1", value: "1", "aria-label": "Illuminant token" });
  const play = el("button", { class: "lc__play", type: "button", "aria-label": "Play", text: "▶" });
  const ticks = el(
    "div",
    { class: "lc__ticks mono" },
    Array.from({ length: n }, (_, i) => el("span", { text: `c${i + 1}` })),
  );

  const conceptButtons = data.concepts.map((c) =>
    el("button", { type: "button", "aria-label": c.label, "aria-pressed": String(c.id === concept), onclick: () => setConcept(c.id) }, [
      img(src(c.id, "input"), c.label, ""),
    ]),
  );

  root.append(stage, el("div", { class: "lc__controls" }, [play, slider]), ticks, el("div", { class: "lc__concepts" }, conceptButtons));

  // ---- behavior
  function render() {
    const k = Number(slider.value);
    inputImg.src = src(concept, "input");
    outputImg.src = src(concept, `c${k}`);
    outputCap.textContent = `[c${k}] illumination`;
  }

  function setConcept(id) {
    concept = id;
    conceptButtons.forEach((b, i) => b.setAttribute("aria-pressed", String(data.concepts[i].id === id)));
    preload(Array.from({ length: n }, (_, i) => src(id, `c${i + 1}`)));
    render();
  }

  function stop() {
    clearInterval(timer);
    timer = null;
    play.textContent = "▶";
    play.setAttribute("aria-label", "Play");
  }

  play.addEventListener("click", () => {
    if (timer) return stop();
    play.textContent = "❚❚";
    play.setAttribute("aria-label", "Pause");
    timer = setInterval(() => {
      slider.value = String((Number(slider.value) % n) + 1);
      render();
    }, 700);
  });

  slider.addEventListener("input", () => {
    stop();
    render();
  });

  setConcept(concept);
})();
