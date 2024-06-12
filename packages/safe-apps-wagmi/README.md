# Safe Apps wagmi connector

A connector for the wagmi library. The source code is available in the `wagmi/references` [repo](https://github.com/wagmi-dev/references)

## Installation

```bash
yarn add wagmi

npm i wagmi
```

## Integration steps

1. Import `SafeConnector` and include it in the wagmi client configuration options

```js
import { SafeConnector } from 'wagmi/connectors/safe';

const chains = [];

const config = createConfig({
  connectors: [
    new SafeConnector({
      chains,
      options: {
        allowedDomains: [/^app\.safe\.global$/],
        debug: false,
      },
    }),
  ],
});
```

⚠️ Make sure to omit the `autoConnect` property or set it to false. Wagmi library automatically connects to the last used provider, but instead we want to automatically connect to the Safe if the app is loaded in the Safe Context. Autoconnect logic may be implemented via a separate hook.

2. Create an autoconnect hook

Safe Apps are loaded inside an iframe in the Safe Wallet application and it is expected that the app automatically connects to the Safe wallet.

```ts
import { useConnect } from 'wagmi';
import { useEffect } from 'react';

const AUTOCONNECTED_CONNECTOR_IDS = ['safe'];

function useAutoConnect() {
  const { connect, connectors } = useConnect();

  useEffect(() => {
    AUTOCONNECTED_CONNECTOR_IDS.forEach((connector) => {
      const connectorInstance = connectors.find((c) => c.id === connector && c.ready);

      if (connectorInstance) {
        connect({ connector: connectorInstance });
      }
    });
  }, [connect, connectors]);
}

export { useAutoConnect };
```

This hook attempts to connect to the Safe wallet automatically on the app load. The hook can be extended with other connectors that use a similar iframe approach (e.g., Ledger Live). It can also be extended with fallback logic such as the last used wallet if the connection to the Safe doesn't succeed.

## Example

An example application can be found [here](/examples/wagmi)

## More scenarios

For the SDK overview documentation, please refer to the [safe-apps-sdk](https://github.com/safe-global/safe-apps-sdk/) documentation
