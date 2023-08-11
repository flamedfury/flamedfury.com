---
title: Create A Static Site Using 11ty & Deploy to Neocities
description: This is a simple guide to set up a simple static site or homepage using the static site generator 11ty and deploy it to Neocities.
tags: ["guides"]
layout: post
permalink: /guides/11ty-homepage-neocities/
date: 2022-01-26
updated: 2022-03-16
---

Kia ora, I'm hoping that this guide is going to provide a great starting point for those of you who have been happily constructing your homepages and hosting them on Neocities but want to take it to the next level.

This guide aims to help you create a homepage using the static site generator (SSG) [11ty](https://11ty.dev), commit the code to [Github](https://github.com) and using a Github action, deploy it to [Neocities](https://neocities.org).

The homepage that we are creating will take advantage of the [Nunjucks](https://mozilla.github.io/nunjucks/) templating language, allowing us to create a shared header, navigation and footer across all the pages on our homepage.

We will be creating an about, links, contact pages before diving in and creating the ability to add a blog and a list of all blog posts on the blog page!

We will structure and style the page with a standard HTML5 boilerplate and some basic CSS styles that should allow you to add in your unique flavour that we all know that you love to do.

<aside>
<p><strong>NOTE:</strong> This guide assumes the following:</p>
<ul>
  <li>You have a basic understanding of HTML and CSS</li>
  <li>You have a basic understanding of the command line and terminal</li>
  <li>You have Node.js installed</li>
  <li>You're using Visual Studio Code (VSCode) as your editor</li>
  <li>You have a Neocities account</li>
  <li>You have a Github account</li>
</ul>
</aside>

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

<aside>
  <p><strong>INFO:</strong> Typing `code .` into a project directory will open up the project directory in Visual Studio Code.</p>
</aside>

You should now be in VSCode with the following project structure:

{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-vscode.png", "A view of what your VSCode project should look like", "VSCode Project Structure" %}

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

<aside>
  <p><strong>INFO:</strong> This enables us to run <code>npm start</code> to have 11ty run our homepage with a hot-reload, which is provided by Browsersync that comes bundled as part of 11ty's <code>--serve</code> directive.</p>
  <p>This is super handy when working on your homepage locally so that everytime you make a change in VSCode, the browser running the local instance of your homepage will auto reload with your most recent changes, amazing!</p>
</aside>

## Create an 11ty config file

From the terminal (or VSCode), create a new file `.eleventy.js` at the project root:

```bash
touch .eleventy.js
```

Open the file in VSCode and add the following and save:

```js
module.exports = function (eleventyConfig) {
  return {
    dir: {
      input: "src",
      output: "public",
      includes: "_includes",
    },
  };
};
```

<aside>
  <p><strong>INFO:</strong> This configuration file tells 11ty what to do.</p>
  <p>Setting the <code>input</code> directory to <code>src</code> tells 11ty where to look for changes, this is our working directory.</p>
  <p>When changes are detected, 11ty builds the site and outputs it to the <code>output</code> directory <code>public</code> which is where the static html/css/img files are served from, amazing!
</aside>

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

<aside>
  <p><strong>INFO:</strong> The .gitignore file is a text file that tells Git which files or folders to ignore in a project.</p>
  <p>In this case, our <code>.gitignore</code> file tells git to ignore the <code>node_modules</code> directory and the <code>public</code> directory where our static files are built locally.</p>
</aside>

## Start building the homepage

Now comes the fun part, building our homepage. 11ty has a number of templating languages available to it, with markdown being the most popular. For this guide we're going to use plain old `<html>` as that will be most familiar to you.

<aside>
  <p><strong>CHALLENGE:</strong> If you've heard about <a href="https://www.markdownguide.org/">Markdown</a>, and want to give it a go, start having a read over on the <a href="https://www.11ty.dev/docs/languages/markdown/">11ty documentation pages</a>.</p>

  <p>The great thing about Markdown is that you can just write, with it's simple formatting without <code>&lt;html&gt;</code> tags getting  in the way of your flow.
</aside>

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
      Check out your cool new static site built with
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


{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-homepage-001.png", "A view of what your index file should look like", "A Basic Hello World HTML Page" %}

Amazing! But what we want to avoid is having to write out the `<html>` and `<head>` and `<body>` tags on each and every page, and be able to include a site header, navigation and footer so we don't have to copy and paste the changes across every page each time we update.

Let's checkout templating a layout!

### Create a base layout

Create a new directory `_includes/` in the `src/` directory and cd into it:

```bash
mkdir _includes && cd _includes
```

<aside>
  <p><strong>INFO:</strong> In a non-demo situation I would create a <code>layouts/</code> directory under <code>_includes/</code> for better organisation. For the sake of simplicity we'll just keep everything in <code>_includes/</code> for now.
</aside>

Create a file `base.njk` in the terminal or VSCode:

```bash
touch base.njk
```

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

<aside>
  <p><strong>INFO:</strong> We've created <code>base.njk</code> as a Nunjucks tempalte file, hence the <code>.njk</code> file extension. This means we can use Nunjucks' double curly braces for using frontmatter variables.</p>
  <p>In our layout template we're calling <code>{% raw %}{{ title }}{% endraw %}</code> and <code>{% raw %}{{ content }}{% endraw %}</code>.</p>
</aside>

Now, head back to the `index.html` file you created earlier, delete the contents and add some front matter and some content:

```html
---
title: Hello World!
layout: base.njk
---

<p>
  Check out your cool new static site built with
  <a href="https://11ty.dev">11ty</a> on
  <a href="https://neocities.org/">Neocities</a>.
</p>

<p>This homepage template is perfect for:</p>

<ul>
  <li>Creating your own space on the web</li>
  <li>Expressing yourself</li>
  <li>Displaying all the gifs you've collected</li>
</ul>

<h2>Why do you want a homepage?</h2>
<p>The web was made for personal homepages, make this one yours</p>
```

If you've kept 11ty running and the broswer running it should look like this:

{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-homepage-002.png", "A view of what your index file should look like now that you're using a tempalte", "A Basic Hello World HTML Page Using a Template" %}

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
  <li><a href="https://11ty.dev">11ty</a></li>
  <li><a href="https://neocities.org">Neocities</a></li>
  <li><a href="https://yesterweb.org/">The Yesterweb</a></li>
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

<aside>
  <p><strong>INFO:</strong> In a non-demo situation I would create a <code>partials/</code> directory under <code>_includes/</code> for better organisation. For the sake of simplicity we'll just keep everything in <code>_includes/</code> for now.
</aside>

In the terminal cd into `_includes/` and create two partial files:

```bash
cd _includes && touch header.njk && touch navigation.njk && touch footer.njk
```

Open each of them up and add some front matter and content:

header.njk:

```html
<h1>Welcome to my Homepage</h1>
```

navigation.njk

```html
<a href="/">Home</a>
<a href="/about/">About</a>
<a href="/links/">Links</a>
<a href="/blog/">Blog</a>
<a href="/contact/">Contact</a>
```

<aside>
  <p><strong>INFO:</strong> It's important to stucture your links with the slashes <code>/</code> on either side of the href <code>/about/</code> to ensure the links are always from the root of the site.</p>
</aside>

footer.njk:

```html
<p>This is my footer | © 2022 Me.</p>
```

Once our paritals are created, open `base.njk` again and update to include our new elements and partials:

base.njk:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <title>{% raw %}{{ title }}{% endraw %}</title>
</head>

<body>
  <header>{% raw %}{% include 'header.njk' %}{% endraw %}</header>

  <nav>{% raw %}{% include 'navigation.njk' %}{% endraw %}</nav>

  <main>
    <h1>{% raw %}{{ title }}{% endraw %}</h1>
    {% raw %}{{ content | safe }}{% endraw %}
  </main>

  <footer>{% raw %}{% include 'footer.njk' %}{% endraw %}</footer>
</body>
```

If you've kept 11ty running and the broswer running it should look like this:

{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-homepage-003.png", "A view of what your index file should look like now that you've added your partial tempalte files", "A Basic Hello World HTML Page Using a Template and Partials" %}

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

<aside>
  <p><strong>INFO:</strong> What we've done here with the directory file `blog.json` is made it so that every `blog post` in the `/blog/` directory has the `blog.njk` layout applied without having to include in the post front matter.</p>
</aside>

We better create a blog layout so it renders!

Head back to the `_includes` directory to create a new layout file:

```bash
cd ../_includes && touch blog.njk
```

Open `blog.njk` up in VSCode and add the following:

blog.njk:

```html
---
layout: base.njk
---

<article>{% raw %}{{ content | safe}}{% endraw %}</article>
```

<aside>
  <p><strong>INFO:</strong> What we've done here is called layout chaining. This is an 11ty feature that lets us extend a child layout from our base layout. That way if we make changes to our `base.njk` layout file, the child layouts like `blog.njk` get the same changes.</p>
</aside>

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
  {% raw %}{% for post in collections.blog | reverse %}{% endraw %}
  <li>
    <a href="{{ post.url }}">{% raw %}{{ post.data.title }}{% endraw %}</a>
  </li>
  {% raw %}{% endfor %}{% endraw %}
</ul>
```

If you've kept 11ty running and the broswer running it should look like this:


{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-homepage-004.png", "A view of what your blog page should look like", "A Basic Blog List Page" %}

Amazing huh?

## Add some styles

Great, so far we have a fully functional home page, but it doesn't look quite right. We need a style sheet.

Create a new `css` directory in `src` cd into it and create `styles.css`:

```bash
mkdir css && cd css && touch styles.css
```

Open `styles.css` in VSCode and add the following:

styles.css:

```css
/* Global variables. */
:root {
  /* Set sans-serif & mono fonts */
  --sans-font: -apple-system, BlinkMacSystemFont, "Avenir Next", Avenir,
    "Nimbus Sans L", Roboto, Noto, "Segoe UI", Arial, Helvetica,
    "Helvetica Neue", sans-serif;
  --mono-font: Consolas, Menlo, Monaco, "Andale Mono", "Ubuntu Mono", monospace;

  /* Default (light) theme */
  --bg: #fff;
  --accent-bg: #f5f7ff;
  --text: #333;
  --text-light: #585858;
  --border: #d8dae1;
  --accent: #0d47a1;
}

/* Dark theme */
@media (prefers-color-scheme: dark) {
  :root {
    --bg: #212121;
    --accent-bg: #2b2b2b;
    --text: #dcdcdc;
    --text-light: #ababab;
    --border: #666;
    --accent: #ffb300;
  }
}

* {
  box-sizing: border-box;
}

html {
  /* Set the font globally */
  font-family: var(--sans-font);
  scroll-behavior: smooth;
}

/* Make the body a nice central block */
body {
  color: var(--text);
  background: var(--bg);
  font-size: 1.15rem;
  line-height: 1.5;
  margin: 0 auto;
  max-width: 40em;
  padding: 0 1em;
}

body > header {
  text-align: center;
  padding: 0 0.5rem 2rem 0.5rem;
  box-sizing: border-box;
}

body > header h1 {
  max-width: 100%;
  margin: 1rem auto;
}

/* Format navigation */
nav {
  border-bottom: 1px solid var(--border);
  font-size: 1rem;
  line-height: 2;
  padding: 1rem 0;
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding-bottom: 2rem;
}

nav a {
  margin: 1rem 1rem 0 0;
  color: var(--text) !important;
  padding: 0.1rem 1rem;
}

nav a:hover {
  color: var(--accent) !important;
}

nav a:last-child {
  margin-right: 0;
}

/* Reduce nav side on mobile */
@media only screen and (max-width: 750px) {
  nav a {
    border: none;
    padding: 0;
    color: var(--accent);
    text-decoration: underline;
    line-height: 1;
  }
}

/* Add a little padding to ensure spacing is correct between content and nav */
main {
  padding-top: 1.5rem;
}

body > footer {
  margin-top: 4rem;
  padding: 2rem 1rem 1.5rem 1rem;
  color: var(--text-light);
  font-size: 0.9rem;
  text-align: center;
  border-top: 1px solid var(--border);
}

/* Format headers */

h1 {
  font-size: 3rem;
}

h2 {
  font-size: 2.6rem;
  margin-top: 3rem;
}

/* Reduce header size on mobile */
@media only screen and (max-width: 720px) {
  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2.1rem;
  }
}

/* Format links */
a,
a:visited {
  color: var(--accent);
}

a:hover {
  text-decoration: none;
}
```
This is a stripped down version of <a href="https://simplecss.org/">Simple.css</a>. Thanks <a href="https://kevq.uk/">KevQ</a>.

Now we need to include the style sheet in our `base.njk` layout file. Open it up and add `<link rel="stylesheet" href="/css/styles.css" />`

\_includes/base.njk:

```html
<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <link rel="stylesheet" href="/css/styles.css" />
  <title>{% raw %}{{ title }}{% endraw %}</title>
</head>

<body>
  <header>{% raw %}{% include 'header.njk' %}{% endraw %}</header>

  <nav>{% raw %}{% include 'navigation.njk' %}{% endraw %}</nav>

  <main>
    <h1>{% raw %}{{ title }}{% endraw %}</h1>
    {% raw %}{{ content | safe }}{% endraw %}
  </main>

  <footer>{% raw %}{% include 'footer.njk' %}{% endraw %}</footer>
</body>
```

You would have noticed that the stylesheet hasn't been applied, we have to a couuple more things in `.eleventy.js`, something called file passthrough copy.

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

<aside>
  <p><strong>INFO:</strong> PassthroughCopy is used for passing through static asset files such as stylesheets, images, fonts, and javescript files.</p>
</aside>

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

{% imagePlaceholder "./src/assets/images/guides/11ty-home-page-neocities-homepage-005.png", "A view of what your blog page should look like with the stylesheet applied", "A Nicely Styled Homepage" %}

Amazing! Now if you're happy with that you can take the contents of the `public` directory and upload those to Neocities, however, the key thing in this is automating the rest with Github and the Neocities API - check again soon for the next parts where we will do just that.

---

Reference: I created this guide based heavily on the existing guides:

- [Create Your First Basic 11ty Website](https://11ty.rocks/posts/create-your-first-basic-11ty-website/)
- [Itsiest, Bitsiest Eleventy Tutorial](https://sia.codes/posts/itsiest-bitsiest-eleventy-tutorial/)

Without these, I wouldn't even know how to write down what I needed to.