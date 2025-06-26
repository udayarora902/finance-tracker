import React from "react";

export const Header = ({ isDarkMode, setIsDarkMode, styles }) => (
  <header style={styles.header}>
    <div style={styles.headerGlow}></div>

    <div style={styles.headerContent}>
      <h1 style={styles.title}>FinanceFlow</h1>
      <p style={styles.subtitle}>Your personal finance dashboard</p>
    </div>

    <div style={styles.themeToggle}>
      <span style={{ fontSize: "1.25rem" }}>☀️</span>
      <button
        style={{
          ...styles.toggleSwitch,
          ...(isDarkMode ? styles.toggleSwitchActive : {}),
        }}
        onClick={() => setIsDarkMode(!isDarkMode)}
      >
        <div
          style={{
            ...styles.toggleKnob,
            left: isDarkMode ? "36px" : "4px",
          }}
        >
          <span style={{ fontSize: "0.75rem" }}>
            {isDarkMode ? "🌙" : "☀️"}
          </span>
        </div>
      </button>
      <span style={{ fontSize: "1.25rem" }}>🌙</span>
    </div>
  </header>
);
