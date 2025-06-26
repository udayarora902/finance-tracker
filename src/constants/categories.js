export const CATEGORIES = {
  expense: [
    "Food",
    "Transportation",
    "Entertainment",
    "Shopping",
    "Bills",
    "Healthcare",
    "Education",
    "Others",
  ],
  income: ["Salary", "Freelance", "Investment", "Business", "Gift", "Others"],
};

export const DEFAULT_FORM_DATA = {
  description: "",
  amount: "",
  category: "Food",
  type: "expense",
  date: new Date().toISOString().split("T")[0],
};
