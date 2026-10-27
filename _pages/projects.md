---
layout: page
title: projects
permalink: /projects/
description: Interactive pages for my main papers. Every image in the demos is taken from the papers.
nav: false # hidden from the navbar; the page is still reachable via links
nav_order: 3
horizontal: false
---

<!-- Cards come from _projects/*.md, ordered by `importance`. -->
<div class="projects">
  {% assign sorted_projects = site.projects | sort: "importance" %}
  {% if page.horizontal %}
    <div class="container">
      <div class="row row-cols-1 row-cols-md-2">
        {% for project in sorted_projects %}
          {% include projects_horizontal.liquid %}
        {% endfor %}
      </div>
    </div>
  {% else %}
    <div class="row row-cols-1 row-cols-md-3">
      {% for project in sorted_projects %}
        {% include projects.liquid %}
      {% endfor %}
    </div>
  {% endif %}
</div>
