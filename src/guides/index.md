---
title: fLaMEdFury Guides
description: Collection of guides at flamedfury.com
eleventyNavigation:
  key: Guides
  parent: Home
---

<ul class="guides">
  {% for post in collections.guides | reverse %}
  <li><a href="{{ post.url }}">{{ post.data.title }}</a> - {{ post.data.description }}</li>
  {% endfor %}
</ul>