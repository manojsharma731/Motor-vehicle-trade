import React, { createContext, useState, useContext } from 'react';

// Create a context for dark mode
const DarkModeContext = createContext();

// Custom hook to use the DarkModeContext
export const useDarkMode = () => useContext(DarkModeContext);

// DarkModeProvider component that wraps around the app and provides the theme context
export const DarkModeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  // Function to toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode((prevMode) => !prevMode);
  };

  return (
    <DarkModeContext.Provider value={{ isDarkMode, toggleDarkMode }}>
      <div className={isDarkMode ? 'dark-mode' : 'light-mode'}>
        {children}
      </div>
    </DarkModeContext.Provider>
  );
};