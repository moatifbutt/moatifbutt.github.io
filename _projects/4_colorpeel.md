---
layout: page
permalink: /projects/colorpeel/
title: ColorPeel
description: Color prompt learning with diffusion models via color and shape disentanglement.
img: assets/img/publication_preview/colorpeel.jpg
importance: 4
palette_color: "#BF0F25"
venue: ECCV 2024
authors: <strong>Muhammad Atif Butt</strong>, Kai Wang, Javier Vazquez-Corral, Joost van de Weijer
links:
  - { name: Paper, url: "https://www.ecva.net/papers/eccv_2024/papers_ECCV/html/1191_ECCV_2024_paper.php", icon: "fa-solid fa-file-lines" }
  - { name: arXiv, url: "https://arxiv.org/abs/2407.07197", icon: "ai ai-arxiv" }
  - { name: Code, url: "https://github.com/moatifbutt/color-peel", icon: "fa-brands fa-github" }
  - { name: Project page, url: "https://moatifbutt.github.io/colorpeel/", icon: "fa-solid fa-globe" }
  - { name: BibTeX, url: "/publications/#butt2024colorpeel", icon: "fa-solid fa-quote-right" }
---

{% include project_header.liquid %}

A color name like "red" covers a wide range of shades, so a prompt cannot pin down the exact red a designer has in mind. ColorPeel learns a new prompt token for each user-chosen color. It trains on simple 2D and 3D shapes rendered in the target colors and learns separate color and shape tokens, which **peels** the color away from the shape. The learned color tokens can then be used in any prompt, alone or combined.

<div class="demo__title">Explore the learned colors</div>
<div class="demo__hint">Each token was learned from the shapes shown on its card. Click a token to see which generations use it. Images are from the paper.</div>

{% include demo.liquid name="colorpeel" data=site.data.demos.colorpeel script="colorpeel-demo.js" %}

<hr class="site-rule">

### Why shapes?

When existing personalization methods learn a color from real photos, the token absorbs the shape of the objects too, and the color leaks into unrelated parts of the image. Rendering basic geometric shapes gives precise control over the color and makes shape an independent factor, and a cross-attention alignment loss keeps each token focused on its own attribute. The same idea extends to abstract attributes such as textures and materials.
