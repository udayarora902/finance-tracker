export const formatINR = (amount) => {
  try {
    return amount.toLocaleString("en-IN");
  } catch (error) {
    return amount.toString();
  }
};

export const calculateTotals = (transactions) => {
  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);

  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);

  const netBalance = totalIncome - totalExpenses;

  return { totalIncome, totalExpenses, netBalance };
};

export const getCategoryTotals = (transactions, filterType, categories) => {
  return categories
    .map((category) => {
      const total = transactions
        .filter(
          (t) =>
            t.category === category &&
            t.type === (filterType === "All" ? "expense" : filterType)
        )
        .reduce((sum, t) => sum + t.amount, 0);
      const totalForType = transactions
        .filter(
          (t) => t.type === (filterType === "All" ? "expense" : filterType)
        )
        .reduce((sum, t) => sum + t.amount, 0);
      return {
        category,
        total,
        percentage: totalForType > 0 ? (total / totalForType) * 100 : 0,
      };
    })
    .filter((item) => item.total > 0);
};
