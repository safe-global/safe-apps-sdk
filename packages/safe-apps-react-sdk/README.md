# Safe Apps React SDK

[![npm](https://img.shields.io/npm/v/@rmeissner/safe-apps-react-sdk)](https://www.npmjs.com/package/@rmeissner/safe-apps-react-sdk)

This sdk should provide a simple way to write a React.js [Safe app](https://docs.gnosis.io/safe/docs/sdks_safe_apps/)

### How to use

- Add npm package
```bash
yarn add @rmeissner/safe-apps-react-sdk
```

- Add `SafeProvider`
```js
// ... other imports
import SafeProvider from '@rmeissner/safe-apps-react-sdk';

ReactDOM.render(
  <React.StrictMode>
    <SafeProvider>
      <App /> // Your app
    </SafeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);
```

- Use Safe
```js
// ... other imports
import { useSafe } from '@rmeissner/safe-apps-react-sdk';

const App = () => {
  const safe = useSafe()
  return (<div>{safe.info.safeAddress}</div>)
}
```

### Usages

#### Send transactions
```js
const txs: Transaction[] = [
  {
    "to": "0x31415629...",
    "value": "0",
    "data": "0xbaddad"
  },
  //...
]
// Returns a hash to identify the Safe transaction
const safeTxHash: string = await safe.sendTransactions(txs)
```

#### Load Safe transaction information
```js
const safeTx: SafeTransaction = await safe.loadSafeTransaction(safeTxHash)
```