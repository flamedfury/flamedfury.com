---
title: Recordshelf 🎧
description: my collection of music
layout: page.njk
eleventyNavigation:
  key: Recordshelf
  parent: Home
---

Music has always been a huge part of my life.

I'm happy listening to almost anything, my number one absolute joy when it comes to music for as long as I can remember has been rap music. The way the artists take words, twist them, make them fit a scheme, the complete mastery of language is super awesome to me. Second to the words are the beats, from the energetic, to the chilling to the haunting, it's music that moves me.

Then there's pop-punk, punk rock, alt-rock, whatever it is. You know the songs with that nasely accent and the elongated pronunciation of words? The music that embraces (most of the time) the fun things in life, partying, skating, surfing. Especially the ones i can sing along to, but also heartbreak. I'm glad to have recently found a new era of artists following this style of music.

Dance music, I've tasted this over the last few decades with a long affair with hard dance, damn what a time to be alive that was. Many nights spent form dusk to dawn with smiles, hugs, and laughs.

And don't forget pop music. I love the formulaic construction of a banger, songs that are catchy and fun to sing along to. Don't get me wrong, some of it is horrible, but i can find joy in most of it.

## Recordshelf pages

My recordshelf page was getting too long so I've broken it down into a series of sub pages, click through to see what's on my mind.

- [Vinyl collection](vinyl)
- [Mixtapes & playlists](mixtapes)
- [Impactful albums](impactfulalbums)
- [Miley fan page](https://miley.flamedfury.com) - WIP

## What am I listening to?

It's not often that I'm not listening to music while out and about, walking the dogs or doing chores around the house.

### Recent tracks

My last.fm most recently played tracks 3x2 as of {% currentDate %}

{% set recentlyPlayed = lastfm.recenttracks.track %}
{% if recentlyPlayed.length %}
<div class="flex-grid">
{% for item in recentlyPlayed %}
<div class="flex-grid__cell">
<a href="{{ item.url }}">
<img src="{{ item.image[3]['#text'] }}" alt="Album artwork for {{ item.name }} by {{ item.artist['#text'] }}" title="{{ item.name }} by {{ item.artist['#text'] }}">
</a>
</div>
{% endfor %}
</div>
{% endif %}

### Top albums

My last.fm top albums 3x3 for the last month as of {% currentDate %}

{% set topAlbum = lastfm2.topalbums.album %}
{% if topAlbum.length %}
<div class="flex-grid">
{% for item in topAlbum %}
<div class="flex-grid__cell">
<a href="{{ item.url }}">
<img src="{{ item.image[3]['#text'] }}" alt="Album artwork for {{ item.name }} by {{ item.artist['#text'] }}" title="{{ item.artist.name }} - {{ item.name }}">
</a>
</div>
{% endfor %}
</div>
{% endif %}