---
title: Create A Static Site Using 11ty & Deploy to Neocities
description: This is a simple guide to set up a simple static site or homepage using the static site generator 11ty and deploy it to Neocities.
css: "/css/prisim.css"
date: 2022-02-05
---

Kia ora, I'm hoping that this guide is going to provide a great starting point for those of you who have been happily constructing your homepages and hosting them on Neocities but want to take it to the next level.

This guide aims to help you create a homepage using the static site generator (SSG) [11ty](https://11ty.dev), commit the code to [Github](https://github.com) and using a Github action, deploy it to [Neocities](https://neocities.org).

The homepage that we are creating will take advantage of the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language, allowing us to create a shared header, navigation and footer across all the pages on our homepage.

We will be creating an about, links, contact pages before diving in and creating the ability to add a blog and a list of all blog posts on the blog page!

We will structure and style the page with a standard HTML5 boilerplate and some basic CSS styles that should allow you to add in your unique flavour that we all know that you love to do.

<div class="info-box">
<p><strong>NOTE:</strong> This guide assumes the following:</p>
<ul>
  <li>You have a basic understanding of HTML and CSS</li>
  <li>You have a basic understanding of the command line and terminal</li>
  <li>You have Node.js installed</li>
  <li>You're using Visual Studio Code (VSCode) as your editor</li>
  <li>You have a Neocities account</li>
  <li>You have a Github account</li>
</ul>
</div>

## Create a new project

First off, from a terminal, confirm that you have Node and NPM instlled:

```bash
node -v && npm -v
v17.4.0
8.3.0
```

Create a new directory and cd into it:

```bash
mkdir 11ty-neocities && cd 11ty-neocities
```

Initiate a new project:

```bash
npm init -y
```

Install 11ty:

```bash
npm install @11ty/eleventy
```

Once the 11ty installation is complete, open the project in your favourite code editor:

```bash
code .
```

<div class="info-box">
  <p><strong>INFO:</strong> Typing `code .` into a project directory will open up the project directory in Visual Studio Code.</p>
</div>

You should now be in VSCode with the following project structure:

![A view of what your VSCode project should look like]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-vscode.png "VSCode Project Structure")

Open `packages.json` and update the scriptions section to the following:

```js
  "scripts": {
    "start": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
  },
```

The `packages.json` file should look like this:

```js
{
  "name": "11ty-neocities",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "npx @11ty/eleventy --serve",
    "build": "npx @11ty/eleventy"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@11ty/eleventy": "^1.0.0"
  }
}
```

<div class="info-box">
  <p><strong>INFO:</strong> This enables us to run <code>npm start</code> to have 11ty run our homepage with a hot-reload, which is provided by Browsersync that comes bundled as part of 11ty's <code>--serve</code> directive.</p>
  <p>This is super handy when working on your homepage locally so that everytime you make a change in VSCode, the browser running the local instance of your homepage will auto reload with your most recent changes, amazing!</p>
</div>

## Create an 11ty config file

From the terminal (or VSCode), create a new file `.eleventy.js` at the project root:

```bash
touch .elventy.js
```

Open the file in VSCode and add the following and save:

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
      layouts: "_includes/layouts",
      partials: "_includes/partials",
    },
  };
};
```

<div class="info-box">
  <p><strong>INFO:</strong> This configuration file tells 11ty what to do.</p>
  <p>Setting the <code>input</code> directory to <code>src</code> tells 11ty where to look for changes, this is our working directory.</p>
  <p>When changes are detected, 11ty builds the site and outputs it to the <code>output</code> directory <code>public</code> which is where the static html/css/img files are served from, amazing!
</div>

### .gitignore

As we're going to be commiting our homepage code to Github, create a `.gitignore` file in the project root:

```bash
touch .gitignore
```

Open the file in VSCode and add the following and save:

```md
# dependencies installed by npm

node_modules

# build artefacts

