import React from 'react'
import styled from 'styled-components'
import { Title } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { useSafeBalances } from './hooks/useSafeBalances'
import BalancesTable from './components/BalancesTable'

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()
  const [balances] = useSafeBalances(sdk)

  console.log({ balances })

  return (
    <Container>
      <Title size="sm">Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />

      {/* <Button size="lg" color="primary">
        Send the assets
      </Button> */}
    </Container>
  )
}

export default SafeApp
