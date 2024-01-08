# Display a list of Safe's assets

Let's add a table that displays Safe's owned assets to the App. But first, you need the following pieces:

1. A function that fetches the assets
2. Table component
3. Add the table component to the App

Create a file `src/hooks/useSafeBalances.ts` with the following content:

```ts
import SafeAppsSDK, { TokenBalance } from '@safe-global/safe-apps-sdk'
import { useState, useEffect } from 'react'

function useSafeBalances(sdk: SafeAppsSDK): [TokenBalance[], boolean] {
  const [assets, setAssets] = useState<TokenBalance[]>([])
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    async function loadBalances() {
      const balances = await sdk.safe.experimental_getBalances()

      setAssets(balances.items.filter((item) => parseInt(item.fiatBalance) > 0))
      setLoaded(true)
    }

    loadBalances()
  }, [sdk])

  return [assets, loaded]
}

export { useSafeBalances }
```

This is `useSafeBalance` hook that calls the SDK function `sdk.safe.experimental_getBalances` and filters out tokens with zero fiat balance.

You should import this hook into `src/App.tsx` and use it to get the list of assets owned by the Safe. Then, remove the documentation link, `submitTx` function and comment out the button that used the submit function and add the hook:

```ts
import React from 'react'
import { Container, Button, TextField, Typography } from '@mui/material'
import { useSafeAppsSDK } from '@safe-global/safe-apps-react-sdk'
import { useSafeBalances } from './hooks/useSafeBalances'

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK()
  const [balances] = useSafeBalances(sdk)

  console.log({ balances })

  return (
    <Container>
      <Typography variant="h3">Safe: {safe.safeAddress}</Typography>

      {/* <Button variant="contained" color="primary">
        Send the assets
      </Button> */}
    </Container>
  )
}

export default SafeApp
```

If you load the App inside the Safe, you should see Safe's assets list in the console. Create a Table component that displays the assets.

`src/components/BalancesTable.tsx`:

```ts
import Table from '@mui/material/Table'
import TableBody from '@mui/material/TableBody'
import TableCell from '@mui/material/TableCell'
import TableContainer from '@mui/material/TableContainer'
import TableHead from '@mui/material/TableHead'
import TableRow from '@mui/material/TableRow'
import Paper from '@mui/material/Paper'
import { TokenBalance, TokenInfo, TokenType } from '@safe-global/safe-apps-sdk'
import { formatUnits } from 'viem'

const ethToken: TokenInfo = {
  address: '0x0000000000000',
  type: TokenType.NATIVE_TOKEN,
  logoUri: '/eth.svg', // will be taken from public/ folder
  symbol: 'ETH',
  name: 'Ether',
  decimals: 18,
}

const formatTokenValue = (value: number | string, decimals: number): string => {
  return formatUnits(BigInt(value), decimals)
}

const formatCurrencyValue = (value: string, currency: string): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(value))
}

function BalancesTable({ balances }: { balances: TokenBalance[] }): JSX.Element {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label="assets table">
        <TableHead>
          <TableRow>
            <TableCell>Asset</TableCell>
            <TableCell>Amount</TableCell>
            <TableCell>Value, USD</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {balances.map((item: TokenBalance, index: number) => {
            const token = item.tokenInfo.type === TokenType.NATIVE_TOKEN ? ethToken : item.tokenInfo

            return (
              <TableRow key={`row${index}`} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
                <TableCell>
                  <div style={{ display: 'flex', alignItems: 'center' }}>
                    <img src={token.logoUri || undefined} alt={`${token.symbol} Logo`} width={25} />
                    {token.name}
                  </div>
                </TableCell>
                <TableCell>{formatTokenValue(item.balance, token.decimals)}</TableCell>
                <TableCell>{formatCurrencyValue(item.fiatBalance, 'USD')}</TableCell>
              </TableRow>
            )
          })}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default BalancesTable
```

It iterates over the array of balances and creates corresponding DOM elements. It also includes two functions:

- `formatTokenValue` - converts the token amount to a human-readable value with decimals
- `formatFiatValue` - converts the fiat value according to user's locale

Let's hook it into our `App.tsx`:

```tsx
<Container>
  <Typography variant="h3">Safe: {safe.safeAddress}</Typography>
  <BalancesTable balances={balances} />

  {/* <Button variant="contained" color="primary">
        Send the assets
      </Button> */}
</Container>
```

Now you should be able to see the assets table when you load the App.

![Screenshot display the assets](/guides/drain-safe-app/images/assets-table.png)

Congrats! You're halfway through - the only thing left is generating the transaction data for transfers, which you'll learn in the next section - [Transfer assets](/guides/drain-safe-app/03-transfer-assets.md).
