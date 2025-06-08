
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
import { ThemeDefinition, ThemeStyleProps } from '../types';
import { themes, getDefaultTheme } from '../themes';

interface ThemeContextType {
  theme: ThemeStyleProps;
  themeName: string;
  changeTheme: (themeName: string) => void;
  availableThemes: ThemeDefinition[];
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [currentTheme, setCurrentTheme] = useState<ThemeDefinition>(() => {
    // Initialize theme from localStorage synchronously if possible
    const savedThemeName = typeof window !== 'undefined' ? localStorage.getItem('appTheme') : null;
    if (savedThemeName) {
      const savedTheme = themes.find(t => t.name === savedThemeName);
      if (savedTheme) return savedTheme;
    }
    return getDefaultTheme();
  });

  const changeTheme = (name: string) => {
    const newTheme = themes.find(t => t.name === name) || getDefaultTheme();
    setCurrentTheme(newTheme);
    localStorage.setItem('appTheme', name);
  };

  // Effect to apply body class, runs on initial load and when theme changes
  useEffect(() => {
    document.body.className = currentTheme.styles.bgBody; 
  }, [currentTheme]);


  return (
    <ThemeContext.Provider value={{ theme: currentTheme.styles, themeName: currentTheme.name, changeTheme, availableThemes: themes }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): ThemeContextType => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};
