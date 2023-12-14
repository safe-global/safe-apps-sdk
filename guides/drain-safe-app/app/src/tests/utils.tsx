import { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from '@mui/material/styles'
import Typography from '@mui/material/Typography'
import { createSafeTheme } from '@safe-global/safe-react-components'
import SafeProvider from '@safe-global/safe-apps-react-sdk'

type Props = {
  children: React.ReactNode
}

const theme = createSafeTheme('light')

// Custom render pattern from https://testing-library.com/docs/react-testing-library/setup/#custom-render

const AllTheProviders: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SafeProvider
        loader={
          <>
            <Typography variant="h1">Waiting for Safe...</Typography>
          </>
        }
      >
        {children}
      </SafeProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'wrapper'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
