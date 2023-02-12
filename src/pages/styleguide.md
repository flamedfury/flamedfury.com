---
title: Style Guide
seo:
  title: Flamed Fury Style Guide
permalink: /styleguide/index.html
description: This is the documented style guide for flamedfury.com.
layout: page
youtube: true
---

Flamed Fury Style guide included for my own reference.

A lot of markdown packages are installed to help write posts. They can be configured in `config/plugins/markdown.js`.

## h2 Heading

### h3 Heading

#### h4 Heading

Skate ipsum dolor sit amet, nose blunt mute-air deck sick. Axle axle set baseplate method air. Steve Caballero coper bail crailtap transition. Nose blunt hip fakie China Banks crail slide. McTwist concave Christ air steps nose-bump. Half-flip quarter pipe rails roll-in.

Mini ramp skate or die yeah Bonite nose blunt.

## hr

---

## Typographic replacements

**The replacement converts this input:**

```
(c) (C) (r) (R) (tm) (TM) (p) (P) +-
test.. test... test..... test?..... test!....
!!!!!! ???? ,, -- ---
"Smartypants, double quotes" and 'single quotes'
```

**To this:**

(c) (C) (r) (R) (tm) (TM) (p) (P) +-
test.. test... test..... test?..... test!....
!!!!!! ???? ,, -- ---
"Smartypants, double quotes" and 'single quotes'

## Emphasis

**This is bold text**
_This is italic text_
~~Strikethrough~~

## Blockquote

> Heel flip hanger Skateboarder masonite flail. Nosepicker shoveit dude lipslide. Madonna pivot fakie cab flip camel back. Crail grab masonite cab flip cess slide.

## Lists

### Unordered lists

- Create a list by starting a line with `+`, `-`, or `*`
- Sub-lists are made by indenting 2 spaces:
- Very simple!

### Ordered lists

1. Lorem ipsum dolor sit amet
2. Consectetur adipiscing elit
3. Integer molestie lorem at massa

## Code

Syntax highlighting is handled by 11ty's [Syntax Highlighting Plugin](https://www.11ty.dev/docs/plugins/syntaxhighlight/), a pack of Eleventy plugins for PrismJS syntax highlighting. No browser/client JavaScript, highlight transformations are all done at build-time.

```js
var foo = function (bar) {
  return bar++;
};

console.log(foo(5));
```

```css
*::after {
  box-sizing: border-box;
}

body {
  margin: 0;
}
```

Edit styles in `css/blocks/code.css`

## Tables

| Option | Description                                                               |
| ------ | ------------------------------------------------------------------------- |
| data   | path to data files to supply the data that will be passed into templates. |
| engine | engine to be used for processing templates. Handlebars is the default.    |
| ext    | extension to be used for dest files.                                      |

## Links

`rel="noreferrer noopener"` and `target="_blank"` is added automatically to external links. Edit styles in `css/global/global-styles.css`

[link text](https://github.com/flamedfury)
[link with title](https://github.com/flamedfury 'title text!')

Autoconverted link https://github.com/flamedfury (enabled via linkify)

### Emojis

Classic markup: :wink: :crush: :cry: :tear: :laughing: :yum:
Shortcuts (emoticons): :-) :-( 8-) ;)

### Mark

==Marked text==

### Footnotes

Footnote 1 link[^first].
Footnote 2 link[^second].
Inline footnote^[Text of inline footnote] definition.
Duplicated footnote reference[^second].

[^first]:
    Footnotes **can have markup**
    and multiple paragraphs.

[^second]: Footnote text.

\*[HTML]: Hyper Text Markup Language

## Media

### Images

Use Eleventy's build-time image transformations. More info at https://www.11ty.dev/docs/plugins/image/ and edit settings in `config/shortcodes/imagePlaceholder`.

Syntax:

{% raw %}

```
{% imagePlaceholder "path to image", "alt text", "caption - optional" %}
```

{% endraw %}

#### Image with caption

{% imagePlaceholder "./src/assets/images/kickflip.jpg", "Alt... a person riding a skateboard on top of a ramp about to pop a kickflip", "Caption.. Pop a kickflip!" %}


### YouTube

If there is ever a need to include a YouTube video, Justin Ribeiro's lite-youtube web component takes care off this. Add `youtube: true` to frontmatter to activate.

{% youtube 'A9hcJgtnm6Q', 'Mark Ronson x Miley Cyrus - Nothing Breaks Like a Heart' %}

## Redirects

URLs can change over time, pages are moved around or you update your file structure.

A 301 is used when a page has permanently changed location.
Informing about this change is indispensable if you want to keep your incoming links working, be it from organic Google search or other pages that have linked to your content.

Aleksandr Hovhannisyan came up with an [elegant solution for Eleventy and Netlify](https://www.aleksandrhovhannisyan.com/blog/eleventy-netlify-redirects/). To directly cover several possible previous routes it is created as an array. You can find the loop in `_redirects.njk`.

### Usage

{% raw %}

```yaml
Frontmatter:
---
redirectFrom: ['/old-route/', '/optionally-another-old-route/']
---
```
{% endraw %}
