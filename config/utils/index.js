import slugify from 'slugify';

/** Converts string to a slug form. */
export const slugifyString = (str) => {
  const slug = slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });

  // Replace forward slashes with hyphens
  const slugWithHyphens = slug.replace(/\//g, '-');

  return slugWithHyphens;
};

/** Throws an error if the provided argument is not of the expected type. */
export const throwIfNotType = (arg, expectedType) => {
  if (typeof arg !== expectedType) {
    throw new Error(
      `Expected argument of type ${expectedType} but instead got ${arg} (${typeof arg})`
    );
  }
};