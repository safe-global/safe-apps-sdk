# Safe Apps Web3Modal

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-apps-web3modal)](https://www.npmjs.com/package/@gnosis.pm/safe-apps-web3modal)

This is a wrapper around [web3modal](https://github.com/Web3Modal/web3modal) that adds Safe Apps support.

If the app using the wrapper is run as a Safe App the `connect` method will automatically connect to the Safe App.

### How to use

- Install the package and its dependencies

```
npm i @gnosis.pm/safe-apps-web3modal @gnosis.pm/safe-apps-sdk web3modal

yarn add @gnosis.pm/safe-apps-web3modal @gnosis.pm/safe-apps-sdk web3modal
```

- Setup Safe App

  - See https://docs.gnosis-safe.io/build/sdks/safe-apps

- Use `SafeAppWeb3Modal`

```js
import { SafeAppWeb3Modal } from '@gnosis.pm/safe-apps-web3modal';
const modal = new SafeAppWeb3Modal(web3modalOptions);
```

- Connect to the Safe

```js
const provider = await modal.requestProvider();
```

This will connect to the Safe if it is available. Otherwise, it will fall back to web3modal's `connect` method and show a modal with available wallets.

- Check if loaded as a Safe app

```js
const loadedAsSafeApp = await modal.isSafeApp();
```

## Know issues

### NextJs

Is you use a server side rendering solution remember to instantiate the modal inside an useEffect to avoid NextJS to process this server side where the `window` object does not exist.

```
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const modal = new SafeAppWeb3Modal();
      const provider = await modal.requestProvider();
      setProvider(provider);
    })();
  }, []);
```
