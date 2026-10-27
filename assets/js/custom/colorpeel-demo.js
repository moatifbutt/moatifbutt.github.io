// ColorPeel demo: select a learned color token to see where it is used.
(function () {
  "use strict";

  const root = document.querySelector('[data-demo="colorpeel"]');
  if (!root || !window.SiteDemo) return;
  const { payload, el, img } = window.SiteDemo;

  const data = payload(root);
  const base = root.dataset.base;
  const color = {};
  data.tokens.forEach((t) => (color[t.id] = `rgb(${t.rgb.join(",")})`));

  let active = null;

  // ---- layout
  const tokenButtons = data.tokens.map((t) =>
    el(
      "button",
      { class: "cp__token", type: "button", "aria-pressed": "false", style: `--token-color:${color[t.id]}`, onclick: () => toggle(t.id) },
      [
        img(base + t.train, `training shapes for <${t.id}>`, ""),
        el("span", { class: "cp__token-name mono", text: `<${t.id}>` }),
        el("span", { class: "cp__token-rgb mono", text: `RGB (${t.rgb.join(", ")})` }),
      ],
    ),
  );

  // Render a prompt with {c1}-style placeholders as colored token spans.
  function promptNode(prompt) {
    const cap = el("figcaption");
    prompt.split(/(\{c\d\})/).forEach((part) => {
      const m = part.match(/^\{(c\d)\}$/);
      cap.append(m ? el("span", { class: "cp__tok", style: `color:${color[m[1]]}`, text: `<${m[1]}>` }) : part);
    });
    return cap;
  }

  const figures = data.outputs.map((o) => {
    const fig = el("figure", {}, [img(base + o.file, o.prompt.replace(/[{}]/g, "")), promptNode(o.prompt)]);
    fig.dataset.tokens = (o.prompt.match(/c\d/g) || []).join(" ");
    return fig;
  });

  root.append(el("div", { class: "cp__tokens" }, tokenButtons), el("div", { class: "cp__outputs" }, figures));

  // ---- behavior
  function toggle(id) {
    active = active === id ? null : id;
    tokenButtons.forEach((b, i) => b.setAttribute("aria-pressed", String(data.tokens[i].id === active)));
    figures.forEach((f) => f.classList.toggle("is-dimmed", active !== null && !f.dataset.tokens.split(" ").includes(active)));
  }
})();
