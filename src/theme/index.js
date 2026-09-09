import React, { createContext, useContext, useMemo } from 'react';
import { useColorScheme } from 'react-native';
import { lightTheme, darkTheme } from './colors';
import { type, fontFamily } from './typography';

export const spacing = (n) => n * 4; // grade base de 4pt
export const radius = { sm: 8, md: 14, lg: 20, xl: 28, pill: 999 };

export const shadow = {
  card: {
    shadowColor: '#04140F',
    shadowOpacity: 0.12,
    shadowRadius: 16,
    shadowOffset: { width: 0, height: 8 },
    elevation: 6,
  },
  sheet: {
    shadowColor: '#04140F',
    shadowOpacity: 0.18,
    shadowRadius: 24,
    shadowOffset: { width: 0, height: -6 },
    elevation: 16,
  },
};

const ThemeContext = createContext(lightTheme);

export function ThemeProvider({ children }) {
  const scheme = useColorScheme();
  const theme = useMemo(
    () => ({
      ...(scheme === 'dark' ? darkTheme : lightTheme),
      spacing,
      radius,
      shadow,
      type,
      fontFamily,
    }),
    [scheme]
  );
  return <ThemeContext.Provider value={theme}>{children}</ThemeContext.Provider>;
}

export function useTheme() {
  return useContext(ThemeContext);
}

export { type, fontFamily };