public
```

<div class="info-box">
  <p><strong>INFO:</strong> The .gitignore file is a text file that tells Git which files or folders to ignore in a project.</p>
  <p>In this case, our <code>.gitignore</code> file tells git to ignore the <code>node_modules</code> directory and the <code>public</code> directory where our static files are built locally.</p>
</div>

## Start building the homepage

Now comes the fun part, building our homepage. 11ty has a number of templating languages available to it, with markdown being the most popular. For this guide we're going to use plain old `<html>` as that will be most familiar to you.

<div class="info-box">
  <p><strong>CHALLENGE:</strong> If you've heard about <a href="https://www.markdownguide.org/">Markdown</a>, and want to give it a go, start having a read over on the <a href="https://www.11ty.dev/docs/languages/markdown/">11ty documentation pages</a>.</p>

  <p>The great thing about Markdown is that you can just write, with it's simple formatting without <code>&lt;html&gt;</code> tags getting  in the way of your flow.
</div>

Create a `src` directory at the project root and cd into it:

```bash
mkdir src && cd src
```

Create an `index.html` file in the terminal or VSCode:

```bash
touch index.html
```

Open the file and add some content:

```html
<html>
  <head>
    <title>My New 11ty Homepage on Neocities!</title>
  </head>
  <body>
    <h1>Hello World</h1>

    <p>
      Check out my cool new static site built with
      <a href="https://11ty.dev">11ty</a> on
      <a href="https://neocities.org/">Neocities</a>.
    </p>
  </body>
</html>
```

Now from the terminal start 11ty:

```bash
npm start
```

If everything has been configured right so far you should see the following:

```bash
> 11ty-neocities@1.0.0 start
> npx @11ty/eleventy --serve

[11ty] Writing public/index.html from ./src/index.html (liquid)
[11ty] Wrote 1 file in 0.03 seconds (v1.0.0)
[11ty] Watching…
[Browsersync] Access URLs:
 -----------------------------------
    Local: http://localhost:8080
 External: http://192.168.1.119:8080
 -----------------------------------
[Browsersync] Serving files from: public

```

Now you can open up `http://localhost:8080` and check out your new 11ty homepage! It should look like this:

![A view of what your index file should look like]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-homepage-001.png "A Basic Hello World HTML Page")

Amazing! But what we want to avoid is having to write out the `<html>` and `<head>` and `<body>` tags on each and every page, and be able to include a site header, navigation and footer so we don't have to copy and paste the changes across every page each time we update.

Let's checkout templating a layout!

### Create a base layout

Create a new directory `_includes/` in the `src/` directory and cd into it:

````bash
mkdir _includes && cd _includes
``

Create a file `base.njk` in the terminal or VSCode:

```bash
touch base.njk
````

Open the file and add the following:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{% raw %}{{ title }}{% endraw %}</title>
  </head>
  <body>
    <header>
      <h1>{% raw %}{{ title }}{% endraw %}</h1>
    </header>
    <main>{% raw %}{{ content | safe }}{% endraw %}</main>
  </body>
</html>
```

<div class="info-box">
  <p><strong>INFO:</strong> We've created <code>base.njk</code> as a Nunjucks tempalte file, hence the <code>.njk</code> file extension. This means we can use Nunjucks' double curly braces for using frontmatter variables.</p>
  <p>In our layout template we're calling <code>{% raw %}{{ title }}{% endraw %}</code> and <code>{% raw %}{{ content }}{% endraw %}</code>.</p>
</div>

Now, head back to the `index.html` file you created earlier, delete the contents and add some front matter and some content:

```html
---
title: Hello World!
layout: base.njk
---

<p>
  Check out my cool new static site built with
  <a href="https://11ty.dev">11ty</a> on
  <a href="https://neocities.org/">Neocities</a>.
</p>
```

If you've kept 11ty running and the broswer running it should look like this:

