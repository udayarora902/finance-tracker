export const formatINR = (amount) => {
  try {
    return amount.toLocaleString('en-IN');
  } catch (error) {
    return amount.toString();
  }
};
