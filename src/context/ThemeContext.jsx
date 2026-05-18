import { createContext, useContext, useEffect, useState } from 'react';

const ThemeContext = createContext(null);

const THEMES = ['dark', 'white', 'warm'];

export function ThemeProvider({ children }) {
  const [theme, setThemeState] = useState(() => {
    try {
      const saved = localStorage.getItem('marketplace-theme');
      if (THEMES.includes(saved)) return saved;
    } catch {}
    return 'dark';
  });

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', theme);
    try {
      localStorage.setItem('marketplace-theme', theme);
    } catch {}
  }, [theme]);

  function setTheme(next) {
    if (THEMES.includes(next)) setThemeState(next);
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const ctx = useContext(ThemeContext);
  if (!ctx) throw new Error('useTheme must be used inside ThemeProvider');
  return ctx;
}
