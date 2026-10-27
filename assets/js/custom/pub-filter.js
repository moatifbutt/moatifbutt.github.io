// Publication filters for _pages/publications.md.
//
// Each bibliography entry renders as <li> containing <div id="{bibkey}">.
// A hidden second bibliography (template _layouts/bib_meta.liquid) lists every
// key with its `topic` and `selected` fields; we join the two on the key.
(function () {
  "use strict";

  const bar = document.querySelector("[data-pub-filters]");
  if (!bar) return;

  const list = document.querySelector(".publications");
  const countEl = bar.querySelector("[data-pub-count]");

  const meta = {};
  document.querySelectorAll("span.pub-meta[data-key]").forEach((el) => {
    meta[el.dataset.key] = {
      topics: (el.dataset.topics || "")
        .split(",")
        .map((t) => t.trim())
        .filter(Boolean),
      selected: el.dataset.selected === "true",
    };
  });

  const state = { scope: "all", topics: new Set() };

  function entryKey(li) {
    const div = li.querySelector("div[id]");
    return div ? div.id : null;
  }

  function matches(info) {
    if (!info) return state.scope === "all" && state.topics.size === 0;
    if (state.scope === "selected" && !info.selected) return false;
    if (state.topics.size === 0) return true;
    return info.topics.some((t) => state.topics.has(t));
  }

  function apply() {
    let shown = 0;
    let total = 0;
    list.querySelectorAll("ol.bibliography > li").forEach((li) => {
      total += 1;
      const ok = matches(meta[entryKey(li)]);
      li.classList.toggle("is-filtered-out", !ok);
      if (ok) shown += 1;
    });

    // Hide year headings whose list became empty.
    list.querySelectorAll("h2.bibliography").forEach((h2) => {
      const ol = h2.nextElementSibling;
      const visible = ol && ol.querySelector("li:not(.is-filtered-out)");
      h2.classList.toggle("is-filtered-out", !visible);
    });

    if (countEl) countEl.textContent = `Showing ${shown} of ${total}`;
  }

  bar.addEventListener("click", (event) => {
    const chip = event.target.closest(".pub-chip");
    if (!chip) return;

    if (chip.dataset.scope) {
      state.scope = chip.dataset.scope;
      bar.querySelectorAll("[data-scope]").forEach((b) => b.setAttribute("aria-pressed", String(b === chip)));
    } else if (chip.dataset.topic) {
      const t = chip.dataset.topic;
      const on = !state.topics.has(t);
      on ? state.topics.add(t) : state.topics.delete(t);
      chip.setAttribute("aria-pressed", String(on));
    }
    apply();
  });

  apply();
})();
