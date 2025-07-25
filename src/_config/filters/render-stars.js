/**
 * Render star rating as Unicode stars
 */
export const renderStars = (rating) => {
  const stars = Math.round(rating || 0);
  return '★'.repeat(stars) + '☆'.repeat(5 - stars);
};