import './index.css'

import { createTheme, CssBaseline,ThemeProvider } from '@mui/material'
import React from 'react'
import ReactDOM from 'react-dom/client'

import App from './App.tsx'

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#7e57c2', // Deep purple from the original "Dark Pastel" aesthetic
    },
    background: {
      default: '#0f172a', // Slate 900
      paper: '#1e293b',   // Slate 800
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          textTransform: 'none',
        },
      },
    },
  },
})

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={darkTheme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>,
)
