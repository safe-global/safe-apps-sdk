# Safe Apps SDK

[![Logo](https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/logo.png)](https://gnosis.pm/)

[![Build Status](https://travis-ci.org/gnosis/safe-apps-sdk.svg?branch=master)](https://travis-ci.org/gnosis/pm-contracts)

Software development kit to integrate third-party applications (Safe Apps) with Safe Multisig (https://gnosis-safe.io/app/).

## Install

### Install requirements with yarn:

```bash
yarn add @gnosis.pm/safe-apps-sdk
```

## Build

```bash
yarn install
yarn build
```

## Documentation

Apps built with this Sdk are meant to be run in a iframe inside the Safe Web UI.
This library exposes a single method called `initSdk` that receives a single optional parameter, an array of regular expressions. By default it's configured to accept messages from this URLs:

- mainnet: https://gnosis-safe.io,
- mainnet-staging: https://safe-team.staging.gnosisdev.com,
- rinkeby: https://rinkeby.gnosis-safe.io,
- rinkeby-staging: https://safe-team-rinkeby.staging.gnosisdev.com,
- rinkeby-dev: https://safe-team.dev.gnosisdev.com

By passing the argument to `initSdk` you can add more URLs to the list. It's useful when you are running a local instance of Safe Multisig.

```js
import React, { useState, useEffect } from "react";
import initSdk from '@gnosis.pm/safe-apps-sdk'

const [appsSdk] = useState(initSdk());
```

It returns a SDK instance that allows you to interact with the Safe Multisig application.

### Register events

Once you get the SDK instance, you will be able to subscribe to events from the Safe Multisig.

The SDK instance exposes a method called `addListener` that receives an object with known keys, over these keys you will be able to subscribe to different events.

The first event that you should subscribe to is `onSafeInfo`; It will provide you first level information like the safeAddress, network, etc.

```js
const [safeInfo, setSafeInfo] = useState();  // Hook for SafeInfo to be stored

useEffect(() => {
  appsSdk.addListeners({
    onSafeInfo: setSafeInfo,
  });

  return () => appsSdk.removeListeners();
}, [appsSdk]);
```

### Sending TXs

Sending a TX through the Safe Multisig is as simple as invoking `sendTransaction` method with an array of TXs.

```js
// Create a web3 instance
const web3: any = new Web3('https://rinkeby.infura.io/v3/token');
const contract = new web3.eth.Contract(abi, contractAddress);

// Set Txs array
txs = [
  {
    to: someAddress,
    value: 0,
    data: contract.methods.someMethod().encodeABI(),
  },
  {
    to: someAddress2,
    value: 0,
    data: contract.methods.someOtherMethod().encodeABI(),
  },
];

// Send to Safe-multisig
appsSdk.sendTransactions(txs);
```

## Testing in the Safe Multisig application

Once your app is ready you need to deploy it on the internet. It is mandatory that your app exposes a `manifest.json` file in the root dir with this structure:

```json
{
  "name": "YourAppName",
  "description": "A description of what your app do",
  "iconPath": "myAppIcon.svg"
}
```

> Note: iconPath it's the public relative path where the Safe Multisig will try to load your app icon. For this example, it should be https://yourAppUrl/myAppIcon.svg.

Remember to also enable **Cross Site Requests** for the site. For example if using Netlify add a file `_headers` with the following content:
```
/*
Access-Control-Allow-Origin: *
```

When your app is live, you can import it to the Safe Multisig application. To do so, you should select the "Apps" tab:

![alt text][safeappstab]

[safeappstab]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/safe-tab-apps.png 'Safe Multisig: Apps tab'

Use the `Manage Apps` button and add your app using a link:

![alt text][safeaddapp]

[safeaddapp]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/third-pary-app-modal.png 'Safe Multisig: Add Safe App'

## Examples of applications built with this SDK
- https://github.com/rmeissner/sapp-tx-builder
- https://github.com/gnosis/safe-react-apps
- https://github.com/Uxio0/safe-react-collectibles

## License

This library is released under MIT.

## Contributors

- Nicolás Domínguez ([nicosampler](https://github.com/nicosampler))
- Richard Meissner ([rmeissner](https://github.com/rmeissner))
