---
title: Created a dynamically  generated now page
update: Created a dynamically  generated now page
excludeFromSitemap: true
date: 2023-04-16
category: update
tags: updates
permalink: "//updates/{{ title | slugify }}/index.html"
---

Taking inspiration from [Derek Shivers](https://nownownow.com/about) and guidance from [Cory](https://coryd.dev/posts/2023/building-my-now-page-using-eleventy/), I now have a dynamically generated [now](/now/) page.

Using [eleventy-fetch](https://github.com/11ty/eleventy-fetch), the page is generated with data from [Last.fm](https://www.last.fm/), [Trakt](https://trakt.tv/), and my own [metadata-library](https://github.com/flamedfury/metadata-library/).

This is the first iteration; I have some problems to solve to get it looking how I want it to look.