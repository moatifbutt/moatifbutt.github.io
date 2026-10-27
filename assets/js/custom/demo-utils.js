// Small helpers shared by the project demos. Exposes window.SiteDemo.
(function () {
  "use strict";

  // Read the JSON payload a page embeds next to a demo container:
  //   <div data-demo="numcolor" data-base="/assets/demos/numcolor/">
  //     <script type="application/json">...</script>
  //   </div>
  function payload(root) {
    const node = root.querySelector('script[type="application/json"]');
    return node ? JSON.parse(node.textContent) : null;
  }

  // Create an element with attributes and children in one call.
  function el(tag, attrs, children) {
    const node = document.createElement(tag);
    Object.entries(attrs || {}).forEach(([k, v]) => {
      if (k === "class") node.className = v;
      else if (k === "text") node.textContent = v;
      else if (k === "style") node.style.cssText = v;
      else if (k.startsWith("on")) node.addEventListener(k.slice(2), v);
      else node.setAttribute(k, v);
    });
    (children || []).forEach((c) => node.append(c));
    return node;
  }

  function img(src, alt, cls) {
    return el("img", { src, alt, class: cls || "demo-img", loading: "lazy", decoding: "async" });
  }

  function preload(srcs) {
    srcs.forEach((s) => {
      const i = new Image();
      i.src = s;
    });
  }

  // sRGB hex -> CIE Lab (D65), used to find the nearest color.
  function hexToLab(hex) {
    const n = parseInt(hex.replace("#", ""), 16);
    const lin = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
      v /= 255;
      return v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4);
    });
    const [r, g, b] = lin;
    const xyz = [
      (0.4124 * r + 0.3576 * g + 0.1805 * b) / 0.95047,
      0.2126 * r + 0.7152 * g + 0.0722 * b,
      (0.0193 * r + 0.1192 * g + 0.9505 * b) / 1.08883,
    ].map((t) => (t > 216 / 24389 ? Math.cbrt(t) : (24389 / 27 * t + 16) / 116));
    return [116 * xyz[1] - 16, 500 * (xyz[0] - xyz[1]), 200 * (xyz[1] - xyz[2])];
  }

  function deltaE(a, b) {
    return Math.hypot(a[0] - b[0], a[1] - b[1], a[2] - b[2]);
  }

  window.SiteDemo = { payload, el, img, preload, hexToLab, deltaE };
})();
