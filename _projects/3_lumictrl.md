---
layout: page
permalink: /projects/lumictrl/
title: LumiCtrl
description: Learning illuminant prompts for lighting control in personalized text-to-image models. Oral at CVEU, CVPR 2026.
img: assets/img/publication_preview/lumictrl.jpg
importance: 3
palette_color: "#FFB46B"
venue: CVPR 2026 Workshop (CVEU) · Oral
short_venue: CVPR-W 2026
authors: <strong>Muhammad Atif Butt</strong>, Kai Wang, Javier Vazquez-Corral, Joost van de Weijer
links:
  - { name: arXiv, url: "https://arxiv.org/abs/2512.17489", icon: "ai ai-arxiv" }
  - { name: BibTeX, url: "/publications/#butt2026lumictrl", icon: "fa-solid fa-quote-right" }
---

{% include project_header.liquid %}

Prompts like "in tungsten light" or "at 6500K" rarely change the illumination of a generated scene in a controlled way. LumiCtrl learns an **illuminant prompt** from a single image of an object, so that a token such as `[c1]` reliably renders the scene under one light and `[c7]` under another, while the subject stays the same.

<div class="demo__title">Change the light</div>
<div class="demo__hint">Drag the slider or press play to move through the seven learned illuminant tokens, from warm to cool. Pick a different concept below. All images are results from the paper.</div>

{% include demo.liquid name="lumictrl" data=site.data.demos.lumictrl script="lumictrl-demo.js" %}

<hr class="site-rule">

### How it works

LumiCtrl has three parts. Physics-based augmentation renders the input under daylight illuminants along the Planckian locus. Edge-guided prompt disentanglement uses a frozen ControlNet so that the learned token captures light rather than structure. A masked reconstruction loss focuses learning on the foreground while letting the background adapt to the new light.
