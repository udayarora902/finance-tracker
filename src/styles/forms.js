export const createFormStyles = (theme) => ({
  form: {
    backgroundColor: theme.surface,
    borderRadius: "24px",
    padding: "36px",
    marginBottom: "32px",
    border: `1px solid ${theme.border}`,
    boxShadow: `0 8px 32px ${theme.shadow}`,
    position: "relative",
    overflow: "hidden",
  },

  formGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary})`,
    borderRadius: "24px 24px 0 0",
  },

  formGrid: {
    display: "grid",
    gridTemplateColumns: "1fr",
    gap: "16px",
    marginBottom: "24px",
  },

  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },

  label: {
    fontSize: "0.875rem",
    fontWeight: "600",
    color: theme.text,
    marginBottom: "4px",
  },

  input: {
    padding: "16px 20px",
    border: `2px solid ${theme.border}`,
    borderRadius: "12px",
    fontSize: "1rem",
    backgroundColor: theme.surface,
    color: theme.text,
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    outline: "none",
    fontFamily: "inherit",
  },

  inputFocus: {
    borderColor: theme.primary,
    boxShadow: `0 0 0 4px ${theme.primary}20`,
    transform: "scale(1.02)",
  },

  typeToggle: {
    display: "grid",
    gridTemplateColumns: "1fr 1fr",
    gap: "12px",
    marginBottom: "32px",
    padding: "6px",
    backgroundColor: theme.surfaceElevated,
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
  },

  typeButton: {
    padding: "16px",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
    fontSize: "1rem",
    fontWeight: "600",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundColor: "transparent",
    color: theme.textSecondary,
    fontFamily: "inherit",
  },

  typeButtonActive: {
    backgroundColor: theme.primary,
    color: "#ffffff",
    boxShadow: `0 4px 16px ${theme.primary}30`,
    transform: "scale(1.02)",
  },

  filterBar: {
    display: "flex",
    gap: "16px",
    marginBottom: "24px",
    flexWrap: "wrap",
    padding: "20px",
    backgroundColor: theme.surface,
    borderRadius: "12px",
    border: `1px solid ${theme.border}`,
    boxShadow: `0 4px 20px ${theme.shadow}`,
    flexDirection: "column",
  },
});
