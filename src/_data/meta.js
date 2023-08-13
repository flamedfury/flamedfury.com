const package = require('../../package.json');

module.exports = {
  pkv: package.version || 'v1',
  url: process.env.URL || 'http://localhost:8080',
  domain: 'flamedfury.com',
  siteName: 'Flamed Fury',
  siteVersion: '2302',
  siteDescription:
    'My personal homepage, full of stuff that means everything to me, and nothing to you. You will find my thoughts about the current state of the web, my recollections of my earliest memories of the web, and a bunch of pages detailing some of my interests in records, books, comics, games, movies and tv shows. Come have a read and leave me a message.',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  toc: 'Table of contents',
  skipToc: 'Skip table of contents',
  author: 'fLaMEd',
  authorEmail: 'flamed@flamedfury.com',
  authorWebsite: 'https://flamedfury.com',
  authorAvatar: '/assets/images/avatar.jpg',
  themeColor: '#f05123', //  Manifest: defines the default theme color for the application
  themeBgColor: '#252525', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.png',
    mastodonProfile: 'https://social.lol/@flamed'
  },
  blog: {
    // this is for the rss feed
    name: 'fLaMEdFURY :: my collection of stuff',
    description:
      'My personal homepage, full of stuff that means everything to me, and nothing to you. You will find my thoughts about the current state of the web, my recollections of my earliest memories of the web, and a bunch of pages detailing some of my interests in records, books, comics, games, movies and tv shows. Come have a read and leave me a message.'
  },
  pagination: {
    itemsPerPage: 20
  },
  webmentions: {
    formTitle: 'Have you published a response? Let me know where:',
    buttonValue: 'Send Webmention'
  }
};
