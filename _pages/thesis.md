---
layout: page
title: thesis
permalink: /thesis/
description: What Words Cannot Say. Learning Precise Concepts for Image Generation.
nav: false # hidden from the navbar; the page is still reachable via links
nav_order: 4
---

<span class="site-venue">PhD thesis · Universitat Autònoma de Barcelona · in preparation</span>

Text-to-image diffusion models are conditioned on language, so their controllability is bounded by what language can express. Color names cover broad ranges of shades, hex codes and RGB values are broken by the tokenizer into pieces without color meaning, and continuous attributes such as age are described by only a handful of discrete words. My thesis studies how to **learn**, **evaluate**, and **control** such precise visual concepts.

<hr class="site-rule">

### Chapters

Chapter 1 introduces the problem and Chapter 6 concludes. The four core chapters build on each other.

<div class="thesis-map">

<a class="thesis-map__item" href="{{ '/projects/colorpeel/' | relative_url }}" style="--chip-color: #BF0F25">
  <span class="thesis-map__num">2</span>
  <span class="thesis-map__body">
    <span class="thesis-map__title">Learning colors as prompts</span>
    <span class="thesis-map__text">ColorPeel learns a dedicated token for a user-chosen color by disentangling color from shape. ECCV 2024.</span>
  </span>
</a>

<a class="thesis-map__item" href="{{ '/projects/gencolorbench/' | relative_url }}" style="--chip-color: #F5F5DC">
  <span class="thesis-map__num">3</span>
  <span class="thesis-map__body">
    <span class="thesis-map__title">Measuring color understanding</span>
    <span class="thesis-map__text">GenColorBench evaluates color generation with color naming systems and perceptual metrics instead of VLMs. CVPR 2026.</span>
  </span>
</a>

<a class="thesis-map__item" href="{{ '/projects/numcolor/' | relative_url }}" style="--chip-color: #3254F7">
  <span class="thesis-map__num">4</span>
  <span class="thesis-map__body">
    <span class="thesis-map__title">Controlling color by number</span>
    <span class="thesis-map__text">NumColor maps hex and RGB codes to embeddings aligned with CIE Lab, transferring zero-shot across models. ECCV 2026.</span>
  </span>
</a>

<div class="thesis-map__item" style="--chip-color: #9933FF">
  <span class="thesis-map__num">5</span>
  <span class="thesis-map__body">
    <span class="thesis-map__title">Steering continuous concepts</span>
    <span class="thesis-map__text">Beyond color, we study how continuous visual attributes are represented inside diffusion transformers and how to steer along them. Under review.</span>
  </span>
</div>

</div>

{% include enhance.liquid %}
