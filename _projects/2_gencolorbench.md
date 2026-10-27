---
layout: page
permalink: /projects/gencolorbench/
title: GenColorBench
description: A color evaluation benchmark for text-to-image models. Can you beat the benchmark at judging color?
img: assets/img/publication_preview/gencolorbench.jpg
importance: 2
palette_color: "#F5F5DC"
venue: CVPR 2026
authors: <strong>Muhammad Atif Butt</strong>, Alexandra Gomez-Villa, Tao Wu, Javier Vazquez-Corral, Joost van de Weijer, Kai Wang
links:
  - { name: Paper, url: "https://openaccess.thecvf.com/content/CVPR2026/html/Butt_GenColorBench_A_Color_Evaluation_Benchmark_for_Text-to-Image_Generation_CVPR_2026_paper.html", icon: "fa-solid fa-file-lines" }
  - { name: arXiv, url: "https://arxiv.org/abs/2510.20586", icon: "ai ai-arxiv" }
  - { name: Code, url: "https://github.com/moatifbutt/gen-color-bench", icon: "fa-brands fa-github" }
  - { name: Benchmark page, url: "https://moatifbutt.github.io/gencolorbench", icon: "fa-solid fa-table" }
  - { name: BibTeX, url: "/publications/#butt2026gencolorbench", icon: "fa-solid fa-quote-right" }
---

{% include project_header.liquid %}

Most text-to-image benchmarks either ignore color or check it with a vision-language model, and we found that vision-language models are themselves unreliable at recognizing colors. GenColorBench evaluates color the way color science does. It is grounded in the ISCC-NBS and CSS3/X11 naming systems, contains about 44K color-focused prompts over more than 400 colors, and scores images with object segmentation and perceptual color metrics instead of a VLM.

<div class="demo__title">Be the benchmark</div>
<div class="demo__hint">Does each image match the color in its prompt? Make your call, then see what GenColorBench decided. Examples are from the color name understanding task in the paper.</div>

{% include demo.liquid name="gencolorbench" data=site.data.demos.gencolorbench script="gencolorbench-quiz.js" %}

<hr class="site-rule">

### What we found

GenColorBench covers five tasks, namely color name understanding, multi-color composition, color-object association, numeric color understanding, and implicit color association. Evaluating a wide range of recent text-to-image and unified models shows a clear drop from basic to fine-grained colors, a consistent bias toward neutral colors, and an almost complete failure to interpret numeric color codes. That last finding led directly to [NumColor](/projects/numcolor/).
