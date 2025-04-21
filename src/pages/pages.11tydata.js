// used for breadcrumb navigation
export default {
  eleventyComputed: {
    breadcrumb: data => {
      if (!data.permalink) return [];
      const segments = data.permalink.replace(/^\/|\/$/g, '').split('/');
      let accumulatedPath = '';
      return segments.map((segment, idx) => {
        accumulatedPath += '/' + segment;
        return {
          url: accumulatedPath + '/',
          // Format the segment for display (capitalize, replace dashes)
          name: segment.replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase())
        };
      });
    }
  }
};
