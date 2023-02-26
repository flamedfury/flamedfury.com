---
title: Book Collection
layout: page
permalink: /archive/index.html
---

Books, articles, playlists, and more.

## Articles

{% for bookmark in metadatabookmarks | reverse %}

<a href="{{ bookmark.url }}">{{ bookmark.title }}</a>: {{ bookmark.description }}

{% endfor %}

## Books

{% for book in metadataread | reverse %}

<img src="{{ book.thumbnail }}">
{{ book.title }} / {{ book.authors }}

{% endfor %}