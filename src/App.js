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
  };

  const addTransaction = () => {
    if (!formData.description || !formData.amount) return;

    const newTransaction = {
      id: Date.now(),
      ...formData,
      amount: parseFloat(formData.amount),
      date: formData.date,
    };

    setTransactions([...transactions, newTransaction]);
    setFormData({
      ...DEFAULT_FORM_DATA,
      type: formData.type,
      category: formData.type === "expense" ? "Food" : "Salary",
    });
    setShowAddForm(false);
  };

  const deleteTransaction = (id) => {
    const updatedTransactions = transactions.filter(
      (transaction) => transaction.id !== id
    );
    setTransactions(updatedTransactions);

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

  return (
    <div style={styles.container}>
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
                  <label style={styles.label}>Description</label>
                  <input
                    type="text"
                    style={styles.input}
                    value={formData.description}
                    onChange={(e) =>
                      setFormData({ ...formData, description: e.target.value })
                    }
                    placeholder={`Enter ${formData.type} description`}
                  />
                </div>

                <div style={styles.formGroup}>
                  <label style={styles.label}>Amount (₹)</label>
                  <input
                    type="number"
                    step="0.01"
                    style={styles.input}
                    value={formData.amount}
                    onChange={(e) =>
                      setFormData({ ...formData, amount: e.target.value })
                    }
                    placeholder="0.00"
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
                  {netBalance >= 0 ? "+" : ""}₹{formatINR(Math.abs(netBalance))}
                </p>
                <p style={styles.cardTitle}>Net Balance</p>
              </div>
              <div style={{ textAlign: "center" }}>
                <p
                  style={{
                    ...styles.cardValue,
                    fontSize: "1.75rem",
                    color: budgetRemaining >= 0 ? theme.success : theme.danger,
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
  );
};

export default ExpenseTracker;
