export const createTransactionStyles = (theme) => ({
  transactionList: {
    backgroundColor: theme.surface,
    borderRadius: "20px",
    border: `1px solid ${theme.border}`,
    overflow: "hidden",
    boxShadow: `0 8px 32px ${theme.shadow}`,
    backdropFilter: "blur(12px)",
  },

  transactionHeader: {
    padding: "24px 32px",
    borderBottom: `1px solid ${theme.border}`,
    background: `linear-gradient(135deg, ${theme.surfaceElevated}, ${theme.surface})`,
  },

  transactionItem: {
    display: "grid",
    gridTemplateColumns: "1fr auto",
    alignItems: "center",
    padding: "16px 20px",
    gap: "12px",
    borderBottom: `1px solid ${theme.borderLight}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
  },

  transactionItemHover: {
    backgroundColor: theme.surfaceHover,
    transform: "scale(1.01)",
    paddingLeft: "36px",
  },

  transactionInfo: {
    display: "flex",
    flexDirection: "column",
    gap: "6px",
  },

  transactionDescription: {
    fontWeight: "700",
    color: theme.text,
    fontSize: "1rem",
  },

  transactionMeta: {
    fontSize: "0.875rem",
    color: theme.textTertiary,
    fontWeight: "500",
  },
});
