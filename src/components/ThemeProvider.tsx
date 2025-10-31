import { createContext, useContext, useEffect, useState } from 'react';

type Theme = 'dark' | 'light';

type ThemeProviderProps = {
  children: React.ReactNode;
  defaultTheme?: Theme;
  storageKey?: string;
};

type ThemeProviderState = {
  theme: Theme;
  setTheme: (theme: Theme) => void;
};

const initialState: ThemeProviderState = {
  theme: 'light',
  setTheme: () => null,
};

const ThemeProviderContext = createContext<ThemeProviderState>(initialState);

const DARK_MODE_QUERY = '(prefers-color-scheme: dark)';

export function ThemeProvider({
  children,
  defaultTheme = 'light',
  storageKey = 'ui-theme',
  ...props
}: ThemeProviderProps) {
  const [theme, setTheme] = useState<Theme>(() => {
    // Check localStorage first
    const stored = localStorage.getItem(storageKey);
    if (stored === 'dark' || stored === 'light') {
      return stored;
    }
    
    // If no stored preference, check system preference
    if (window.matchMedia && window.matchMedia(DARK_MODE_QUERY).matches) {
      return 'dark';
    }
    
    // Fall back to defaultTheme
    return defaultTheme;
  });

  useEffect(() => {
    const root = window.document.documentElement;

    root.classList.remove('light', 'dark');
    root.classList.add(theme);
  }, [theme]);

  // Listen for system theme changes only if user hasn't set a preference
  useEffect(() => {
    // Check if matchMedia is supported
    if (!window.matchMedia) {
      return;
    }

    const mediaQuery = window.matchMedia(DARK_MODE_QUERY);
    
    const handleChange = (e: MediaQueryListEvent) => {
      // Only update if there's no stored preference
      if (!localStorage.getItem(storageKey)) {
        setTheme(e.matches ? 'dark' : 'light');
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [storageKey]);

  const value = {
    theme,
    setTheme: (newTheme: Theme) => {
      localStorage.setItem(storageKey, newTheme);
      setTheme(newTheme);
    },
  };

  return (
    <ThemeProviderContext.Provider {...props} value={value}>
      {children}
    </ThemeProviderContext.Provider>
  );
}

export const useTheme = () => {
  const context = useContext(ThemeProviderContext);

  if (context === undefined)
    throw new Error('useTheme must be used within a ThemeProvider');

  return context;
};
