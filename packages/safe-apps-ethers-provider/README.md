# Safe Apps Ethers Provider

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-apps-ethers-provider)](https://www.npmjs.com/package/@gnosis.pm/safe-apps-ethers-provider)

This is an `ethers.js` provider and signer to use with `ethers.js` contract instances.

### How to use

- Add npm package

```bash
yarn add @gnosis.pm/safe-apps-ethers-provider

npm i @gnosis.pm/safe-apps-ethers-provider
```

### SafeAppsSdkProvider (Read-only access)

From [ethers.js documentation](https://docs.ethers.io/v5/api/providers/):

> A **Provider** is an abstraction of a connection to the Ethereum network, providing a concise, consistent interface to standard Ethereum node functionality.

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

  // calling read methods
  const getSomething = async () => {
    const balance = await contract.getBalance('0x000');
  };

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

### SafeAppsSdkSigner (Read/Write access)

From [ethers.js documentation](https://docs.ethers.io/v5/api/signer/):

> A **Signer** in ethers is an abstraction of an Ethereum Account, which can be used to sign messages and transactions and send signed transactions to the Ethereum Network to execute state changing operations.

- Usage example with [safe-apps-react-sdk](https://github.com/gnosis/safe-apps-sdk/tree/master/packages/safe-apps-react-sdk)

```js
import React, { useMemo, useState } from 'react';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { ethers } from 'ethers';
import { SafeAppsSdkSigner } from '@gnosis.pm/safe-apps-ethers-provider';
import Contract from './contracts/DelayedTxModule.json';

const App = () => {
  const { sdk, safe } = useSafeAppsSDK();
  const contract = useMemo(() => ethers.Contract(Contract.address, Contract.abi, new SafeAppsSdkSigner(safe, sdk)), [
    sdk,
    safe,
  ]);

  // calling read/write methods
  const doSomething = async () => {
    const { hash } = await contract.someFunc('someArg');
  };

  return;
};

export default App;
```

#### More scenarios

For the SDK overview documentation, please refer to the [safe-apps-sdk](https://github.com/gnosis/safe-apps-sdk/) documentation
