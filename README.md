# Safe Apps SDK


[![Build Status](https://travis-ci.org/gnosis/safe-apps-sdk.svg?branch=master)](https://travis-ci.org/gnosis/pm-contracts)

Software development kit to integrate third-party appas (Safe Apps) with Safe Multisig (https://gnosis-safe.io/app/).

## Install

### Install requirements with yarn:

```bash
yarn add @gnosis.pm/safe-app-sdk
```

## Build

```bash
yarn install
yarn build
```

## Documentation

This library exposes a single method called initSdk that receives a single parameter, the Gnosis Safe Multisig app URL. 

* rinkeby: https://rinkeby.gnosis-safe.io/
* mainnet: https://gnosis-safe.io/

```js
const [appsSdk] = useState(initSdk('https://rinkeby.gnosis-safe.io/'));
```
It returns a SDK instance that allows you to interact with the Safe Multisig application.

### Register events

Once you get the SDK instance, you will be able to subscribe to events from the Safe Multisig.

The SDK instance exposes a method called `addListener` that receives an object with known keys, over these keys you will be able to subscribe to different events.

The first event that you should subscribe to is `onSafeInfo`; It will provide you first level information like the safeAddress, network, etc.

```js
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


When your app is live, you can import it to the Safe Multisig application. To do so, you should select the "Apps" tab:

![alt text][safeAppsTab]

[safeAppsTab]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/safe-tab-apps.png "Safe Multisig: Apps tab"

And use the `Manage Apps` button and add add your app using a link:
 
![alt text][safeAddApp]

[safeAddApp]: https://raw.githubusercontent.com/gnosis/safe-apps-sdk/master/assets/third-pary-app-modal.png "Safe Multisig: Add Safe App"


## License

This library is released under MIT.

## Contributors

- Nicolás Domínguez ([nicosampler](https://github.com/nicosampler))
- Richard Meissner ([rmeissner](https://github.com/rmeissner))
