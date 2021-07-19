# Safe Apps React SDK

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-apps-react-sdk)](https://www.npmjs.com/package/@gnosis.pm/safe-apps-react-sdk)

This sdk should provide a simple way to write a React.js [Safe app](https://docs.gnosis.io/safe/docs/sdks_safe_apps/)

### How to use

- Add npm package

```bash
yarn add @gnosis.pm/safe-apps-react-sdk

npm i @gnosis.pm/safe-apps-react-sdk
```

- Add `SafeProvider`
  Safe provider accepts `loader` and `options` props

```js
// ... other imports
import SafeProvider from '@gnosis.pm/safe-apps-react-sdk';

ReactDOM.render(
  <React.StrictMode>
    <SafeProvider>
      <App /> // Your app
    </SafeProvider>
  </React.StrictMode>,
  document.getElementById('root'),
);
```

- Use Safe Apps SDK Hook

```js
// ... other imports
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

const App = () => {
  const { sdk, connected, safe } = useSafeAppsSDK();
  return <div>{safe.safeAddress}</div>;
};
```

### Usages

#### Send transactions

```js
import { BaseTransaction } from '@gnosis.pm/safe-apps-sdk'

const txs: BaseTransaction[] = [
  {
    to: '0x31415629...',
    value: '0',
    data: '0xbaddad',
  },
  //...
];
// Returns a hash to identify the Safe transaction
const safeTxHash: string = await sdk.txs.send({ txs });
```

#### Load Safe transaction information

```js
const safeTx: SafeTransaction = await sdk.txs.getBySafeTxHash(safeTxHash);
```

#### More scenarios

For all available sdk methods, please refer to the [safe-apps-sdk](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-sdk) documentation
