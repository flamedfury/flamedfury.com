/**
 * Format rating to 1 decimal place or return 'N/A'
 */
export const formatRating = (rating) => {
  return rating ? rating.toFixed(1) : 'N/A';
};