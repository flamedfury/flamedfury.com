---
title: fLaMEds Homepage
layout: base.njk
eleventyNavigation:
  key: Home
---

Your first stop off of the Information Super Highway!

Kia ora 👋, I'm [fLaMEd](about) 🔥 and this is my homepage, a collection of stuff that I like.

I have had a passion for making homepages for a long time. There's always been a time in my life where I have had a homepage in one form or another.

This homepage is being constructed in public, it is constantly under construction. I will often push changes to it to try things out. I spend too much time coding and configuring and need to focus on writing the never ending stream of ideas and concepts down.

## Selected writing

- [My Web Manifesto](manifesto): I love the Internet, but not all things about the Internet. On this page, I dive deep into the current state of the Internet and explore whether it is heading in an ideal direction.
- [Early Web Memories](memories): This page details my earliest memories of getting online and surfing the web; I remember all the fun times and the not-so-fun times.

- [Gaming PC History](computerhistory): I love computer games, and I love building computers. On this page, I take a trip down memory lane and try to remember all the computers I have assembled over the years.

## Site updates

<ul class="updates">
{% for post in collections.updates | reverse | limit(5) %}
  <li>{{ post.templateContent | safe }}</li>
{% endfor %}
</ul>

All [site updates]({{ page | relative }}updates/).

---

If you've enjoyed your time here, please leave a message in my [guestbook](https://guestbook.flamedfury.com), or send me an [e-mail](mailto:flamed@flamedfury.com).

I won’t be able to respond to guestbook entries, I will respond to all e-mails.
