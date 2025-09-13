export const url = process.env.URL || 'https://flamedfury.com';
export const siteName = 'fLaMEd fury'
export const siteDescription = 'What\'s going on Internet?';
export const siteType = 'Person'; // schema
export const locale = 'en_EN';
export const lang = 'en';
export const skipContent = 'Skip to content';
export const author = {
  name: 'fLaMEd',
  avatar: '/icon-512x512.png',
  email: 'hello@flamedfury.com',
  website: 'https://flamedfury.com.com',
  fediverse: '@flamed@social.lol'
};
export const creator = {
  name: 'fLaMEd',
  email: 'hello@flamedfury.com',
  website: 'https://flamedfury.com',
  social: 'https://social.lol/@flamed'
};
export const pathToSvgLogo = 'src/assets/svg/misc/flamed.svg'; // used for favicon generation
export const themeColor = '#d9480f'; //  Manifest: defines the default theme color for the application
export const themeLight = '#f8f8f8'; // used for meta tag theme-color, if light colors are prefered. best use value set for light bg
export const themeDark = '#2e2e2e'; // used for meta tag theme-color, if dark colors are prefered. best use value set for dark bgexport const opengraph_default = '/assets/images/template/opengraph-default.jpg'; // fallback/default meta image
export const opengraph_default = '/assets/images/template/opengraph-default.png'; // fallback/default meta image
export const opengraph_default_alt =
  'Visible content: another website by fLaMed';
export const blog = {
  // RSS
  name: 'fLaMEd fury',
  description: 'What\'s going on Internet?',
  // feed links are looped over in the head. You may add more to the array.
  feedLinks: [
    { title: 'Atom Feed', url: '/feed.xml', type: 'application/atom+xml' },
    { title: 'JSON Feed', url: '/feed.json', type: 'application/json' },
    { title: 'Atom Feed', url: '/bookmarks-feed.xml', type: 'application/atom+xml' },
    { title: 'JSON Feed', url: '/bookmarks-feed.json', type: 'application/json' }
  ],
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
};
export const feeds = {
  bookmarks: {
    name: "fLaMEd fury's bookmarks",
    description: "A collection of links from across the world wide web"
  }
};
export const bookmarks = {
  paginationLabel: "Bookmarks",
  paginationPage: "Page",
  paginationPrevious: "Previous",
  paginationNext: "Next",
  paginationNumbers: true
}
export const beerfridge = {
  paginationLabel: "Beer Fridge",
  paginationPage: "Page",
  paginationPrevious: "Previous",
  paginationNext: "Next",
  paginationNumbers: true
};
export const details = {
  aria: 'section controls',
  expand: 'expand all',
  collapse: 'collapse all'
};
export const dialog = {
  close: 'Close'
};
export const navigation = {
  navLabel: 'Menu',
  ariaTop: 'Main',
  ariaBottom: 'Complementary',
  ariaPlatforms: 'Platforms',
  drawerNav: false
};
export const themeSwitch = {
  title: 'Theme',
  light: 'light',
  dark: 'dark',
  initial: 'select'
};
export const greenweb = {
  // this goes into src/common/greenweb.njk
  providers: {
    // if you want to add more than one, edit the array directly.
    domain: 'cloudflare.com',
    service: 'cdn'
  },
  credentials: {
    // optional, eg: 	{ domain='my-org.com', doctype = 'webpage', url = 'https://my-org.com/our-climate-record'}
    domain: 'flamedfury.com',
    doctype: 'webpage',
    url: ''
  }
};
export const webMentions = {
  pingback: 'https://webmention.io/flamedfury.com/xmlrpc',
  webmention: 'https://webmention.io/flamedfury.com/webmention'
};
export const easteregg = false;