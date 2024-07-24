import * as React from 'react';
import {
  Experimental_CssVarsProvider as CssVarsProvider,
  experimental_extendTheme as extendTheme,
} from '@mui/material/styles';

const baseTheme = extendTheme();

const darkTheme = extendTheme({
  colorSchemes: {
    light: baseTheme.colorSchemes.dark,
    dark: baseTheme.colorSchemes.dark,
    // dark: {
    //   palette: {
    //     background: {
    //       default: '#2e353d',
    //     },
    //     text: {
    //       primary: '#e9e9e9',
    //       secondary: '#cacaca',
    //     },
    //   },
    // },
  },
});

export interface DataGridThemeProps {
  children: React.ReactNode;
}

export function DataGridTheme({
  children,
}: DataGridThemeProps): React.JSX.Element {
  return (
    <CssVarsProvider
      defaultMode="dark"
      disableNestedContext
      theme={darkTheme}
    >
      {children}
    </CssVarsProvider>
  );
}