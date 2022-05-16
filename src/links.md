---
title: Links 🔗
description: my collection of links
layout: page.njk
eleventyNavigation:
  key: Links
  parent: Home
---

I love surfing the web, these are some of my favourite links.

## Cool Sites

A collection of websites that i find useful for my various interests.

<table>
<tbody>
{% for item in links.usefulSites %}
<tr>
<td><a href="{{ item.url }}" target="_blank">{{ item.siteName }}</a></td>
<td>{{ item.siteDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Vinyl Stores

A collection of online vinyl stores where I hunt for sweet music.

<table>
<tbody>
{% for item in links.vinylStores %}
<tr>
<td><a href="{{ item.url }}" target="_blank">{{ item.siteName }}</a></td>
<td>{{ item.siteDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Coding and Hacking

A collection of websites that i've found useful for hacking away at my various projects.

<table>
<tbody>
{% for item in links.codingSites %}
<tr>
<td><a href="{{ item.url }}">{{ item.siteName }}</a></td>
<td>{{ item.siteDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Search Engines

A collection of independent search engines with varying degress of indexes, results and privacy options.

<table>
<tbody>
{% for item in links.searchEngines %}
<tr>
<td><a href="{{ item.url }}" target="_blank">{{ item.siteName }}</a></td>
<td>{{ item.siteDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Newsleters

A collection of newsletters that i subscribe to.

<table>
<tbody>
{% for item in links.newsLetters %}
<tr>
<td><a href="{{ item.url }}" target="_blank">{{ item.siteName }}</a></td>
<td>{{ item.siteDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>

## Podcasts

If I'm not listening to music, then I'm most likely listening to the latest episode of these podcasts.

<table>
<tbody>
{% for item in links.podCasts %}
<tr>
<td><a href="{{ item.url }}" target="_blank">{{ item.podName }}</a> - <a href="{{ item.rss }}" target="_blank">rss</a></td>
<td>{{ item.podDescription }}</td>
</tr>
{% endfor %}
</tbody>
</table>