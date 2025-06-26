export const createComponentStyles = (theme) => ({
  title: {
    fontSize: "2rem",
    fontWeight: "800",
    margin: "0 0 8px 0",
    letterSpacing: "-0.04em",
    lineHeight: "1.2",
    color: theme.primary,
    textShadow: `0 2px 4px ${theme.shadow}`,
  },

  subtitle: {
    fontSize: "1rem",
    color: theme.textSecondary,
    margin: 0,
    fontWeight: "500",
    letterSpacing: "-0.01em",
  },

  card: {
    backgroundColor: theme.surface,
    borderRadius: "16px",
    padding: "20px",
    border: `1px solid ${theme.border}`,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: `0 4px 20px ${theme.shadow}`,
    position: "relative",
    overflow: "hidden",
    backdropFilter: "blur(12px)",
  },

  cardHover: {
    transform: "translateY(-4px) scale(1.02)",
    boxShadow: `0 12px 40px ${theme.shadowMedium}`,
    borderColor: theme.borderLight,
  },

  cardGradient: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "3px",
    borderRadius: "20px 20px 0 0",
  },

  cardHeader: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "20px",
  },

  cardIcon: {
    fontSize: "2rem",
    filter: "drop-shadow(0 2px 4px rgba(0,0,0,0.1))",
    background: theme.surfaceElevated,
    padding: "12px",
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
  },

  cardTitle: {
    fontSize: "0.875rem",
    fontWeight: "700",
    color: theme.textSecondary,
    textTransform: "uppercase",
    letterSpacing: "0.1em",
    margin: 0,
  },

  cardValue: {
    fontSize: "1.75rem",
    fontWeight: "900",
    color: theme.text,
    margin: 0,
    letterSpacing: "-0.03em",
    lineHeight: "1.1",
  },

  incomeCard: {
    background: `linear-gradient(135deg, ${theme.success}08, ${theme.successLight}05)`,
    borderColor: `${theme.success}20`,
  },

  expenseCard: {
    background: `linear-gradient(135deg, ${theme.danger}08, ${theme.dangerLight}05)`,
    borderColor: `${theme.danger}20`,
  },
});
