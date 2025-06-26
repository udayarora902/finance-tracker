export const createUtilityStyles = (theme) => ({
  badge: {
    padding: "8px 16px",
    borderRadius: "20px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: "#ffffff",
    boxShadow: "0 2px 8px rgba(0,0,0,0.15)",
    border: "1px solid rgba(255,255,255,0.2)",
  },

  incomeBadge: {
    background: `linear-gradient(135deg, ${theme.success}, ${theme.successLight})`,
  },

  expenseBadge: {
    background: `linear-gradient(135deg, ${theme.danger}, ${theme.dangerLight})`,
  },

  amount: {
    fontSize: "1.125rem",
    fontWeight: "800",
    letterSpacing: "-0.02em",
  },

  incomeAmount: {
    color: theme.success,
  },

  expenseAmount: {
    color: theme.danger,
  },

  emptyState: {
    padding: "60px 32px",
    textAlign: "center",
    color: theme.textSecondary,
  },

  emptyIcon: {
    fontSize: "4rem",
    marginBottom: "20px",
    opacity: 0.6,
    filter: "grayscale(1)",
  },
});
