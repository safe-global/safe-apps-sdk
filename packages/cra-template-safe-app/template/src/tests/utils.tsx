import { FC, ReactElement } from 'react'
import { render, RenderOptions, RenderResult } from '@testing-library/react'
import { ThemeProvider } from 'styled-components'
import { theme, Title } from '@gnosis.pm/safe-react-components'
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk'

type Props = {
  children: React.ReactNode
}

const AllTheProviders: FC<Props> = ({ children }) => {
  return (
    <ThemeProvider theme={theme}>
      <SafeProvider
        loader={
          <>
            <Title size="md">Waiting for Safe...</Title>
          </>
        }
      >
        {children}
      </SafeProvider>
    </ThemeProvider>
  )
}

const customRender = (ui: ReactElement, options?: Omit<RenderOptions, 'queries'>): RenderResult =>
  render(ui, { wrapper: AllTheProviders, ...options })

export * from '@testing-library/react'

export { customRender as render }
