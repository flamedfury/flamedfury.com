<?xml version="1.0" encoding="utf-8"?>
<xsl:stylesheet version="3.0" xmlns:xsl="http://www.w3.org/1999/XSL/Transform" xmlns:atom="http://www.w3.org/2005/Atom" xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:itunes="http://www.itunes.com/dtds/podcast-1.0.dtd">
  <xsl:output method="html" version="1.0" encoding="UTF-8" indent="yes"/>
  <xsl:template match="/">
    <html xmlns="http://www.w3.org/1999/xhtml" lang="en">
      <head>
        <title><xsl:value-of select="/rss/channel/title"/><xsl:value-of select="/atom:feed/atom:title"/> Web Feed</title>
        <meta http-equiv="Content-Type" content="text/html; charset=utf-8"/>
        <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
        <link rel="stylesheet" href="/assets/css/global.css"/>
        <link rel="stylesheet" href="/assets/css/local/feeds.css"/>
      </head>
      <body class="feed">
        <nav class="feed-nav">
          <aside class="aside flow skateboard">
            <div class="aside__content">
              <p><strong>Hey! This is a web feed</strong> (RSS/Atom). <strong>Want updates?</strong> Copy the URL below into your favorite feed reader to stay in the loop!</p>

              <p><code class="feed-url">
                <xsl:value-of select="/rss/channel/atom:link[@rel='self']/@href"/>
                <xsl:value-of select="/*[local-name()='feed']/*[local-name()='link' and @rel='self']/@href"/>
              </code></p>

              <p>
                New to feeds? Check out <a href="https://aboutfeeds.com">About Feeds</a> to learn how to follow your favourite sites as your own curated newspaper.
              </p>
            </div>
          </aside>
        </nav>

        <div class="feed-content">
          <header class="feed-header">
            <h1>
              <!-- RSS Icon SVG -->
              <svg xmlns="http://www.w3.org/2000/svg" version="1.1" style="vertical-align: text-bottom; width: 1.2em; height: 1.2em;" viewBox="0 0 256 256">
                <defs>
                  <linearGradient x1="0.085" y1="0.085" x2="0.915" y2="0.915" id="RSSg">
                    <stop  offset="0.0" stop-color="#E3702D"/><stop  offset="0.1071" stop-color="#EA7D31"/>
                    <stop  offset="0.3503" stop-color="#F69537"/><stop  offset="0.5" stop-color="#FB9E3A"/>
                    <stop  offset="0.7016" stop-color="#EA7C31"/><stop  offset="0.8866" stop-color="#DE642B"/>
                    <stop  offset="1.0" stop-color="#D95B29"/>
                  </linearGradient>
                </defs>
                <rect width="256" height="256" rx="55" ry="55" x="0"  y="0"  fill="#CC5D15"/>
                <rect width="246" height="246" rx="50" ry="50" x="5"  y="5"  fill="#F49C52"/>
                <rect width="236" height="236" rx="47" ry="47" x="10" y="10" fill="url(#RSSg)"/>
                <circle cx="68" cy="189" r="24" fill="#FFF"/>
                <path d="M160 213h-34a82 82 0 0 0 -82 -82v-34a116 116 0 0 1 116 116z" fill="#FFF"/>
                <path d="M184 213A140 140 0 0 0 44 73 V 38a175 175 0 0 1 175 175z" fill="#FFF"/>
              </svg>
              Web Feed Preview
            </h1>

            <h2>
              <xsl:text>fLaMEd fury | </xsl:text>
              <xsl:choose>
                <xsl:when test="contains(/rss/channel/atom:link[@rel='self']/@href, 'bookmarks') or contains(/*[local-name()='feed']/*[local-name()='link' and @rel='self']/@href, 'bookmarks')">Bookmarks</xsl:when>
                <xsl:otherwise>Posts</xsl:otherwise>
              </xsl:choose>
              <xsl:text> | </xsl:text>
              <xsl:choose>
                <xsl:when test="/rss">RSS</xsl:when>
                <xsl:when test="/atom:feed">Atom</xsl:when>
                <xsl:otherwise>Feed</xsl:otherwise>
              </xsl:choose>
            </h2>
            <p class="feed-description"><xsl:value-of select="/rss/channel/description"/><xsl:value-of select="/atom:feed/atom:subtitle"/></p>

            <a class="button" target="_blank" href="https://flamedfury.com">
              Visit Website &#x2192;
            </a>
          </header>

          <h2>Recent Items</h2>

          <!-- Handle Atom feeds -->
          <xsl:for-each select="/atom:feed/atom:entry[position() &lt; 6]">
            <article class="feed-item">
              <h3>
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="atom:link/@href"/>
                  </xsl:attribute>
                  <xsl:value-of select="atom:title"/>
                </a>
              </h3>
              <small class="feed-date">
                Published: <xsl:value-of select="substring(atom:updated, 0, 11)" />
              </small>
              <p class="feed-summary"><xsl:value-of select="atom:summary"/></p>
            </article>
          </xsl:for-each>

          <!-- Handle RSS feeds -->
          <xsl:for-each select="/rss/channel/item[position() &lt; 6]">
            <article class="feed-item">
              <h3>
                <a target="_blank">
                  <xsl:attribute name="href">
                    <xsl:value-of select="link"/>
                  </xsl:attribute>
                  <xsl:value-of select="title"/>
                </a>
              </h3>
              <small class="feed-date">
                Published: <xsl:value-of select="pubDate" />
              </small>
              <p class="feed-summary"><xsl:value-of select="description"/></p>
            </article>
          </xsl:for-each>
        </div>
      </body>
    </html>
  </xsl:template>
</xsl:stylesheet>