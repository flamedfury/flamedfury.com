import slugify from 'slugify';

/** Converts string to a slug form. */
export const slugifyString = str => {
  if (typeof str !== 'string') {
    // Only warn in development to avoid noise in production builds
    if (process.env.NODE_ENV !== 'production') {
      console.warn("slugifyString: received non-string input", str);
    }
    // Return a safe fallback slug based on the input type
    if (str === null || str === undefined) {
      return 'untitled';
    }
    // For non-null values, convert to string first
    return slugify(String(str), {
      replacement: '-',
      remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
      lower: true
    });
  }
  return slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });
};
