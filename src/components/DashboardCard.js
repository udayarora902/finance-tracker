import React from "react";

export const DashboardCard = ({
  icon,
  title,
  value,
  cardStyle,
  gradientStyle,
  styles,
  onHover,
  onLeave,
  isHovered,
}) => (
  <div
    style={{
      ...styles.card,
      ...cardStyle,
      ...(isHovered ? styles.cardHover : {}),
    }}
    onMouseEnter={onHover}
    onMouseLeave={onLeave}
  >
    <div style={{ ...styles.cardGradient, ...gradientStyle }}></div>
    <div style={styles.cardHeader}>
      <span style={styles.cardIcon}>{icon}</span>
      <h3 style={styles.cardTitle}>{title}</h3>
    </div>
    <p style={styles.cardValue}>{value}</p>
  </div>
);
