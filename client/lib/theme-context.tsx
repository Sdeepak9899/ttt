'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'light' | 'dark' | 'auto';

interface ThemeContextType {
  theme: Theme;
  setTheme: (theme: Theme) => void;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setThemeState] = useState<Theme>('auto');
  const [isDark, setIsDark] = useState(false);
  const [mounted, setMounted] = useState(false);

  // Initialize theme from localStorage and system preference
  useEffect(() => {
    // Get saved theme preference
    const savedTheme = localStorage.getItem('theme') as Theme | null;
    const initialTheme: Theme = savedTheme || 'auto';
    setThemeState(initialTheme);

    // Set up system preference listener
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      applyTheme(initialTheme, mediaQuery.matches);
    };

    // Apply initial theme
    applyTheme(initialTheme, mediaQuery.matches);

    // Listen for system theme changes
    mediaQuery.addEventListener('change', handleChange);

    setMounted(true);

    return () => {
      mediaQuery.removeEventListener('change', handleChange);
    };
  }, []);

  const applyTheme = (selectedTheme: Theme, systemDark: boolean) => {
    const htmlElement = document.documentElement;
    let shouldBeDark = false;

    if (selectedTheme === 'auto') {
      shouldBeDark = systemDark;
    } else {
      shouldBeDark = selectedTheme === 'dark';
    }

    if (shouldBeDark) {
      htmlElement.classList.add('dark');
    } else {
      htmlElement.classList.remove('dark');
    }

    setIsDark(shouldBeDark);
  };

  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem('theme', newTheme);

    // Get current system preference
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    applyTheme(newTheme, mediaQuery.matches);
  };

  if (!mounted) {
    return (
      <ThemeContext.Provider value={{ theme: 'auto', setTheme: () => {}, isDark: false }}>
        {children}
      </ThemeContext.Provider>
    );
  }

  return (
    <ThemeContext.Provider value={{ theme, setTheme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  const context = useContext(ThemeContext);
  if (context === undefined) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
}
