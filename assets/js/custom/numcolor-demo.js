// NumColor demo: pick a hex code and see the paper's FLUX + NumColor results.
(function () {
  "use strict";

  const root = document.querySelector('[data-demo="numcolor"]');
  if (!root || !window.SiteDemo) return;
  const { payload, el, img, hexToLab, deltaE } = window.SiteDemo;

  const groups = payload(root);
  const base = root.dataset.base;
  groups.forEach((g) => (g.lab = hexToLab(g.hex)));

  const LABELS = { coarse: "Coarse colors", fine: "Fine-grained colors", interpolated: "Interpolated colors" };

  // ---- layout
  const picker = el("div", { class: "nc__picker" });
  const view = el("div", { class: "nc__view" });
  root.append(el("div", { class: "nc" }, [picker, view]));

  const swatchButtons = new Map();
  Object.keys(LABELS).forEach((cat) => {
    const row = el("div", { class: "nc__swatches" });
    groups
      .filter((g) => g.category === cat)
      .forEach((g) => {
        const b = el("button", {
          class: "nc__swatch",
          type: "button",
          title: g.hex,
          "aria-label": g.hex,
          "aria-pressed": "false",
          style: `background:${g.hex}`,
          onclick: () => show(g),
        });
        swatchButtons.set(g.hex, b);
        row.append(b);
      });
    picker.append(el("div", { class: "nc__group-label", text: LABELS[cat] }), row);
  });

  const colorInput = el("input", { type: "color", "aria-label": "Pick any color" });
  const textInput = el("input", { type: "text", class: "mono", placeholder: "#FF5733", maxlength: "7", "aria-label": "Hex code" });
  const note = el("div", { class: "nc__note" });
  picker.append(el("div", { class: "nc__input" }, [colorInput, textInput]), note);

  const bigSwatch = el("div", { class: "nc__big-swatch" });
  const hexLabel = el("div", { class: "nc__hex mono" });
  const catLabel = el("div", { class: "nc__cat" });
  const grid = el("div", { class: "nc__grid" });
  view.append(el("div", { class: "nc__header" }, [bigSwatch, el("div", {}, [hexLabel, catLabel])]), grid);

  // ---- behavior
  function show(g, noteText) {
    swatchButtons.forEach((b, hex) => b.setAttribute("aria-pressed", String(hex === g.hex)));
    bigSwatch.style.background = g.hex;
    hexLabel.textContent = g.hex;
    catLabel.textContent = LABELS[g.category];
    if (!noteText) colorInput.value = g.hex.toLowerCase(); // keep the visitor's own pick when approximating
    grid.replaceChildren(
      ...g.images.map((im) =>
        el("figure", {}, [img(base + im.file, `a ${g.hex} ${im.object}`), el("figcaption", { class: "mono", text: `"a ${g.hex} ${im.object}"` })]),
      ),
    );
    note.textContent = noteText || "";
  }

  function nearest(hex) {
    const lab = hexToLab(hex);
    let best = groups[0];
    let bestD = Infinity;
    groups.forEach((g) => {
      const d = deltaE(lab, g.lab);
      if (d < bestD) [best, bestD] = [g, d];
    });
    return [best, bestD];
  }

  function request(hex) {
    if (!/^#?[0-9a-f]{6}$/i.test(hex)) return;
    hex = hex.startsWith("#") ? hex : "#" + hex;
    const [g, d] = nearest(hex);
    show(g, d > 0.5 ? `Closest color in the paper to ${hex.toUpperCase()} (ΔE ${d.toFixed(1)})` : "");
  }

  colorInput.addEventListener("input", () => request(colorInput.value));
  textInput.addEventListener("change", () => request(textInput.value.trim()));
  textInput.addEventListener("keyup", (e) => e.key === "Enter" && request(textInput.value.trim()));

  show(groups.find((g) => g.hex === "#3254F7") || groups[0]);
})();
