# Safe Apps Web3-react connector

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
