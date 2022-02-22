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

Is you use a server side rendering solution as NextJs you might encounter some problems using the library and receive an error message like this:

`self is not defined`

The issue occurs because the library requires Web APIs to work, which are not available when Next.js pre-renders the page on the server-side. To fix it you can dynamically import a component so it only gets loaded on the client-side.

```
const SafeInfoWeb3Modal = () => {
  const [provider, setProvider] = useState(null);

  useEffect(() => {
    (async () => {
      const modal = new SafeAppWeb3Modal();
      const provider = await modal.requestProvider();
      setProvider(provider);
    })();
  }, []);

  if (!provider) {
    return null;
  }

  return <p>Safe Address: {provider.safe.safeAddress}</p>;
};
```

And then, in your page:

```
const SafeInfoWeb3Modal = dynamic(
  () => import('../components/SafeInfoWeb3Modal'),
  {
    ssr: false,
  }
);
```
