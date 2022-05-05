---
title: Vinyl Collection 🎧
description: This page details my growing vinyl collection. It includes photos of the cover, sleeves and the vinyl itself along with commentary on my thoughts of the packaging, and the music itself.
layout: page.njk
eleventyNavigation:
  key: Vinyl Collection
  parent: Recordshelf
---

Below is my record collection. I enjoy collecting this medium. The process of selecting a record from the collection and intentionally listening to it adds so much more than throwing on a selection of songs selected by an algorithm.

Record collection is displayed by record release date, not collected date. If I can determine collection dates for the older records in the collection, this may change.

{% for vinyls in collections.vinyl %} 
<div class="vinyl-grid">
<div class="vinyl-grid__image">
<img src="{{ vinyls.data.albumart }}" alt="The album cover for {{ vinyls.data.artist }} {{ vinyls.data.albumtitle }}">
</div>
<div class="vinyl-grid__feature">
<table>
<tbody>
  <tr>
    <td>Artist</td>
    <td>{{ vinyls.data.artist }}</td>
  </tr>
    <tr>
    <td>Title</td>
    <td>{{ vinyls.data.albumtitle }}</td>
  </tr>
  <tr>
    <td>Label</td>
    <td>{{ vinyls.data.label }}</td>
  </tr>
  <tr>
    <td>Format</td>
    <td>{{ vinyls.data.format }}</td>
  </tr>
  <tr>
    <td>Released</td>
    <td>{{ vinyls.data.releasedate }}</td>
  </tr>
  <tr>
    <td>Genre</td>
    <td>{{ vinyls.data.genre }}</td>
  </tr>
  <tr>
    <td colspan="2">{{ vinyls.templateContent | safe }}</td>
  </tr>
</tbody>
</table>
</div>
</div>
{% endfor %}

---

_Last updated {% currentDate %}_