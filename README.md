# Safe Apps SDK

[![Logo](https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/logo.png)](https://gnosis.pm/)

[![Build Status](https://travis-ci.org/gnosis/safe-apps-sdk.svg?branch=master)](https://travis-ci.org/gnosis/pm-contracts)

Software development kit to integrate third-party applications (Safe Apps) with Safe Multisig (https://gnosis-safe.io/app/).

## Install

### Install the package with yarn or npm:

```bash
yarn add @gnosis.pm/safe-apps-sdk

npm install @gnosis.pm/safe-apps-sdk
```

## Build

```bash
yarn install
yarn build

npm install
npm build
```

## Documentation

Apps built with this Sdk are meant to be run in an iframe inside the Safe Web UI.
This library exposes a single method called `initSdk` that receives a single optional parameter, an array of regular expressions. By default it's configured to accept messages from this URLs:

- mainnet: https://gnosis-safe.io,
- mainnet-staging: https://safe-team.staging.gnosisdev.com,
- rinkeby: https://rinkeby.gnosis-safe.io,
- rinkeby-staging: https://safe-team-rinkeby.staging.gnosisdev.com,
- rinkeby-dev: https://safe-team.dev.gnosisdev.com
- localhost (for the desktop app)

By passing the argument to `initSdk` you can add more URLs to the list. It's useful when you are running your own instance of Safe Multisig.

```js
import initSdk from '@gnosis.pm/safe-apps-sdk';

const appsSdk = initSdk();
```

It returns a SDK instance that allows you to interact with the Safe Multisig application.

### Subscribing to events

Once you get the SDK instance, you will be able to subscribe to events from the Safe Multisig.

The SDK instance exposes a method called `addListeners` that receives an object with known keys, over these keys you will be able to subscribe to different events.

- `onSafeInfo`: It will provide you first level information like the safeAddress, network, etc.
- `onTransactionConfirmation`: Fired when the user confirms the transaction inside his wallet. The response will include the `requestId` and `safeTxHash` of the transaction.
- `onTransactionRejection`: Fired when the user rejects the transaction inside his wallet. The response will include the `requestId`.

```js
import { SafeInfo } from '@gnosis.pm/safe-apps-sdk';

const onSafeInfo = (safeInfo: SafeInfo): void => {
  console.log(safeInfo);
};

const onTransactionConfirmation = ({ requestId, safeTxHash }) => {
  console.log(requestId, safeTxHash);
};

const onTransactionRejection = ({ requestId }) => {
  console.log(requestId);
};

appsSdk.addListeners({
  onSafeInfo,
  onTransactionConfirmation,
  onTransactionRejection,
});
```

You can remove listeners by calling `appsSdk.removeListeners()`.

### Sending TXs

Sending a TX through the Safe Multisig is as simple as invoking `sendTransaction` method with an array of TXs.

```js
// Create a web3 instance
const web3 = new Web3('https://rinkeby.infura.io/v3/token');
const contract = new web3.eth.Contract(abi, contractAddress);

const txs = [
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
const message = appsSdk.sendTransactions(txs);
console.log(message.requestId);
```

`sendTransactions` returns a message containing the requestId. You can use it to map transaction calls with `onTransactionConfirmation` events.

> Note: `value` accepts a number or a string as a decimal or hex number.

### Retrieving transaction's status

Once you received safe transaction hash from `onTransactionConfirmation` event listener, you might want to get the status of the transaction (was it executed? how many confirmations does it have?):

```js
const tx = sdk.txs.getBySafeTxHash(safeTxHash);
```

It will return the following structure https://github.com/gnosis/safe-apps-sdk/blob/development/src/types.ts#L157 or throw an error if the backend hasn't synced the transaction yet

## Testing in the Safe Multisig application

### Manifest

It is mandatory that your app exposes a `manifest.json` file in the root dir with this structure:

```json
{
  "name": "YourAppName",
  "description": "A description of what your app do",
  "iconPath": "myAppIcon.svg",
  "providedBy": { "name": "YourCompanyName", "url": "https://yourcompanyname.io" }
}
```

> Note: iconPath it's the public relative path where the Safe Multisig will try to load your app icon. For this example, it should be https://yourAppUrl/myAppIcon.svg.

### CORS

As the Safe app is included into the Safe Multisig application via an iframe it is required to enable **Cross Site Requests** by setting the **CORS** headers when serving the Safe app.

The required headers are:

```
"Access-Control-Allow-Origin": "\*",
"Access-Control-Allow-Methods": "GET",
"Access-Control-Allow-Headers": "X-Requested-With, content-type, Authorization"
```

### React development

It is possible to use the local React development server. For this you need to set the **CORS** headers and make sure to use the same protocol (http or https) as the Safe Multisig interface.

#### CORS

For this we recommend to use [react-app-rewired](https://www.npmjs.com/package/react-app-rewired). To enable the library update the `scripts` section in the `package.json`:

```json
"scripts": {
  "start": "react-app-rewired start",
  "build": "react-app-rewired build",
  "test": "react-app-rewired test"
},
```

Additionally you need to create the `config-overrides.js` file in the root of the project to confirgure the **CORS** headers. The content of the file should be:

```js
/* config-overrides.js */

module.exports = {
  // The function to use to create a webpack dev server configuration when running the development
  // server with 'npm run start' or 'yarn start'.
  // Example: set the dev server to use a specific certificate in https.
  devServer: function (configFunction) {
    // Return the replacement function for create-react-app to use to generate the Webpack
    // Development Server config. "configFunction" is the function that would normally have
    // been used to generate the Webpack Development server config - you can use it to create
    // a starting configuration to then modify instead of having to create a config from scratch.
    return function (proxy, allowedHost) {
      // Create the default config by calling configFunction with the proxy/allowedHost parameters
      const config = configFunction(proxy, allowedHost);

      config.headers = {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'GET',
        'Access-Control-Allow-Headers': 'X-Requested-With, content-type, Authorization',
      };

      // Return your customised Webpack Development Server config.
      return config;
    };
  },
};
```

#### SSL

To enable SSL with `react-scripts` it is necessary to set the `HTTPS` environment variable to `true`. This can be done in the `package.json` file by adjusting the `scripts` section to:

```json

"scripts": {
  "start": "HTTPS=true react-app-rewired start",
},
```

As in most cases the SSL certificate provided by `react-scripts` is not valid it is required to mark it as trusted in your browser. For this open the Safe App in a separate tab (not in the Safe Multisig interface) and accept the certificate/ ignore the warning.

### Loading the Safe App

When your app is live, you can import it to the Safe Multisig application. To do so, you should select the "Apps" tab:

![alt text][safeappstab]

[safeappstab]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/safe-tab-apps.png 'Safe Multisig: Apps tab'

Use the `Manage Apps` button and add your app using a link:

![alt text][safeaddapp]

[safeaddapp]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/third-pary-app-modal.png 'Safe Multisig: Add Safe App'

## Deploy to IPFS

This requires that you have `ipfs` installed ([Instructions](https://gist.github.com/MiguelBel/b3b5f711aa8d9362afa5f16e4e972461))

```bash
yarn build
ipfs add -r build
```

## Examples of applications built with this SDK

- https://github.com/gnosis/safe-react-apps
- https://github.com/Uxio0/safe-react-collectibles
- https://docs.gnosis.io/safe/docs/sdks_safe_apps/#existing-safe-apps

## License

This library is released under MIT.

## Contributors

- Nicolás Domínguez ([nicosampler](https://github.com/nicosampler))
- Richard Meissner ([rmeissner](https://github.com/rmeissner))
