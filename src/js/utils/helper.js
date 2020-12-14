/**
 * Helper functions,
 * can later be turned into a class with more methods
 */

const formatPrice = (value) => {
  return (value / 100).toFixed(2).replace(".", ",");
};

export default formatPrice;
