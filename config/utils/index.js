const slugify = require('slugify');

/** Converts string to a slug form. */
const slugifyString = str => {
  const slug = slugify(str, {
    replacement: '-',
    remove: /[#,&,+()$~%.'":*¿?¡!<>{}]/g,
    lower: true
  });

  // Replace forward slashes with hyphens
  const slugWithHyphens = slug.replace(/\//g, '-');
  
  return slugWithHyphens;
};

/** throw an error if the provided argument is not of the expected. */
const throwIfNotType = (arg, expectedType) => {
  if (typeof arg !== expectedType) {
    throw new Error(
      `Expected argument of type ${expectedType} but instead got ${arg} (${typeof arg})`
    );
  }
};

module.exports = {
  slugifyString,
  throwIfNotType
};
