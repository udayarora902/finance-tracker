export const createLayoutStyles = (theme) => ({
  container: {
    width: "100%",
    maxWidth: "none",
    margin: "0 auto",
    padding: "32px 5%",
    fontFamily:
      '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, "Helvetica Neue", Arial, sans-serif',
    backgroundColor: theme.bg,
    minHeight: "100vh",
    transition: "all 0.3s cubic-bezier(0.4, 0, 0.2, 1)",
    backgroundImage: `
      radial-gradient(circle at 20% 80%, ${theme.primary}08 0%, transparent 50%),
      radial-gradient(circle at 80% 20%, ${theme.secondary}08 0%, transparent 50%),
      radial-gradient(circle at 40% 40%, ${theme.success}05 0%, transparent 50%)
    `,
  },

  grid: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))",
    gap: "20px",
    marginBottom: "32px",
  },

  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    padding: "24px 20px",
    background: theme.surface,
    borderRadius: "16px",
    border: `1px solid ${theme.border}`,
    boxShadow: `0 4px 20px ${theme.shadow}`,
    backdropFilter: "blur(12px)",
    position: "relative",
    overflow: "hidden",
    flexDirection: "row",
  },

  headerContent: {
    flex: 1,
    textAlign: "center",
  },

  headerGlow: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    height: "2px",
    background: `linear-gradient(90deg, ${theme.primary}, ${theme.secondary}, ${theme.success})`,
    borderRadius: "24px 24px 0 0",
  },
});
