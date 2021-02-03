# Safe Apps Ethers Provider

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-apps-ethers-provider)](https://www.npmjs.com/package/@gnosis.pm/safe-apps-ethers-provider)

This is an ethers.js provider to use with ethers.js contract instances.

### How to use

- Add npm package

```bash
yarn add @gnosis.pm/safe-apps-ethers-provider
```

- Usage example with [safe-apps-react-sdk](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-react-sdk)

```js
import React, { useMemo, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { ethers } from 'ethers';
import { SafeAppsSdkProvider } from '@gnosis.pm/safe-apps-ethers-provider';
import Contract from './contracts/DelayedTxModule.json';

const App = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const contract = useMemo(() => ethers.Contract(Contract.address, Contract.abi, new SafeAppsSdkProvider(safe, sdk)), [
    sdk,
    safe,
  ]);

  // calling write methods
  const doSomething = async () => {
    const { safeTxHash } = await sdk.txs.send({
      txs: [
        {
          to: safe.safeAddress,
          value: '0',
          data: contract.interface.encodeFunctionData('someFunc', ['someArg']),
        },
      ],
    });
  };

  return;
};

export default App;
```

#### More scenarios

For the SDK overview documentation, please refer to the [safe-apps-sdk](https://github.com/gnosis/safe-apps-sdk/) documentation
