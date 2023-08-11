import React, { useCallback } from 'react'
import { Container, Button, Grid, Link, Typography } from '@mui/material'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()

  const submitTx = useCallback(async () => {
    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: '0x',
          },
        ],
      })
      console.log({ safeTxHash })
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash)
      console.log({ safeTx })
    } catch (e) {
      console.error(e)
    }
  }, [safe, sdk])

  return (
    <Container>
      <Grid container direction="column" rowSpacing={2} alignItems="center">
        <Grid item>
          <Typography variant="h3">Safe: {safe.safeAddress}</Typography>
        </Grid>
        <Grid item>
          <Button variant="contained" color="primary" onClick={submitTx}>
            Click to send a test transaction
          </Button>
        </Grid>

        <Grid item>
          <Link href="https://github.com/safe-global/safe-apps-sdk" target="_blank" rel="noreferrer">
            Documentation
          </Link>
        </Grid>
      </Grid>
    </Container>
  )
}

export default SafeApp
