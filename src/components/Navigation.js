import React from "react";

export const Navigation = ({ activeTab, setActiveTab, styles }) => (
  <nav style={styles.navigation}>
    {["dashboard", "transactions", "analytics"].map((tab) => (
      <button
        key={tab}
        style={{
          ...styles.navButton,
          ...(activeTab === tab ? styles.navButtonActive : {}),
        }}
        onClick={() => setActiveTab(tab)}
      >
        {tab.charAt(0).toUpperCase() + tab.slice(1)}
      </button>
    ))}
  </nav>
);
