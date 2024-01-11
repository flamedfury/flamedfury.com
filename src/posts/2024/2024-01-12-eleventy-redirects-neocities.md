---
title: A Simple Guide to Redirects on Neocities with Eleventy
description: We need more tutorials for using Eleventy outside of Netlify. Lets take a look at setting up redirects on Neocities with Eleventy.
tags:
  - eleventy
  - web
  - guides
date: 2024-01-12
---

[Eleventy tutorials](https://11tybundle.dev/) are everywhere, especially for Netlify. But what if you're exploring platforms like [Neocities](https://neocities.org/)? No worries, I've got your back.

For reasons, I've just moved Flamed Fury back to [Neocities](https://neocities.org/). Redirects is one of the things that I was relying on Netlify to handle for me. Netlify allows you to handle [HTTPS redirects](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#permanent_redirections) easily with[Eleventy](https://11ty.dev).

After some quick web searching, it was clear that Neocities does not support HTTPS redirects, so what was I to do with my redirects where I didn't have access or control of the server? Luckily, gold old HTML has us covered with [HTML redirects](https://developer.mozilla.org/en-US/docs/Web/HTTP/Redirections#html_redirections).

With HTML, you can create a simple redirect with a `<meta>` tag.

```html
<head>
  <meta http-equiv="Refresh" content="0; URL=https://flamedfury.com/" />
</head>
```

How could I do this simply in the Eleventy way? Sure, I could recreate each of the old HTML pages and fill in the `<meta>` tag to redirect to the new URLs, but that would be tedious to maintain. 

After some more web searching I came across this post, [Eleventy Redirect From](https://brianm.me/posts/eleventy-redirect-from/) by [Brian Mitchell](https://brianm.me/) where they wanted a drop-in replacement for [Jekyll redirects](https://github.com/jekyll/jekyll-redirect-from) but in Eleventy.

Brian achieved this with a [single template](https://gist.github.com/BrianMitchL/f93622a46f4476b7514995ff502d8d17) that I figured out after a "period of time" troubleshooting needs to be in the `/src/` directory to work :joy:

My redirects were configured to support the Netlify way and used the key `redirectFrom`. 

For example, a single redirect:

```yaml
---
title: I Love The Web
redirectFrom: ['manifesto']
---
```

Or multiple redirects:

```yaml
---
title: Relics Of The Web
redirectFrom: ['/explore/', '/explore/buttonwall/', '/explore/webrings/', '/explore/blogroll/', '/explore/links/']
---
```

To get to work without modifying my existing frontmatter, I just had to change `redirect_from` to `redirectFrom` in the template.

```js
---js
{
  pagination: {
    data: "collections.all",
    size: 1,
    alias: "redirect",
    before: function (data) {
      return data.reduce((redirects, page) => {
        if (Array.isArray(page.data.redirectFrom)) {
          for (let url of page.data.redirectFrom) {
            redirects.push({ to: page.url, from: url });
          }
        } else if (typeof page.data.redirectFrom === 'string') {
          redirects.push({ to: page.url, from: page.data.redirectFrom });
        }
        return redirects;
      }, []);
    },
    addAllPagesToCollections: false,
  },
  permalink: "{{ redirect.from }}/index.html",
  eleventyExcludeFromCollections: true,
}
---
<!DOCTYPE html>
  <html lang="en-US">
  <meta charset="utf-8">
  <title>Redirecting&hellip;</title>
  <link rel="canonical" href="{{ redirect.to | url }}">
  <script>location="{{ redirect.to | url }}"</script>
  <meta http-equiv="refresh" content="0; url={{ redirect.to | url }}">
  <meta name="robots" content="noindex">
  <h1>Redirecting&hellip;</h1>
  <a href="{{ redirect.to | url }}">Click here if you are not redirected.</a>
</html>f
```

If I did this correctly, then you should be able to click on the old [Explore](/explore/) link and be redirected to the [Relics Of The Web](/posts/relics-of-the-web/) post.

Thanks again to [Brian](https://brianm.me/) for doing the heavy lifting and getting me going.

Let me know if anything needs to be fixed or if this helped you with your Eleventy-built homepage on Neocities!