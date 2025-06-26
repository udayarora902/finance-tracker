export const createChartStyles = (theme) => ({
  chart: {
    backgroundColor: theme.surface,
    borderRadius: "20px",
    padding: "32px",
    border: `1px solid ${theme.border}`,
    marginBottom: "32px",
    boxShadow: `0 8px 32px ${theme.shadow}`,
    backdropFilter: "blur(12px)",
  },

  chartBar: {
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "16px",
  },

  chartLabel: {
    minWidth: "120px",
    fontSize: "0.875rem",
    fontWeight: "600",
    color: theme.text,
  },

  chartTrack: {
    flex: 1,
    height: "32px",
    backgroundColor: theme.surfaceElevated,
    borderRadius: "16px",
    overflow: "hidden",
    position: "relative",
    border: `1px solid ${theme.border}`,
  },

  chartFill: {
    height: "100%",
    borderRadius: "16px",
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    paddingRight: "12px",
    color: "#ffffff",
    fontSize: "0.875rem",
    fontWeight: "700",
    transition: "width 1s cubic-bezier(0.4, 0, 0.2, 1)",
    textShadow: "0 1px 2px rgba(0,0,0,0.5)",
  },
});
