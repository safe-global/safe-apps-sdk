import React from 'react'
import styled from 'styled-components'
import { Title, TextField, Button } from '@gnosis.pm/safe-react-components'
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk'
import { useSafeBalances } from './hooks/useSafeBalances'
import BalancesTable from './components/BalancesTable'
import { getTransferTransaction } from './api/transfers'

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
  const [recipient, setRecipient] = React.useState('')

  const handleTransfer = async (): Promise<void> => {
    const transactions = balances.map((balance) => getTransferTransaction(balance, recipient))

    const { safeTxHash } = await sdk.txs.send({ txs: transactions })

    console.log({ safeTxHash })
  }

  return (
    <Container>
      <Title size="sm">Safe: {safe.safeAddress}</Title>
      <BalancesTable balances={balances} />

      <TextField
        label="Recipient"
        onChange={(e) => {
          setRecipient(e.target.value)
        }}
        value={recipient}
      />
      <Button size="lg" color="primary" onClick={handleTransfer}>
        Send the assets
      </Button>
    </Container>
  )
}

export default SafeApp
