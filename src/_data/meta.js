module.exports = {
  url: process.env.URL || 'https://flamedfury.com',
  siteName: 'Flamed Fury',
  siteDescription:
    'What\'s going on Internet? This is my homepage. I write about the web and stuff.',
  siteType: 'Person', // schema
  locale: 'en_EN',
  lang: 'en',
  skipContent: 'Skip to content',
  author: {
    name: 'fLaMEd', // page / blog author's name. Must be set.
    avatar: '/favicon.png',
    email: 'hello@flamedfury.com.com', // email of the author
    website: 'https://flamedfury.com' // the personal site of the author
  },
  creator: {
    name: 'fLaMEd', // creator's (developer) name.
    email: 'hello@flamedfury.com',
    website: 'https://flamedfury.com',
    social: 'https://social.lol/@flamed'
  },
  themeColor: '#ff4800', //  Manifest: defines the default theme color for the application
  themeBgColor: '#252525', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  opengraph_default: '/assets/images/template/opengraph-default.png', // fallback/default meta image
  opengraph_default_alt:
    'Visible content: another website by fLaMed', // alt text for default meta image
  blog: {
    // RSS
    name: 'The Weblog of fLaMEd',
    description:
      'I write about the web and other stuff.',
    // feed links are looped over in the head. You may add more to the array.
    feedLinks: [
      {title: 'Atom Feed', url: '/feed.xml', type: 'application/atom+xml'},
      {title: 'Atom Feed', url: '/bookmarks-feed.xml', type: 'application/atom+xml'}],
    // Tags
    tagSingle: 'Tag',
    tagPlural: 'Tags',
    tagMore: 'More tags:',
    // Pagination
    paginationLabel: 'Blog',
    paginationPage: 'Page',
    paginationPrevious: 'Previous',
    paginationNext: 'Next',
    paginationNumbers: true
  },
  feeds: {
    // Alternative RSS feeds
    bookmarks: {
      name:  'fLaMEd\'s Bookmarks',
      description: 'A collection of interesting links from around the web'
    }
  },
  details: {
    aria: 'section controls',
    expand: 'expand all',
    collapse: 'collapse all'
  },
  navigation: {
    ariaTop: 'Main',
    ariaBottom: 'Complementary',
    ariaPlatforms: 'Platforms',
    closedText: 'Menu'
  },
  themeSwitch: {
    title: 'Theme',
    light: 'light',
    dark: 'dark',
		initial: 'select'
  },
  greenweb: {
    // this goues into src/common/greenweb.njk
    providers: {
      // if you want to add more than one, edit the array directly.
      domain: 'neocities.org',
      service: 'static-hosting'
    },
    credentials: {
      // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
      domain: '',
      doctype: '',
      url: ''
    }
  },
  viewRepo: {
    // this is for the view/edit on github link. The value in the package.json will be pulled in.
    allow: true,
    infoText: 'View this page on GitHub'
  },
  easteregg: true
};
