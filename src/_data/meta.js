module.exports = {
  url: 'https://flamedfury.com',
  domain: 'flamedfury.com',
  siteName: 'Flamed Fury',
  siteVersion: '2302',
  siteDescription:
    'The personal homepage of fLaMEd.',
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
  published: 'published: ',
  updated: 'updated: ',
  meta_data: {
    opengraph_default: '/assets/images/opengraph-default.png',
    mastodonProfile: 'https://social.lol/@flamed',
    microBlogProfile: 'https://micro.blog/flamed'
  },
  blog: {
    // this is for the rss feed
    name: 'Flamed Fury',
    description:
      'A feed of the latest posts from flamedfury.com.',
    url: 'https://flamedfury.com'
  },
  bookmarksfeed: {
    // this is for the rss feed
    name: 'Flamed Fury',
    description: 'A feed of the latest bookmarks from flamedfury.com.'
  },
  pagination: {
    itemsPerPage: 20
  },
  webmentions: {
    formTitle: 'Have you published a response? Let me know where:',
    buttonValue: 'Send Webmention',
    fallbackAvatar: '/assets/images/svg/avatar-fallback.svg'
  }
};
