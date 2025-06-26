export const createNavigationStyles = (theme) => ({
  navigation: {
    display: "flex",
    backgroundColor: theme.surface,
    borderRadius: "12px",
    padding: "4px",
    marginBottom: "24px",
    border: `1px solid ${theme.border}`,
    boxShadow: `0 4px 20px ${theme.shadow}`,
    backdropFilter: "blur(12px)",
  },

  navButton: {
    flex: 1,
    padding: "12px 16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "0.75rem",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "transparent",
    color: theme.textSecondary,
    fontFamily: "inherit",
  },

  navButtonActive: {
    backgroundColor: theme.primary,
    color: "#ffffff",
    boxShadow: `0 4px 16px ${theme.primary}30`,
    transform: "scale(1.05)",
  },
});
