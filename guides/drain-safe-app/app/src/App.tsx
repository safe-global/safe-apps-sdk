import React from 'react'
import { Container, Button, TextField, Typography } from '@mui/material'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { useSafeBalances } from './hooks/useSafeBalances'
import BalancesTable from './components/BalancesTable'
import { getTransferTransaction } from './api/transfers'

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
      <Typography variant="h3">Safe: {safe.safeAddress}</Typography>

      <BalancesTable balances={balances} />

      <TextField
        label="Recipient"
        onChange={(e) => {
          setRecipient(e.target.value)
        }}
        value={recipient}
      />

      <Button variant="contained" color="primary" onClick={handleTransfer}>
        Send the assets
      </Button>
    </Container>
  )
}

export default SafeApp
