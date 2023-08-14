import React from 'react'
import ReactDOM from 'react-dom/client'
import { Theme, ThemeProvider } from '@mui/material/styles'
import CircularProgress from '@mui/material/CircularProgress'
import Typography from '@mui/material/Typography'
import { SafeThemeProvider } from '@safe-global/safe-react-components'
import SafeProvider from '@safe-global/safe-apps-react-sdk'

import App from './App'

const rootElement = document.getElementById('root')
if (!rootElement) throw new Error('Root element not found on public/index.html')

const root = ReactDOM.createRoot(rootElement)
root.render(
  <React.StrictMode>
    <SafeThemeProvider mode="light">
      {(safeTheme: Theme) => (
        <ThemeProvider theme={safeTheme}>
          <SafeProvider
            loader={
              <>
                <Typography variant="h1">Waiting for Safe...</Typography>
                <CircularProgress color="primary" />
              </>
            }
          >
            <App />
          </SafeProvider>
        </ThemeProvider>
      )}
    </SafeThemeProvider>
  </React.StrictMode>,
)
