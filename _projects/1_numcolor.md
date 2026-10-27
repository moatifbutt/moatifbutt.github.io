---
layout: page
permalink: /projects/numcolor/
title: NumColor
description: Precise numeric color control in text-to-image generation. Type a hex code, get that color.
img: assets/img/publication_preview/numcolor.jpg
importance: 1
palette_color: "#3254F7"
venue: ECCV 2026
authors: <strong>Muhammad Atif Butt</strong>, Diego Hernández, Alexandra Gomez-Villa, Kai Wang, Javier Vazquez-Corral, Joost van de Weijer
links:
  - { name: Paper, url: "https://arxiv.org/abs/2603.13547", icon: "fa-solid fa-file-lines" }
  - { name: Code, url: "https://github.com/moatifbutt/numcolor", icon: "fa-brands fa-github" }
  - { name: BibTeX, url: "/publications/#butt2026numcolor", icon: "fa-solid fa-quote-right" }
---

{% include project_header.liquid %}

Ask a text-to-image model for "a #3254F7 car" and it will usually ignore the code. The tokenizer splits `#3254F7` into fragments that carry no color meaning, so the model falls back to its own idea of the object. NumColor fixes this without retraining the generator. A **Color Token Aggregator** finds color codes in the prompt however they are tokenized, and a **ColorBook** of learnable embeddings, aligned with the perceptually uniform CIE Lab space, turns each code into an embedding the text encoder understands.

<div class="demo__title">Try it</div>
<div class="demo__hint">Pick one of the colors used in the paper, or choose any color and the demo jumps to the closest one. All images are results from the paper (FLUX with NumColor).</div>

{% include demo.liquid name="numcolor" data=site.data.demos.numcolor script="numcolor-demo.js" %}

<hr class="site-rule">

### How it works

ColorBook is trained on **NumColor-Data**, a synthetic dataset of rendered images with an exact color-to-pixel correspondence. Two auxiliary losses keep the geometry of Lab space in the embedding space, so nearby colors get nearby embeddings and interpolation between codes stays smooth. NumColor is trained only on FLUX, yet it transfers zero-shot to SD3, SD3.5, PixArt-α, and PixArt-Σ, and it substantially improves numerical color accuracy and color harmony on [GenColorBench](/projects/gencolorbench/).
