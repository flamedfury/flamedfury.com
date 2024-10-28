import slugify from 'slugify';

/** Converts string to a slug form. */
export const slugifyString = str => {
  if (typeof str !== 'string') {
    console.warn("slugifyString: received non-string input", str);
    return 'untitled'; // Fallback slug when input is not a string
  }
  return slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });
};
