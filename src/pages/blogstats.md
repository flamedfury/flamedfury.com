---
title: /blogstats
description: Blog statistics and posting frequency visualisation for fLaMEdfury.
permalink: /blogstats/index.html
layout: page
date: 2025-09-13
---

This page shows my blog posting activity over time, visualised as a GitHub-style contribution graph. Each square represents a day, with darker squares indicating more posts published on that day.

## Posting Activity

{% postGraph collections.posts %}

## About This Graph

- Each square represents one day
- Darker squares = more posts published that day
- Hover over squares to see the exact date and post count
- Data includes all blog posts from the site's beginning to present

## Stats

- **Total posts**: {{ collections.posts.length }}
- **Years active**: Multiple years of consistent posting
- **Visualisation**: GitHub-style contribution graph

---

*This page uses [PostGraph](https://postgraph.rknight.me/) by Robb Knight to visualise posting frequency.*