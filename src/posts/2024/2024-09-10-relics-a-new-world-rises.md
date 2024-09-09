---
title: "RELICS: A New World Rises"
description: While up in Auckland last weekend the family and I checked out a sweet Lego exhibition at the Auckland Museum.
tags:
  - life
hashtags:
  - lego
date: 2024-09-10
timestamp: 2024-09-09T20:04:06.254Z
image: ./src/assets/images/posts/2024/2024-09-10-6062.jpeg
alt: 'Text displaying in two columns, one in Te Reo and the other in English, reads: "THE YEAR IS 2530. After centuries of environmental decline, humans no longer remain on planet Earth. In their absence, the planet is slowly recovering. Amongst the waste, a collection of forgotten objects is now blossoming with LEGO® worlds. Explore this new world rising and discover the stories within."'
gallery:
  - image: ./src/assets/images/posts/2024/2024-09-10-6063.jpeg
    alt: 'Model skyscraper buildings and construction cranes built from colorful LEGO bricks, standing on an oversized trashcan and a rusted metal container, within a dimly lit exhibition space.'
  - image: ./src/assets/images/posts/2024/2024-09-10-6065.jpeg
    alt: 'A large, graffiti-covered recycling bin surrounded by toy trucks and small plants lies on a paved surface. One truck is loading a crumpled can, while others are near a partially enclosed tunnel.'
  - image: ./src/assets/images/posts/2024/2024-09-10-6066.jpeg
    alt: 'A scene built from colorful LEGO bricks within a rescued grandfather clock displaying intricate mechanical components, surrounded by framed artwork on a patterned wallpaper.'
  - image: ./src/assets/images/posts/2024/2024-09-10-6067.jpeg
    alt: 'A colorful, retro jukebox stands in a decorated space, displaying small-scale figurines and intricate scenes inside, surrounded by a tiled floor and walls adorned with vintage posters and ivy.'
  - image: ./src/assets/images/posts/2024/2024-09-10-6068.jpeg
    alt: 'A server rack glows with vibrant LED lights, housing multiple electronic components and cables, surrounded by computer monitors displaying technical schematics, all set against a dark backdrop.'
  - image: ./src/assets/images/posts/2024/2024-09-10-6069.jpeg
    alt: 'A miniature city made of toy blocks and figurines is crafted inside the open trunk of an old, rusty car with a tilted license plate reading "R3LICS."'
  - image: ./src/assets/images/posts/2024/2024-09-10-6070.jpeg
    alt: 'Toy characters in a brightly-lit, multilevel ice palace engage in various activities including climbing, skiing, and socializing. Large sign reads "CRYOLIFE" in the center of the scene.'
---

What's going on, Internet? Last weekend on the way back from Fiji my family and I spent a couple extra nights in Auckland on the way home. If you have young children you know what it's like to keep them entertained all day, especially while away from the comfort of home.

Luckily for us the [Auckland Musuem](https://www.aucklandmuseum.com/) was hosting a fantastic LEGO exhibition, [RELICS](https://www.relicsexhibitions.com/).

> It’s 2530, humans have left the planet and a new world has risen in their place! LEGO Minifigures have taken over the planet and built intricate civilisations in the artefacts left behind, each one inspired by the object they now call home.

RELICS is an exhibition created by Australian LEGO Masters Jackson Harvey and Alex Towler. The exhibition is wondeful (not so far into the future) scenes built from colourful LEGO bricks, showing the lives of mini figs who had taken over the world as humans succumbed to climate change.

I had a lot of fun walking around and reading the displays. They've done a fantastic job of building the differently themed worlds in reclaimed objects.

I took some photos from the exhibit, you can click them for larger, unoptimised versions.

<ul class="gallery" role="list" style="padding: 0;">
  {%- for item in gallery -%}
    <li>
      <a href="/assets/images/posts/{{ item.image | replace('./src/assets/images/posts/', '') }}">
        {% eleventyImage item.image, item.alt %}
      </a>
    </li>
  {%- endfor -%}
</ul>