// GenColorBench quiz: guess whether each generated image matches its color prompt,
// then compare with the benchmark's decision.
(function () {
  "use strict";

  const root = document.querySelector('[data-demo="gencolorbench"]');
  if (!root || !window.SiteDemo) return;
  const { payload, el, img } = window.SiteDemo;

  const items = payload(root);
  const base = root.dataset.base;
  let answered = 0;
  let agreed = 0;

  // ---- layout
  const scoreText = el("span");
  const revealAll = el("button", { class: "site-button", type: "button", text: "Reveal all" });
  const grid = el("div", { class: "gcb__grid" });
  root.append(el("div", { class: "gcb__score" }, [scoreText, revealAll]), grid);

  const cards = items.map((item, i) => {
    const file = `${base}q${String(i + 1).padStart(2, "0")}.jpg`;
    const actions = el("div", { class: "gcb__actions" }, [
      el("button", { type: "button", text: "✓ Matches", onclick: () => answer(i, true) }),
      el("button", { type: "button", text: "✗ Doesn't", onclick: () => answer(i, false) }),
    ]);
    const body = el("div", { class: "gcb__body" }, [el("div", { class: "gcb__prompt", text: `"${item.prompt}"` }), actions]);
    const card = el("div", { class: "gcb__card" }, [img(file, item.prompt, "demo-img gcb__img"), body]);
    grid.append(card);
    return { card, body, actions, done: false };
  });

  // ---- behavior
  function verdict(i) {
    const item = items[i];
    return el("div", { class: "gcb__verdict" }, [
      "Benchmark: ",
      el("strong", { class: item.pass ? "ok" : "bad", text: item.pass ? "match" : "mismatch" }),
      ` · ${item.model}`,
    ]);
  }

  function updateScore() {
    scoreText.textContent = answered ? `You agree with the benchmark on ${agreed} of ${answered}` : `Judge ${items.length} images from ${new Set(items.map((x) => x.model)).size} models`;
  }

  function answer(i, guess) {
    const c = cards[i];
    if (c.done) return;
    c.done = true;
    answered += 1;
    const ok = guess === items[i].pass;
    if (ok) agreed += 1;
    c.card.classList.add(ok ? "is-correct" : "is-wrong");
    c.actions.replaceWith(verdict(i));
    updateScore();
  }

  revealAll.addEventListener("click", () => {
    cards.forEach((c, i) => {
      if (c.done) return;
      c.done = true;
      c.actions.replaceWith(verdict(i));
    });
  });

  updateScore();
})();
