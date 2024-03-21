---
title: ${year} ${season}
description: The books I read, playlist I made, and articles I read this ${season}.
tags: seasonal
type: seasonal
layout: post
permalink: "//posts/${year}/{{ title | slugify }}/index.html"
${bookYaml}
${bookmarkYaml}
${playlistYaml}
---

The books I read, playlist I made, and articles I read this ${season}.

## Books

${bookMarkdown}

## Playlist

${playlistMarkdown}

## Articles

${bookmarkMarkdown}
