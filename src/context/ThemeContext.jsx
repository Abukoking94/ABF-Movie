import React, { useState } from "react";
import { ThemeContext } from "./theme";

export const ThemeProvider = ({ children }) => {
  const [darkMode, setDarkMode] = useState(true);

  const toggleTheme = () => setDarkMode(!darkMode);

  return (
    <ThemeContext.Provider value={{ darkMode, toggleTheme }}>
      <div
        className={darkMode ? "bg-gray-900 text-white" : "bg-white text-black"}
      >
        {children}
      </div>
    </ThemeContext.Provider>
  );
};
