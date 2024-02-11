module.exports = {
  url: process.env.URL || 'http://localhost:8080',
  siteName: 'Flamed Fury',
  siteDescription:
    'fLaMEd\'s personal homepage.',
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
  themeColor: '#DD4462', //  Manifest: defines the default theme color for the application
  themeBgColor: '#FBFBFB', // Manifest: defines a placeholder background color for the application page to display before its stylesheet is loaded
  opengraph_default: '/assets/images/template/opengraph-default.jpg', // fallback/default meta image
  opengraph_default_alt:
    'Visible content: another website by fLaMed', // alt text for default meta image
  blog: {
    // this is for the rss feed
    name: 'Flamed Fury: Latest Posts',
    description:
      'I write about the web and other stuff.',
    tagSingle: 'Tag',
    tagPlural: 'Tags',
    tagMore: 'More tags:',
    // feed links are looped over in the head.
    feedLinks: [{title: 'Atom Feed', url: '/feed.xml', type: 'application/atom+xml'}],
    pagination: 'Blog',
    paginationPage: 'Page',
    paginationPrevious: 'Previous',
    paginationNext: 'Next'
  },
  navigation: {
    ariaTop: 'Main',
    ariaBottom: 'Complementary',
    ariaSocial: 'Social',
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
