---
layout: page
permalink: /publications/
title: publications
description: Papers and preprints in reverse chronological order. Use the filters to narrow the list.
nav: true
nav_order: 2
---

For citation counts, see my [Google Scholar profile](https://scholar.google.com/citations?user=vf7PeaoAAAAJ).

<!-- Filter bar. Topics come from the `topic` field in _bibliography/papers.bib. -->
<div class="pub-filters" data-pub-filters>
  <div class="pub-filters__group" role="group" aria-label="Scope">
    <button class="pub-chip" type="button" data-scope="selected" aria-pressed="false">Selected</button>
    <button class="pub-chip" type="button" data-scope="all" aria-pressed="true">All</button>
  </div>
  <span class="pub-filters__sep" aria-hidden="true"></span>
  <div class="pub-filters__group" role="group" aria-label="Topic">
    <button class="pub-chip" type="button" data-topic="color" aria-pressed="false">Color &amp; generation</button>
    <button class="pub-chip" type="button" data-topic="benchmark" aria-pressed="false">Benchmarks &amp; datasets</button>
    <button class="pub-chip" type="button" data-topic="editing" aria-pressed="false">Image editing</button>
    <button class="pub-chip" type="button" data-topic="interpretability" aria-pressed="false">Interpretability</button>
    <button class="pub-chip" type="button" data-topic="privacy" aria-pressed="false">Privacy</button>
    <button class="pub-chip" type="button" data-topic="driving" aria-pressed="false">Autonomous driving</button>
    <button class="pub-chip" type="button" data-topic="trustworthy" aria-pressed="false">Trustworthy ML</button>
  </div>
  <span class="pub-filters__count" data-pub-count></span>
</div>

{% include bib_search.liquid %}

<div class="publications">

{% bibliography %}

</div>

<div class="pub-meta" aria-hidden="true">
{% bibliography --template bib_meta --group_by none %}
</div>

<script src="{{ '/assets/js/custom/pub-filter.js' | relative_url | bust_file_cache }}" defer></script>

{% include enhance.liquid %}
