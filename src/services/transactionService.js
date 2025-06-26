import { cookieUtils } from "../utils/cookies";

export const transactionService = {
  addTransaction: (
    transactions,
    setTransactions,
    formData,
    setFormData,
    setShowAddForm
  ) => {
    if (!formData.description || !formData.amount) return;

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setTransactions([...transactions, newTransaction]);
    setFormData({
      description: "",
      amount: "",
      category: formData.type === "expense" ? "Food" : "Salary",
      type: formData.type,
      date: new Date().toISOString().split("T")[0],
    });
    setShowAddForm(false);
  },

  deleteTransaction: (transactions, setTransactions, id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);

    if (updatedTransactions.length === 0) {
      cookieUtils.deleteCookie("financeflow_transactions");
    }
  },

  filterTransactions: (transactions, filterCategory, filterType) => {
    return transactions.filter((transaction) => {
      const categoryMatch =
        filterCategory === "All" || transaction.category === filterCategory;
      const typeMatch = filterType === "All" || transaction.type === filterType;
      return categoryMatch && typeMatch;
    });
  },
};
