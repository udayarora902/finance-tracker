import React, { useState } from "react";
import { colors } from "./styles/theme.js";
import { createLayoutStyles } from "./styles/layout.js";
import { createComponentStyles } from "./styles/components.js";
import { createFormStyles } from "./styles/forms.js";
import { createButtonStyles } from "./styles/buttons.js";
import { createNavigationStyles } from "./styles/navigation.js";
import { createToggleStyles } from "./styles/toggle.js";
import { createTransactionStyles } from "./styles/transactions.js";
import { createChartStyles } from "./styles/charts.js";
import { createUtilityStyles } from "./styles/utilities.js";
import { useLocalData } from "./hooks/useLocalData.js";
import { Header } from "./components/Header.js";
import { Navigation } from "./components/Navigation.js";
import { DashboardCard } from "./components/DashboardCard.js";
import { cookieUtils } from "./utils/cookies.js";
import { formatINR } from "./utils/calculations.js";
import { CATEGORIES, DEFAULT_FORM_DATA } from "./constants/categories.js";

const ExpenseTracker = () => {
  const {
    transactions,
    setTransactions,
    budget,
    setBudget,
    isDarkMode,
    setIsDarkMode,
  } = useLocalData();
  const [formData, setFormData] = useState(DEFAULT_FORM_DATA);
  const [filterCategory, setFilterCategory] = useState("All");
  const [filterType, setFilterType] = useState("All");
  const [showAddForm, setShowAddForm] = useState(false);
  const [activeTab, setActiveTab] = useState("dashboard");
  const [hoveredCard, setHoveredCard] = useState(null);

  // Animation and message states
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [successMessage, setSuccessMessage] = useState("");
  const [successAnimation, setSuccessAnimation] = useState(false);
  const [messageType, setMessageType] = useState("income"); // 'income', 'expense', or 'delete'

  const theme = isDarkMode ? colors.dark : colors.light;

  // Create all styles
  const layoutStyles = createLayoutStyles(theme);
  const componentStyles = createComponentStyles(theme);
  const formStyles = createFormStyles(theme);
  const buttonStyles = createButtonStyles(theme);
  const navigationStyles = createNavigationStyles(theme);
  const toggleStyles = createToggleStyles(theme);
  const transactionStyles = createTransactionStyles(theme);
  const chartStyles = createChartStyles(theme);
  const utilityStyles = createUtilityStyles(theme);

  // Combine all styles
  const styles = {
    ...layoutStyles,
    ...componentStyles,
    ...formStyles,
    ...buttonStyles,
    ...navigationStyles,
    ...toggleStyles,
    ...transactionStyles,
    ...chartStyles,
    ...utilityStyles,

    // Success message styles
    successMessage: {
      position: "fixed",
      top: "50%",
      left: "50%",
      transform: `translate(-50%, -50%) ${
        showSuccessMessage ? "scale(1)" : "scale(0)"
      }`,
      backgroundColor:
        messageType === "expense"
          ? theme.danger
          : messageType === "delete"
          ? theme.warning
          : theme.success,
      color: "#ffffff",
      padding: "20px 32px",
      borderRadius: "16px",
      boxShadow:
        messageType === "expense"
          ? `0 12px 40px ${theme.danger}50`
          : messageType === "delete"
          ? `0 12px 40px ${theme.warning}50`
          : `0 12px 40px ${theme.success}50`,
      zIndex: 1000,
      display: "flex",
      alignItems: "center",
      gap: "16px",
      fontSize: "1.125rem",
      fontWeight: "700",
      transition: "all 0.5s cubic-bezier(0.4, 0, 0.2, 1)",
      border: `2px solid ${
        messageType === "expense"
          ? theme.dangerLight
          : messageType === "delete"
          ? "#fbbf24"
          : theme.successLight
      }`,
      backdropFilter: "blur(16px)",
      minWidth: "300px",
      textAlign: "center",
      opacity: showSuccessMessage ? 1 : 0,
    },

    successIcon: {
      fontSize: "2rem",
      animation: successAnimation ? "checkmarkBounce 0.8s ease-out" : "none",
    },

    // Animation keyframes via style element
    animationStyles: `
      @keyframes checkmarkBounce {
        0% { transform: scale(0) rotate(0deg); }
        50% { transform: scale(1.4) rotate(180deg); }
        70% { transform: scale(1.1) rotate(270deg); }
        100% { transform: scale(1) rotate(360deg); }
      }
      
      @keyframes pulseSuccess {
        0% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(16, 185, 129, 0); }
        100% { box-shadow: 0 0 0 0 rgba(16, 185, 129, 0); }
      }
      
      @keyframes pulseError {
        0% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(239, 68, 68, 0); }
        100% { box-shadow: 0 0 0 0 rgba(239, 68, 68, 0); }
      }
      
      @keyframes pulseWarning {
        0% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0.7); }
        70% { box-shadow: 0 0 0 20px rgba(245, 158, 11, 0); }
        100% { box-shadow: 0 0 0 0 rgba(245, 158, 11, 0); }
      }
    `,

    // Graph styles
    graphContainer: {
      background: `linear-gradient(135deg, ${theme.surface}, ${theme.background})`,
      borderRadius: "16px",
      padding: "32px",
      border: `1px solid ${theme.border}`,
      boxShadow: `0 8px 32px ${theme.shadowColor}`,
      marginBottom: "32px",
    },

    graphGrid: {
      display: "grid",
      gridTemplateColumns: "repeat(auto-fit, minmax(120px, 1fr))",
      gap: "24px",
      marginTop: "24px",
    },

    graphBar: {
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      gap: "12px",
    },

    graphBarContainer: {
      width: "100%",
      height: "200px",
      display: "flex",
      flexDirection: "column",
      justifyContent: "flex-end",
      gap: "4px",
    },

    graphBarIncome: {
      backgroundColor: theme.success,
      borderRadius: "8px 8px 0 0",
      minHeight: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      background: `linear-gradient(135deg, ${theme.success}, ${theme.successLight})`,
    },

    graphBarExpense: {
      backgroundColor: theme.danger,
      borderRadius: "0 0 8px 8px",
      minHeight: "4px",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color: "#ffffff",
      fontSize: "0.75rem",
      fontWeight: "600",
      transition: "all 0.3s ease",
      background: `linear-gradient(135deg, ${theme.danger}, ${theme.dangerLight})`,
    },

    graphLabel: {
      fontSize: "0.875rem",
      fontWeight: "600",
      color: theme.textSecondary,
      textAlign: "center",
    },

    graphLegend: {
      display: "flex",
      justifyContent: "center",
      gap: "32px",
      marginTop: "24px",
      padding: "16px",
      backgroundColor: `${theme.surface}80`,
      borderRadius: "12px",
      border: `1px solid ${theme.border}`,
    },

    graphLegendItem: {
      display: "flex",
      alignItems: "center",
      gap: "8px",
      fontSize: "0.875rem",
      fontWeight: "600",
    },

    graphLegendColor: {
      width: "16px",
      height: "16px",
      borderRadius: "4px",
    },
  };

  // Show success message function
  const showSuccess = (message, type = "income") => {
    setMessageType(type);
    setSuccessMessage(message);
    setSuccessAnimation(true);
    setShowSuccessMessage(true);

    // Hide animation after bounce
    setTimeout(() => setSuccessAnimation(false), 800);

    // Hide message after 3.5 seconds
    setTimeout(() => {
      setShowSuccessMessage(false);
      setTimeout(() => setSuccessMessage(""), 500);
    }, 3500);
  };

  const addTransaction = () => {
    if (!formData.amount) {
      alert("Please enter an amount");
      return;
    }

    const newTransaction = {
      id: Date.now(),
      ...formData,
      description:
        formData.description ||
        `${formData.type === "income" ? "Income" : "Expense"} - ${
          formData.category
        }`,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setTransactions([...transactions, newTransaction]);

    // Show success message based on transaction type with appropriate color
    if (formData.type === "income") {
      const message = `Income of ₹${formatINR(
        newTransaction.amount
      )} added successfully!`;
      showSuccess(message, "income");
    } else {
      const message = `Expense of ₹${formatINR(
        newTransaction.amount
      )} added successfully!`;
      showSuccess(message, "expense");
    }

    setFormData({
      ...DEFAULT_FORM_DATA,
      type: formData.type,
      category: formData.type === "expense" ? "Food" : "Salary",
    });
    setShowAddForm(false);
  };

  const deleteTransaction = (id) => {
    const transactionToDelete = transactions.find((t) => t.id === id);
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);

    // Show success message for deletion
    if (transactionToDelete) {
      const message = `${
        transactionToDelete.type === "income" ? "Income" : "Expense"
      } of ₹${formatINR(transactionToDelete.amount)} deleted successfully!`;
      showSuccess(message, "delete");
    }

    if (updatedTransactions.length === 0) {
      cookieUtils.deleteCookie("financeflow_transactions");
    }
  };

  const filteredTransactions = transactions.filter((transaction) => {
    const categoryMatch =
      filterCategory === "All" || transaction.category === filterCategory;
    const typeMatch = filterType === "All" || transaction.type === filterType;
    return categoryMatch && typeMatch;
  });

  const totalIncome = transactions
    .filter((t) => t.type === "income")
    .reduce((sum, t) => sum + t.amount, 0);
  const totalExpenses = transactions
    .filter((t) => t.type === "expense")
    .reduce((sum, t) => sum + t.amount, 0);
  const netBalance = totalIncome - totalExpenses;
  const budgetRemaining = budget - totalExpenses;

  const categoryTotals = (
    formData.type === "expense" ? CATEGORIES.expense : CATEGORIES.income
  )
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

  // Monthly data for graph
  const monthlyData = transactions.reduce((acc, transaction) => {
    const monthKey = transaction.date.substring(0, 7); // YYYY-MM format
    const monthName = new Date(
      transaction.date + "T00:00:00"
    ).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
    });

    if (!acc[monthKey]) {
      acc[monthKey] = {
        month: monthName,
        income: 0,
        expense: 0,
      };
    }

    if (transaction.type === "income") {
      acc[monthKey].income += transaction.amount;
    } else {
      acc[monthKey].expense += transaction.amount;
    }

    return acc;
  }, {});

  const monthlyDataArray = Object.values(monthlyData).sort(
    (a, b) => new Date(a.month + " 1, 2000") - new Date(b.month + " 1, 2000")
  );

  const maxAmount = Math.max(
    ...monthlyDataArray.map((item) => Math.max(item.income, item.expense)),
    totalIncome,
    totalExpenses
  );

  return (
    <>
      {/* Add CSS animations */}
      <style>{styles.animationStyles}</style>

      <div style={styles.container}>
        {/* Success Message */}
        {successMessage && (
          <div style={styles.successMessage}>
            <span style={styles.successIcon}>
              {messageType === "expense"
                ? "💸"
                : messageType === "delete"
                ? "🗑️"
                : "💰"}
            </span>
            <span>{successMessage}</span>
          </div>
        )}

        <Header
          isDarkMode={isDarkMode}
          setIsDarkMode={setIsDarkMode}
          styles={styles}
        />
        <Navigation
          activeTab={activeTab}
          setActiveTab={setActiveTab}
          styles={styles}
        />

        {/* Dashboard Tab */}
        {activeTab === "dashboard" && (
          <>
            <div style={styles.grid}>
              <DashboardCard
                icon="💰"
                title="Total Income"
                value={`+₹${formatINR(totalIncome)}`}
                cardStyle={styles.incomeCard}
                gradientStyle={{
                  background: `linear-gradient(90deg, ${theme.success}, ${theme.successLight})`,
                }}
                styles={styles}
                onHover={() => setHoveredCard("income")}
                onLeave={() => setHoveredCard(null)}
                isHovered={hoveredCard === "income"}
              />

              <DashboardCard
                icon="💸"
                title="Total Expenses"
                value={`-₹${formatINR(totalExpenses)}`}
                cardStyle={styles.expenseCard}
                gradientStyle={{
                  background: `linear-gradient(90deg, ${theme.danger}, ${theme.dangerLight})`,
                }}
                styles={styles}
                onHover={() => setHoveredCard("expense")}
                onLeave={() => setHoveredCard(null)}
                isHovered={hoveredCard === "expense"}
              />

              <DashboardCard
                icon="💎"
                title="Net Balance"
                value={`₹${formatINR(netBalance)}`}
                cardStyle={
                  netBalance >= 0 ? styles.incomeCard : styles.expenseCard
                }
                gradientStyle={{
                  background:
                    netBalance >= 0
                      ? `linear-gradient(90deg, ${theme.success}, ${theme.successLight})`
                      : `linear-gradient(90deg, ${theme.danger}, ${theme.dangerLight})`,
                }}
                styles={styles}
                onHover={() => setHoveredCard("balance")}
                onLeave={() => setHoveredCard(null)}
                isHovered={hoveredCard === "balance"}
              />

              <div
                style={{
                  ...styles.card,
                  background:
                    budgetRemaining >= 0
                      ? `linear-gradient(135deg, ${theme.primary}08, ${theme.primaryLight}05)`
                      : `linear-gradient(135deg, ${theme.danger}08, ${theme.dangerLight}05)`,
                  borderColor:
                    budgetRemaining >= 0
                      ? `${theme.primary}20`
                      : `${theme.danger}20`,
                  ...(hoveredCard === "budget" ? styles.cardHover : {}),
                }}
                onMouseEnter={() => setHoveredCard("budget")}
                onMouseLeave={() => setHoveredCard(null)}
              >
                <div
                  style={{
                    ...styles.cardGradient,
                    background:
                      budgetRemaining >= 0
                        ? `linear-gradient(90deg, ${theme.primary}, ${theme.primaryLight})`
                        : `linear-gradient(90deg, ${theme.danger}, ${theme.dangerLight})`,
                  }}
                ></div>
                <div style={styles.cardHeader}>
                  <span style={styles.cardIcon}>🎯</span>
                  <h3 style={styles.cardTitle}>Budget Status</h3>
                </div>
                <p style={styles.cardValue}>₹{formatINR(budgetRemaining)}</p>
                <input
                  type="number"
                  value={budget}
                  onChange={(e) => setBudget(parseFloat(e.target.value) || 0)}
                  style={{ ...styles.input, marginTop: "16px" }}
                  placeholder="Set budget in ₹"
                />
              </div>
            </div>

            <div style={styles.card}>
              <h3 style={{ ...styles.cardTitle, marginBottom: "24px" }}>
                Quick Statistics
              </h3>
              <div style={{ ...styles.grid, marginBottom: 0 }}>
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...styles.cardValue, fontSize: "2rem" }}>
                    {transactions.length}
                  </p>
                  <p style={styles.cardTitle}>Total Transactions</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...styles.cardValue, fontSize: "2rem" }}>
                    {transactions.filter((t) => t.type === "income").length}
                  </p>
                  <p style={styles.cardTitle}>Income Entries</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...styles.cardValue, fontSize: "2rem" }}>
                    {transactions.filter((t) => t.type === "expense").length}
                  </p>
                  <p style={styles.cardTitle}>Expense Entries</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p style={{ ...styles.cardValue, fontSize: "2rem" }}>
                    ₹
                    {transactions.length > 0
                      ? formatINR(
                          Math.round(
                            (totalIncome + totalExpenses) / transactions.length
                          )
                        )
                      : "0"}
                  </p>
                  <p style={styles.cardTitle}>Avg Transaction</p>
                </div>
              </div>
            </div>
          </>
        )}

        {/* Transactions Tab */}
        {activeTab === "transactions" && (
          <>
            <button
              style={{
                ...styles.button,
                ...styles.buttonSuccess,
                marginBottom: "32px",
                ...(hoveredCard === "add-btn" ? styles.buttonHover : {}),
              }}
              onClick={() => setShowAddForm(!showAddForm)}
              onMouseEnter={() => setHoveredCard("add-btn")}
              onMouseLeave={() => setHoveredCard(null)}
            >
              {showAddForm ? "✕ Cancel" : "+ Add Transaction"}
            </button>

            {showAddForm && (
              <div style={styles.form}>
                <div style={styles.formGlow}></div>
                <h3 style={{ ...styles.cardTitle, marginBottom: "24px" }}>
                  Add New Transaction
                </h3>

                <div style={styles.typeToggle}>
                  <button
                    style={{
                      ...styles.typeButton,
                      ...(formData.type === "income"
                        ? styles.typeButtonActive
                        : {}),
                    }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "income",
                        category: "Salary",
                      })
                    }
                  >
                    💰 Income
                  </button>
                  <button
                    style={{
                      ...styles.typeButton,
                      ...(formData.type === "expense"
                        ? styles.typeButtonActive
                        : {}),
                    }}
                    onClick={() =>
                      setFormData({
                        ...formData,
                        type: "expense",
                        category: "Food",
                      })
                    }
                  >
                    💸 Expense
                  </button>
                </div>

                <div style={styles.formGrid}>
                  <div style={styles.formGroup}>
                    <label style={styles.label}>Description (Optional)</label>
                    <input
                      type="text"
                      style={styles.input}
                      value={formData.description}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          description: e.target.value,
                        })
                      }
                      placeholder={`Enter ${formData.type} description (optional)`}
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Amount (₹) *Required</label>
                    <input
                      type="number"
                      step="0.01"
                      style={styles.input}
                      value={formData.amount}
                      onChange={(e) =>
                        setFormData({ ...formData, amount: e.target.value })
                      }
                      placeholder="0.00"
                      required
                    />
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Category</label>
                    <select
                      style={styles.input}
                      value={formData.category}
                      onChange={(e) =>
                        setFormData({ ...formData, category: e.target.value })
                      }
                    >
                      {(formData.type === "expense"
                        ? CATEGORIES.expense
                        : CATEGORIES.income
                      ).map((category) => (
                        <option key={category} value={category}>
                          {category}
                        </option>
                      ))}
                    </select>
                  </div>

                  <div style={styles.formGroup}>
                    <label style={styles.label}>Date</label>
                    <input
                      type="date"
                      style={styles.input}
                      value={formData.date}
                      onChange={(e) =>
                        setFormData({ ...formData, date: e.target.value })
                      }
                    />
                  </div>
                </div>

                <button onClick={addTransaction} style={styles.button}>
                  Add Transaction
                </button>
              </div>
            )}

            <div style={styles.filterBar}>
              <div style={styles.formGroup}>
                <label style={styles.label}>Filter by Type</label>
                <select
                  style={styles.input}
                  value={filterType}
                  onChange={(e) => setFilterType(e.target.value)}
                >
                  <option value="All">All Types</option>
                  <option value="income">Income</option>
                  <option value="expense">Expense</option>
                </select>
              </div>

              <div style={styles.formGroup}>
                <label style={styles.label}>Filter by Category</label>
                <select
                  style={styles.input}
                  value={filterCategory}
                  onChange={(e) => setFilterCategory(e.target.value)}
                >
                  <option value="All">All Categories</option>
                  {[...CATEGORIES.expense, ...CATEGORIES.income].map(
                    (category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    )
                  )}
                </select>
              </div>
            </div>

            <div style={styles.transactionList}>
              <div style={styles.transactionHeader}>
                <h3 style={styles.cardTitle}>
                  Transaction History ({filteredTransactions.length} items)
                </h3>
              </div>

              {filteredTransactions.length === 0 ? (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📊</div>
                  <p>
                    No transactions found. Add your first transaction to get
                    started.
                  </p>
                </div>
              ) : (
                filteredTransactions
                  .sort((a, b) => new Date(b.date) - new Date(a.date))
                  .map((transaction) => (
                    <div
                      key={transaction.id}
                      style={{
                        ...styles.transactionItem,
                        ...(hoveredCard === `trans-${transaction.id}`
                          ? styles.transactionItemHover
                          : {}),
                      }}
                      onMouseEnter={() =>
                        setHoveredCard(`trans-${transaction.id}`)
                      }
                      onMouseLeave={() => setHoveredCard(null)}
                    >
                      <div style={styles.transactionInfo}>
                        <div style={styles.transactionDescription}>
                          {transaction.description}
                        </div>
                        <div style={styles.transactionMeta}>
                          {transaction.date} • {transaction.type}
                          <div
                            style={{
                              display: "block",
                              marginTop: "8px",
                            }}
                          >
                            <span
                              style={{
                                ...styles.badge,
                                ...(transaction.type === "income"
                                  ? styles.incomeBadge
                                  : styles.expenseBadge),
                                marginRight: "8px",
                                fontSize: "0.75rem",
                                padding: "4px 8px",
                              }}
                            >
                              {transaction.category}
                            </span>
                            <span
                              style={{
                                ...styles.amount,
                                ...(transaction.type === "income"
                                  ? styles.incomeAmount
                                  : styles.expenseAmount),
                                fontSize: "1rem",
                              }}
                            >
                              {transaction.type === "income" ? "+" : "-"}₹
                              {formatINR(transaction.amount)}
                            </span>
                          </div>
                        </div>
                      </div>

                      <button
                        style={{ ...styles.button, ...styles.buttonDanger }}
                        onClick={() => deleteTransaction(transaction.id)}
                      >
                        🗑️
                      </button>
                    </div>
                  ))
              )}
            </div>
          </>
        )}

        {/* Analytics Tab */}
        {activeTab === "analytics" && (
          <>
            {/* Income vs Expense Graph */}
            <div style={styles.graphContainer}>
              <h3
                style={{
                  ...styles.cardTitle,
                  marginBottom: "8px",
                  textAlign: "center",
                }}
              >
                📊 Income vs Expense Analysis
              </h3>
              <p
                style={{
                  color: theme.textSecondary,
                  textAlign: "center",
                  marginBottom: "24px",
                }}
              >
                Visual comparison of your financial activity
              </p>

              {transactions.length > 0 ? (
                <>
                  {/* Overall Comparison */}
                  <div style={{ marginBottom: "32px" }}>
                    <h4
                      style={{
                        ...styles.cardTitle,
                        fontSize: "1.125rem",
                        marginBottom: "16px",
                        textAlign: "center",
                      }}
                    >
                      Overall Summary
                    </h4>
                    <div
                      style={{
                        display: "grid",
                        gridTemplateColumns: "1fr 1fr",
                        gap: "16px",
                        maxWidth: "400px",
                        margin: "0 auto",
                      }}
                    >
                      <div style={styles.graphBar}>
                        <div style={styles.graphBarContainer}>
                          <div
                            style={{
                              ...styles.graphBarIncome,
                              height: `${
                                maxAmount > 0
                                  ? (totalIncome / maxAmount) * 180
                                  : 4
                              }px`,
                            }}
                          >
                            {totalIncome > 0 && `₹${formatINR(totalIncome)}`}
                          </div>
                        </div>
                        <div style={styles.graphLabel}>Total Income</div>
                      </div>

                      <div style={styles.graphBar}>
                        <div style={styles.graphBarContainer}>
                          <div
                            style={{
                              ...styles.graphBarExpense,
                              height: `${
                                maxAmount > 0
                                  ? (totalExpenses / maxAmount) * 180
                                  : 4
                              }px`,
                            }}
                          >
                            {totalExpenses > 0 &&
                              `₹${formatINR(totalExpenses)}`}
                          </div>
                        </div>
                        <div style={styles.graphLabel}>Total Expenses</div>
                      </div>
                    </div>
                  </div>

                  {/* Monthly Breakdown */}
                  {monthlyDataArray.length > 1 && (
                    <>
                      <h4
                        style={{
                          ...styles.cardTitle,
                          fontSize: "1.125rem",
                          marginBottom: "16px",
                          textAlign: "center",
                        }}
                      >
                        Monthly Breakdown
                      </h4>
                      <div style={styles.graphGrid}>
                        {monthlyDataArray.map((monthData, index) => (
                          <div key={index} style={styles.graphBar}>
                            <div style={styles.graphBarContainer}>
                              <div
                                style={{
                                  ...styles.graphBarIncome,
                                  height: `${
                                    maxAmount > 0
                                      ? (monthData.income / maxAmount) * 160
                                      : 4
                                  }px`,
                                }}
                              >
                                {monthData.income > 0 &&
                                  `₹${formatINR(monthData.income)}`}
                              </div>
                              <div
                                style={{
                                  ...styles.graphBarExpense,
                                  height: `${
                                    maxAmount > 0
                                      ? (monthData.expense / maxAmount) * 160
                                      : 4
                                  }px`,
                                }}
                              >
                                {monthData.expense > 0 &&
                                  `₹${formatINR(monthData.expense)}`}
                              </div>
                            </div>
                            <div style={styles.graphLabel}>
                              {monthData.month}
                            </div>
                          </div>
                        ))}
                      </div>
                    </>
                  )}

                  {/* Legend */}
                  <div style={styles.graphLegend}>
                    <div style={styles.graphLegendItem}>
                      <div
                        style={{
                          ...styles.graphLegendColor,
                          backgroundColor: theme.success,
                        }}
                      ></div>
                      <span style={{ color: theme.textPrimary }}>Income</span>
                    </div>
                    <div style={styles.graphLegendItem}>
                      <div
                        style={{
                          ...styles.graphLegendColor,
                          backgroundColor: theme.danger,
                        }}
                      ></div>
                      <span style={{ color: theme.textPrimary }}>Expenses</span>
                    </div>
                  </div>
                </>
              ) : (
                <div style={styles.emptyState}>
                  <div style={styles.emptyIcon}>📈</div>
                  <p>Add some transactions to see your financial graph!</p>
                </div>
              )}
            </div>

            {categoryTotals.length > 0 && (
              <div style={styles.chart}>
                <h3 style={{ ...styles.cardTitle, marginBottom: "24px" }}>
                  {filterType === "All" ? "Expenses" : filterType} by Category
                </h3>
                {categoryTotals.map((item) => (
                  <div key={item.category} style={styles.chartBar}>
                    <div style={styles.chartLabel}>{item.category}</div>
                    <div style={styles.chartTrack}>
                      <div
                        style={{
                          ...styles.chartFill,
                          width: `${item.percentage}%`,
                          background:
                            filterType === "income"
                              ? `linear-gradient(135deg, ${theme.success}, ${theme.successLight})`
                              : `linear-gradient(135deg, ${theme.danger}, ${theme.dangerLight})`,
                        }}
                      >
                        ₹{formatINR(item.total)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            )}

            <div style={styles.card}>
              <h3 style={{ ...styles.cardTitle, marginBottom: "24px" }}>
                Financial Overview
              </h3>
              <div style={{ ...styles.grid, marginBottom: 0 }}>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      ...styles.cardValue,
                      fontSize: "1.75rem",
                      color: theme.success,
                    }}
                  >
                    +₹{formatINR(totalIncome)}
                  </p>
                  <p style={styles.cardTitle}>Total Income</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      ...styles.cardValue,
                      fontSize: "1.75rem",
                      color: theme.danger,
                    }}
                  >
                    -₹{formatINR(totalExpenses)}
                  </p>
                  <p style={styles.cardTitle}>Total Expenses</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      ...styles.cardValue,
                      fontSize: "1.75rem",
                      color: netBalance >= 0 ? theme.success : theme.danger,
                    }}
                  >
                    {netBalance >= 0 ? "+" : ""}₹
                    {formatINR(Math.abs(netBalance))}
                  </p>
                  <p style={styles.cardTitle}>Net Balance</p>
                </div>
                <div style={{ textAlign: "center" }}>
                  <p
                    style={{
                      ...styles.cardValue,
                      fontSize: "1.75rem",
                      color:
                        budgetRemaining >= 0 ? theme.success : theme.danger,
                    }}
                  >
                    ₹{formatINR(Math.abs(budgetRemaining))}
                  </p>
                  <p style={styles.cardTitle}>
                    {budgetRemaining >= 0 ? "Under Budget" : "Over Budget"}
                  </p>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default ExpenseTracker;
