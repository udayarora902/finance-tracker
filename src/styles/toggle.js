export const createToggleStyles = (theme) => ({
  themeToggle: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    paddingRight: "0",
  },

  toggleSwitch: {
    position: "relative",
    width: "64px",
    height: "32px",
    backgroundColor: theme.border,
    borderRadius: "16px",
    cursor: "pointer",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    border: "none",
    outline: "none",
  },

  toggleSwitchActive: {
    backgroundColor: theme.primary,
  },

  toggleKnob: {
    position: "absolute",
    top: "4px",
    width: "24px",
    height: "24px",
    backgroundColor: "#ffffff",
    borderRadius: "50%",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    boxShadow: "0 2px 8px rgba(0, 0, 0, 0.2)",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    fontSize: "0.75rem",
  },
});
