import { render, screen } from './tests/utils'
import App from './App'

test('renders learn loading screen', () => {
  render(<App />)
  const waitingHeading = screen.getByText(/Waiting for Safe/i)
  expect(waitingHeading).toBeInTheDocument()
})
