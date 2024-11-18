import { imageShortcode } from './shortcodes/image.js';
import { svgShortcode } from './shortcodes/svg.js';
import { liteYoutube } from "./shortcodes/youtube-lite.js";
import { includeRaw } from "./shortcodes/includeraw.js";
import { aside } from "./shortcodes/aside.js";
import {asidePaired} from "./shortcodes/aside.js"
import { inReplyTo } from './shortcodes/inReplyTo.js';
import { mentionOf } from './shortcodes/mentionOf.js'; // Import the new mention-of shortcode

export default {
  imageShortcode,
  svgShortcode,
  liteYoutube,
  includeRaw,
  aside,
  asidePaired,
  inReplyTo,
  mentionOf
};