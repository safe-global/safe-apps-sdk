# Safe Apps Web3-react connector

[![npm](https://img.shields.io/npm/v/@gnosis.pm/safe-apps-web3-react)](https://www.npmjs.com/package/@gnosis.pm/safe-apps-web3-react)

A connector to be used with web3-react package

## Installation

```bash
yarn add @gnosis.pm/safe-apps-web3-react

npm install @gnosis.pm/safe-apps-web3-react
```

## Usage

```js
import { SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';
```

The connector follows web3-react's connectors API convention. Visit web3-react [repo](https://github.com/NoahZinsmeister/web3-react) for more details

### Helper hook

You can use our helper hook to automatically connect to a safe, it will automatically connect to the Safe if it detects that it's loaded in Safe App context:

```js
import { useSafeAppConnection, SafeAppConnector } from '@gnosis.pm/safe-apps-web3-react';

const safeMultisigConnector = new SafeAppConnector();

const App = () => {
  const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector);

  React.useEffect(() => {
    if (triedToConnectToSafe) {
      // fallback to other providers
    }
  }, [triedToConnectToSafe]);
};
```

## More scenarios

For the SDK overview documentation, please refer to the [safe-apps-sdk](https://github.com/gnosis/safe-apps-sdk/) documentation

## Know issues

### NextJs

Is you use a server side rendering solution as NextJs you might encounter some problems using the library and receive an error message like this:

`self is not defined`

The issue occurs because the library requires Web APIs to work, which are not available when Next.js pre-renders the page on the server-side. To fix it you can dynamically import a component so it only gets loaded on the client-side.

```
const SafeInfo = (props) => {
  const [safeInfo, setSafeInfo] = React.useState(null);
  const triedToConnectToSafe = useSafeAppConnection(safeMultisigConnector);

  React.useEffect(() => {
    if (triedToConnectToSafe) {
      safeMultisigConnector.getSafeInfo().then((safeInfo) => {
        setSafeInfo(safeInfo);
      });
    }
  }, [triedToConnectToSafe]);

  if (!safeInfo) {
    return null;
  }

  return (
      <p> Safe address: {safeInfo.safeAddress}</p>
  );
};
```

And then, in your page:

```
const SafeInfo = dynamic(() => import('../components/SafeInfo'), {
  ssr: false,
});
```
