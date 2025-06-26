export const createButtonStyles = (theme) => ({
  button: {
    padding: "16px 32px",
    backgroundColor: theme.primary,
    color: "#ffffff",
    border: "none",
    borderRadius: "12px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    fontFamily: "inherit",
    position: "relative",
    overflow: "hidden",
    boxShadow: `0 4px 16px ${theme.primary}30`,
  },

  buttonHover: {
    transform: "translateY(-2px) scale(1.05)",
    boxShadow: `0 8px 32px ${theme.primary}40`,
  },

  buttonSuccess: {
    backgroundColor: theme.success,
    boxShadow: `0 4px 16px ${theme.success}30`,
  },

  buttonDanger: {
    backgroundColor: theme.danger,
    padding: "12px 20px",
    fontSize: "0.875rem",
    boxShadow: `0 4px 16px ${theme.danger}30`,
  },
});
