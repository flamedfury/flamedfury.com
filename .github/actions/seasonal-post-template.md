---
title: ${year} ${season}
description: The books and articles I read, playlist I made this ${season}.
image: 2023-summer.png
tags: post
category: season
layout: post
permalink: "//posts/{{ title | slugify }}/index.html"
image: ${image}
layout: post
${bookYaml}
${bookmarkYaml}
${playlistYaml}
---

The books I read, playlist I made, and recipes I made this ${season}.

## Books

${bookMarkdown}

## Playlist

${playlistMarkdown}

## Recipes

${bookmarkMarkdown}
