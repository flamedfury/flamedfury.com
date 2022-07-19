---
title: Bookshelf 📚
description: my collection of books
layout: page.njk
eleventyNavigation:
  key: Bookshelf
  parent: Home
---

I've always been a big reader. apparently, I was quick to pick up books and was able to read at a level above my age. this really helped me immerse myself and get lost in the stories. I mostly enjoy fiction, sci-fi, and fantasy.

During early school years I remember loving the [Pizza Hut Book It!](https://www.bookitprogram.com/) program, which looks to be still active. how it worked was you would read a bunch of books, collect certificates and exchange these for personal pan pizzas at pizza hut, awesome. This program has been running since 1984, wow!

The other program that got me excited for reading was the [Scholastic Book Club](https://www.scholastic.co.nz/schools/book-club/), which is also still running. I loved when the brochures would get handed out to us in class and couldn't wait to get home to decide what books I'd ask my parents to buy for me to read. Sometimes they would get them for me too.

## Impactful Books and Authors

My earliest memory of really getting into books was during school in the early 90s. The Deepwater trilogy and Seddon Street Gang trilogy both stand out to me vividly. It took me a while to figure out what the Deepwater trilogy was called, but a quick search through the web revealed all, I was plesantly suprised that it was also written by a kiwi author.

### Deepwater trilogy
Deepwater Trilogy by [Ken Catran](https://www.read-nz.org/writer/catran-ken/) ([wikipedia](https://en.wikipedia.org/wiki/Deepwater_trilogy))
- Deepwater Black (1992)
- Deepawter Landing (1993)
- Deepwater Angels (1994)

### Seddon Street Gang trilogy
Seddon Street Gang trilogy by [Jack Lasenby](https://www.read-nz.org/writer/lasenby-jack/) ([wikipedia](https://en.wikipedia.org/wiki/Jack_Lasenby))
- Dead Man’s Head (1994)
- The Waterfall (1995)
- The Battle of Pook Island (1996)

There are a few authors who I will go out of my way to read all of their books. In a way this makes it hard for me to branch out. I've spent a lot of hours reading these authors work.

- Raymond E. Feist
- Peter F. Hamilton
- James S.A. Corey
- George R.R. Martin

Impact wise for the authors above, I'll talk about Feist first. I picked up a book from my dads bookshelf one day and was immediately sucked in. I was quick to get immersed in the story and couldn't put it down, even if a lot of it didn't make sense. The book was [Shards of a Broken Crown](https://en.wikipedia.org/wiki/Shards_of_a_Broken_Crown), book 4 of a set of 4 and 12 in the entire series to date. This was great news for me as I quickly picked myself a copy of [Magician](https://en.wikipedia.org/wiki/Magician_(Feist_novel)) and worked my way through all the books he had written. It was only a few years ago that I finished up with the world of Midkemia with [Magician's End](https://en.wikipedia.org/wiki/Magician%27s_End), the last book in the Chaoswar Saga and the final book in the entire Riftwar Cycle.

## Currently reading

The book(s) that I'm currently reading.

{% set recentlyRead = oku.collections[1].books | limit(9) %}
{% if recentlyRead.length %}
<div class="flex-grid">
{% for item in recentlyRead %}
{% if item.thumbnail %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="{{ item.thumbnail }}" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% else %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="../img/generic-cover.png" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% endif %}
{% endfor %}
</div>
{% endif %}

## Want to read

Books that I have lined up ready to read.

{% set recentlyRead = oku.collections[3].books | limit(9) %}
{% if recentlyRead.length %}
<div class="flex-grid">
{% for item in recentlyRead %}
{% if item.thumbnail %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="{{ item.thumbnail }}" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% else %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="../img/generic-cover.png" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% endif %}
{% endfor %}
</div>
{% endif %}

## Recently read books

Here are the last books that I've read.

{% set recentlyRead = oku.collections[2].books | limit(9) %}
{% if recentlyRead.length %}
<div class="flex-grid">
{% for item in recentlyRead %}
{% if item.thumbnail %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="{{ item.thumbnail }}" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% else %}
<div class="flex-grid__cell">
<a href="https://oku.club/book/{{ item.slug }}">
<img src="../img/generic-cover.png" alt="book cover for {{ item.title }} by {{ item.authors[0]['name'] }}" width="150px">
</a>
</div>
{% endif %}
{% endfor %}
</div>
{% endif %}

---
_Last updated {% currentDate %}_