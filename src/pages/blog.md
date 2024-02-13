---
title: Posts
description: 'All blog posts can be found here'
layout: blog
pagination:
  data: collections.posts
  size: 10000
permalink: 'posts/{% if pagination.pageNumber >=1 %}page-{{ pagination.pageNumber + 1 }}/{% endif %}index.html'
---

This blog has a pagination of {{ pagination.size }} posts per page.
