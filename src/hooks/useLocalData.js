import { useState, useEffect } from "react";
import { cookieUtils } from "../utils/cookies";

export const useLocalData = () => {
  const [transactions, setTransactions] = useState([]);
  const [budget, setBudget] = useState(50000); // Default 50,000 INR
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const savedTransactions = cookieUtils.getCookie("financeflow_transactions");
    const savedBudget = cookieUtils.getCookie("financeflow_budget");
    const savedTheme = cookieUtils.getCookie("financeflow_theme");

    if (savedTransactions) setTransactions(savedTransactions);
    if (savedBudget) setBudget(savedBudget);
    if (savedTheme) setIsDarkMode(savedTheme);
  }, []);

  useEffect(() => {
    if (transactions.length > 0) {
      cookieUtils.setCookie("financeflow_transactions", transactions, 60);
    }
  }, [transactions]);

  useEffect(() => {
    cookieUtils.setCookie("financeflow_budget", budget, 60);
  }, [budget]);

  useEffect(() => {
    cookieUtils.setCookie("financeflow_theme", isDarkMode, 60);
  }, [isDarkMode]);

  return {
    transactions,
    setTransactions,
    budget,
    setBudget,
    isDarkMode,
    setIsDarkMode,
  };
};
