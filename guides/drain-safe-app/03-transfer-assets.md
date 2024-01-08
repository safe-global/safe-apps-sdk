# Transfer assets from the safe

You have everything ready for the final step: transferring assets outside the Safe. To get pieces together, you'll need:

1. A button that will trigger the transfer
2. An input for the recipient address
3. A function that generates transaction data for the transfer

Edit the `src/App.tsx` to add the input, button, and a transfer click handler:

```tsx
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
    const transactions = []

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
```

Now, the only thing missing is the function that creates transactions. You can propose transactions to the Safe by calling `sdk.txs.send` method. It expects an object with the below structure:

```tsx
{
  txs: [
    {
      value: '0', // Ether value of the transaction in WEI
      recipient: '0x0000000000000000000000000000000000000000', // Transaction recipient
      data: '0x', // Transaction data
    },
  ]
}
```

One feature that differentiates smart wallets from EOA accounts is that you can batch multiple transactions into one; the function accepts an array of transactions. This is why it's possible to transfer all the assets in a single transaction. To use it, you need to encode the transaction data for each transfer.

Create a file `src/api/transfers.ts`:

```ts
import { encodeFunctionData } from 'viem'
import { BaseTransaction, TokenBalance, TokenType } from '@safe-global/safe-apps-sdk'
import { ERC_20_ABI } from '../abis/erc20'

function encodeERC20TransferData(recipient: string, amount: string): string {
  return encodeFunctionData({
    abi: ERC_20_ABI,
    functionName: 'transfer',
    args: [recipient, amount],
  })
}

function getTransferTransaction(item: TokenBalance, recipient: string): BaseTransaction {
  if (item.tokenInfo.type === TokenType.NATIVE_TOKEN) {
    return {
      // Send ETH directly to the recipient address
      to: recipient,
      value: item.balance,
      data: '0x',
    }
  }

  return {
    // For other token types, generate a contract tx
    to: item.tokenInfo.address,
    value: '0',
    data: encodeERC20TransferData(recipient, item.balance),
  }
}

export { getTransferTransaction }
```

Now you're all set to use the App component. You only need to change the `handleTransfer` function:

```ts
const handleTransfer = async (): Promise<void> => {
  const transactions = balances.map((balance) => getTransferTransaction(balance, recipient))

  const { safeTxHash } = await sdk.txs.send({ txs: transactions })

  console.log({ safeTxHash })
}
```

The `sdk.txs.send` is async and returns an object with the `safeTxHash` property. It corresponds to the Safe Transaction hash, and it is different from the regular ethereum transaction hash. We'll cover it in the next section.

Now, if you click on the button, you should see a modal in the Safe web app.

![Screenshot of a transaction modal](/guides/drain-safe-app/images/final-transaction-modal.png)

# Additional: Tracking the transaction status

Because Safe is a multi-signature wallet and transactions must be confirmed by multiple parties, it's not immediately proposed to the blockchain. Instead, transactions and owner's signatures are stored off-chain on the Safe transaction service, and someone can execute it as soon as the transaction has enough signatures.

We use the Safe Transaction hash as an ID of the transaction, and it's just a sha3 hash of all the transaction properties.

To get the transaction from the backend, you can use:

```ts
const tx = await sdk.txs.getBySafeTxHash(safeTxHash)
```

An example transaction:

```json
{
  "executedAt": null,
  "txStatus": "AWAITING_CONFIRMATIONS",
  "txInfo": {
    "type": "SettingsChange",
    "dataDecoded": {
      "method": "changeThreshold",
      "parameters": [
        {
          "name": "_threshold",
          "type": "uint256",
          "value": "2"
        }
      ]
    }
  },
  "txData": {
    "hexData": "0x694e80c30000000000000000000000000000000000000000000000000000000000000002",
    "dataDecoded": {
      "method": "changeThreshold",
      "parameters": [
        {
          "name": "_threshold",
          "type": "uint256",
          "value": "2"
        }
      ]
    },
    "to": "0x1230B3d59858296A31053C1b8562Ecf89A2f888b",
    "value": "0",
    "operation": 0
  },
  "detailedExecutionInfo": {
    "type": "MULTISIG",
    "submittedAt": 1596792600322,
    "nonce": 180,
    "safeTxHash": "0x0ef685fb7984d7314c1368497e1b0c73016066bec41f966d32f18354b88fbd46",
    "signers": [
      "0xBEA2F9227230976d2813a2f8b922c22bE1DE1B23",
      "0x37e9F140A9Df5DCBc783C6c220660a4E15CBFe72",
      "0xA3DAa0d9Ae02dAA17a664c232aDa1B739eF5ae8D",
      "0xF2CeA96575d6b10f51d9aF3b10e3e4E5738aa6bd",
      "0x65F8236309e5A99Ff0d129d04E486EBCE20DC7B0"
    ],
    "confirmationsRequired": 3,
    "confirmations": [
      {
        "signer": "0xBEA2F9227230976d2813a2f8b922c22bE1DE1B23",
        "signature": "0x1b01f3d79a50576e82d1da31810c0313bed9b76b016e1d9c6216512b2c7e53bb70df8163e568ca8ec1b8c7e7ef0a8db52d6ab2b7f47dc51c31729dd064ce375b1c"
      }
    ]
  },
  "txHash": null
}
```

You can find more examples in the [backend docs](https://github.com/safe-global/safe-client-gateway#documentation)

# Publishing

Let's get it ready for publishing. First, you need to update the `manifest.json` with app's data. Go to `public/manifest.json`:

```json
{
  "short_name": "Safe App",
  "name": "Safe App Starter",
  "description": "Describe your Safe App here",
  "icons": [
    {
      "src": "logo.svg",
      "sizes": "any",
      "type": "image/svg+xml"
    },
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    },
    {
      "src": "logo192.png",
      "type": "image/png",
      "sizes": "192x192"
    },
    {
      "src": "logo512.png",
      "type": "image/png",
      "sizes": "512x512"
    }
  ],
  "start_url": ".",
  "display": "standalone",
  "theme_color": "#000000",
  "background_color": "#ffffff"
}
```

Let's add the name, short name, description and an icon:

```json
  "short_name": "Drain Safe",
  "name": "Drain Safe",
  "description": "Migrate all your Safe assets in one transaction",
  "icons": [
    {
      "src": "favicon.ico",
      "sizes": "64x64 32x32 24x24 16x16",
      "type": "image/x-icon"
    }
  ]
```

Everything is self-explanatory, expect `icons[n].src` property that has to be a relative url from the URL app is hosted at.

Congrats! You've just made your first Safe app.