![A view of what your index file should look like now that you're using a tempalte]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-homepage-002.png "A Basic Hello World HTML Page Using a Template")

Amazing! Now lets create the additional pages for our homepage.

Create the following pages in the `src/` directory with the terminal or VSCode:

```bash
touch about.html && touch links.html && touch contact.html
```

Open each of them up and add in some front matter and content:

about.html:

```html
---
title: About Me
layout: base.njk
---

<p>Heya 👋 this is my homepage.</p>
```

links.html:

```html
---
title: Links
layout: base.njk
---

<p>These are some of my favourite websites 🔗</p>
<ul>
  <li><a href="https://flamedfury.com">fLaMEdFury.com</a></li>
  <li><a href="https://neocities.org">Neocities</a></li>
  <li><a href="https://news.ycombinator.com">Hacker News</a></li>
  <li>
    <a href="https://www.marvel.com/comics/">Marvel Comics</a>
  </li>
</ul>
```

contact.html:

```html
---
title: Contact Me
layout: base.njk
---

<p>Heya 👋 this is my contact page</p>
```

You should now be able to browse each of these pages if you kept 11ty running on the following urls:

`http://localhost:8080/about/`
`http://localhost:8080/links/`
`http://localhost:8080/contact/`

Great stuff, but that's no use without a navigation! Let's take a look at `partials` and create a shared `header`,`navigation`, and `footer` to bring our homepage together.

### Creating our partials

In the terminal cd into `_includes/` and create two partial files:

```bash
cd _includes && touch header.njk && touch navigation.njk && touch footer.njk
```

Open each of them up and add some front matter and content:

header.njk:

```html
<span class="heading-title">My Homepage</span>
```

navigation.njk

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/links/">Links</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
```

<div class="info-box">
  <p><strong>INFO:</strong> It's important to stucture your links with the slashes <code>/</code> on either side of the href <code>/about/</code> to ensure the links are always from the root of the site.</p>
</div>

footer.njk:

```html
<p>This is my footer | © 2022 fLaMEd.</p>
```

Once our paritals are created, open `base.njk` again and update to include our new elements and partials:

base.njk:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>{{ title }}</title>
  </head>

  <body>
    <header>{% raw %}{% include 'header.njk' %}{% endraw %}</header>
    <nav>{% raw %}{% include 'navigation.njk' %}{% endraw %}</nav>

    <main>
      <h1>{{ title }}</h1>
      {{ content | safe }}
    </main>

    <footer>{% raw %}{% include 'footer.njk' %}{% endraw %}</footer>
  </body>
</html>
```

If you've kept 11ty running and the broswer running it should look like this:

![A view of what your index file should look like now that you've added your partial tempalte files]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-homepage-003.png "A Basic Hello World HTML Page Using a Template and Partials")

Amazing! Now lets add the blog.

### Creating the blog

Create a new directory `blog` in the `src` directory and cd into it:

```bash
mkdir blog && cd blog
```

Create the following pages in the `src/blog` directory with the terminal or VSCode:

```bash
touch my-first-post.html && touch my-second-post.html && touch my-third-post.html && blog.json
```

Awesome, Open each of them up in VSCode and add the following:

my-first-post.html:

```html
---
title: My First Blog Post
---

<p>This is my first blog post</p>
```

my-second-post.html:

```html
---
title: My Second Blog Post
---

<p>This is my second blog post</p>
```

my-third-post.html

```html
---
title: My Third Blog Post
---

<p>This is my third and final blog post</p>
```

blog.json

```json
{
  "layout": "blog"
}
```

<div class="info-box">
  <p><strong>INFO:</strong> What we've done here with the directory file `blog.json` is made it so that every `blog post` in the `/blog/` directory has the `post.njk` layout applied without having to include in the post front matter.</p>
</div>

We better create a blog layout so it renders!

Head back to the `_includes` directory to create a new layout file:

```bash
cd ../_includes && touch blog.njk
```

Open `blog.njk` up in VSCode and add the following:

post.njk:

```html
---
layout: base.njk
---

<article>{% raw %}{{ content | safe}}{% endraw %}</article>
```

<div class="info-box">
  <p><strong>INFO:</strong> What we've done here is called layout chaining. This is an 11ty feature that lets us extend a child layout from our base layout. That way if we make changes to our `base.njk` layout file, the child layouts like `blog.njk` get the same changes.</p>
</div>

Check that your blog posts are loading:

- [http://localhost:8080/blog/my-first-post/](http://localhost:8080/blog/my-first-post/)
- [http://localhost:8080/blog/my-first-post/](http://localhost:8080/blog/my-second-post/)
- [http://localhost:8080/blog/my-first-post/](http://localhost:8080/blog/my-third-post/)

Amazing right? But to make it a blog, we need a blog page that lists all of our blog posts in chronological order. We can do this with a `tags` collection:

Open `blogs.json` again and add a key called `tags` with a value of `blog`:

blog.json:

```json
{
  "layout": "blog",
  "tags": "blog"
}
```

Now 11ty has created a collection called `posts` and all we have to do ist list them.

Head back to the `src/` directory create a `blog.html` file:

```bash
cd .. && touch blog.html
```

Open it and add the following:

blog.html:

```html
---
title: This Is My Blog
layout: base.njk
---

These are all of my amazing blog posts, enjoy!
<ul>
  {% for post in collections.blog | reverse %}
  <li>
    <a href="{{ post.url }}">{{ post.data.title }}</a>
  </li>
  {% endfor %}
</ul>
```

If you've kept 11ty running and the broswer running it should look like this:

![A view of what your blog page should look like]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-homepage-004.png "A Basic Blog List Page")

Amazing huh? Let's add a `/blog/` navigation item to our `nagivation` partial:

\_includes/navigation.njk:

```html
<nav>
  <ul>
    <li><a href="/">Home</a></li>
    <li><a href="/about/">About</a></li>
    <li><a href="/links/">Links</a></li>
    <li><a href="/blog/">Blog</a></li>
    <li><a href="/contact/">Contact</a></li>
  </ul>
</nav>
```

## Add some styles

Great, so far we have a fully functional home page, but it doesn't look quite right. We need a style sheet.

Create a new `css` directory in `src` cd into it and create `styles.css`:

```bash
mkdir css && cd css && touch styles.css
```

Open `styles.css` in VSCode and add the following:

styles.css:

```css
/* variables */

:root {
  --color-pri: #333;
  --color-sec: #555;
  --color-brand: #e81c4f;
  --color-nav: #fff;
  --color-light: #ddd;
}

/* base */

* {
  box-sizing: border-box;
}

body {
  font-size: 1rem;
  font-family: sans-serf;
}

img {
  display: block;
  max-width: 100%;
}

/* layout */

body {
  margin: 0 auto;
  max-width: 50em;
}

header {
  padding: 1.875rem;
  text-align: center;
}

footer {
  padding: 1rem;
  text-align: center;
}

/* nav */
nav {
  overflow: hidden;
  background-color: #333;
}

nav a {
  float: left;
  display: block;
  color: var(--color-nav);
  text-align: center;
  padding: 1rem;
  text-decoration: none;
}

nav a:hover {
  background-color: var(--color-light);
  color: var(--color-pri);
}

/* spacing */
body {
  line-height: 1.5;
}

main {
  padding: 4em 1em;
}

p {
  padding: 1rem 0;
}

.heading-title {
  font-size: 3.125rem;
}

/* colours */

body {
  color: var(--color-sec);
}

header {
  background-color: var(--color-sec);
}

footer {
  color: var(--color-light);
  background-color: var(--color-sec);
}

h1 {
  color: var(--color-pri);
}

a {
  color: var(--color-brand);
}

.heading-title {
  color: var(--color-light);
}
```

Now we need to include the style sheet in our `base.njk` layout file. Open it up and add `<link rel="stylesheet" href="/css/styles.css" />`

\_includes/base.njk:

```html
<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <link rel="stylesheet" href="/css/styles.css" />
    <title>{{ title }}</title>
  </head>

  <body>
    <header>{% raw %}{% include 'header.njk' %}{% endraw %}</header>

    <main>
      <h1>{{ title }}</h1>
      {% raw %}{{ content | safe }}{% endraw %}
    </main>

    <footer>{% raw %}{% include 'footer.njk' %}{% endraw %}</footer>
  </body>
</html>
```

You would have noticed that the stylesheet hasn't been applied, we have to a couuple more things in `.elventy.js`, something called file passthrough copy.

Open `.eleventy.js` in VSCode and add the following:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
```

<div class="info-box">
  <p><strong>INFO:</strong> PassthroughCopy is used for passing through static asset files such as stylesheets, images, fonts, and javescript files.</p>
</div>

Because this will come up we may as well create the directories and add in the configuration for our images, fonts and javascript files.

Create the following directories in `src`:

```bash
mkdir img && mkdir fonts && mkdir js
```

Update `.eleventy.js` again:

```js
module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/img");
  eleventyConfig.addPassthroughCopy("./src/fonts");
  eleventyConfig.addPassthroughCopy("./src/js");

  return {
    passthroughFileCopy: true,
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
```

Just make sure you put all your static files in the appropriate directory and you'll be good.

So finally, if you've kept 11ty running and the broswer running it should look like this:

![A view of what your blog page should look like with the stylesheet applied]({{ page | relative }}/img/guides/11ty-home-page-neocities/11ty-home-page-neocities-homepage-005.png "A Nicely Styled Homepage")

Amazing! Now if you're happy with that you can take the contents of the `public` directory and upload those to Neocities, however, the key thing in this is automating the rest with Github and the Neocities API - check again soon for the next parts where we will do just that.

---

Reference: I created this guide based heavily on the existing guides:

- [Create Your First Basic 11ty Website](https://11ty.rocks/posts/create-your-first-basic-11ty-website/)
- [Itsiest, Bitsiest Eleventy Tutorial](https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/)

Without these, I wouldn't even know how to write down what I needed to.

---

- _First published Feb 06, 2022_
- _Last updated Feb 06, 2022_
