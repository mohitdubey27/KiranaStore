import React, { createContext, useContext, useState, ReactNode } from 'react';

export type ThemeColors = {
  background: string;
  textPrimary: string;
  textMuted: string;
  border: string;
  surface: string;
  primary: string;
  onPrimary: string;
  placeholder: string;
  primaryVariant: string;
  shadow: string;
  danger: string;
  success: string;
};

export type FontSizes = {
  xs: number;
  sm: number;
  md: number;
  lg: number;
  xl: number;
};

export type Theme = {
  colors: ThemeColors;
  fontSizes: FontSizes;
};

const defaultTheme: Theme = {
  colors: {
    background: '#FFFDF7',
    textPrimary: '#0f172a',
    textMuted: '#6b7280',
    border: '#e6e2d3',
    surface: '#ffffff',
    primary: '#f97316',
    success: '#27AE60',
    primaryVariant: '#ffd8b0',
    onPrimary: '#ffffff',
    placeholder: '#9ca3af',
    shadow: 'rgba(15,23,42,0.06)',
    danger: '#ef4444',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
  },
};

const ThemeContext = createContext<{
  theme: Theme;
  setTheme: (t: Theme) => void;
}>({
  theme: defaultTheme,
  setTheme: () => {},
});

export const ThemeProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [theme, setTheme] = useState<Theme>(defaultTheme);
  return (
    <ThemeContext.Provider value={{ theme, setTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = (): Theme => {
  const ctx = useContext(ThemeContext);
  return ctx.theme;
};

export const useSetTheme = () => {
  const ctx = useContext(ThemeContext);
  return ctx.setTheme;
};

export const lightTheme = defaultTheme;

export const darkTheme: Theme = {
  colors: {
    background: '#0b1220',
    textPrimary: '#e6eef8',
    textMuted: '#9aa4b2',
    border: '#1f2a37',
    surface: '#0f1724',
    primary: '#60a5fa',
    success: '#27AE60',
    primaryVariant: '#2b6cb0',
    onPrimary: '#04263b',
    shadow: 'rgba(0,0,0,0.36)',
    danger: '#fca5a5',
    placeholder: '#6b7280',
  },
  fontSizes: {
    xs: 12,
    sm: 14,
    md: 16,
    lg: 18,
    xl: 22,
  },
};

export default ThemeProvider;
