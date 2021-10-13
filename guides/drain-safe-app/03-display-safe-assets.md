# Display a list of Safe's assets

Let's add a table that displays Safe's owned assets to the app. You need the following pieces:

1. A function that fetches the assets
2. Table component
3. Add the table component to the app

Create a file `src/hooks/useSafeBalances.ts` with the following content:

```ts
import SafeAppsSDK, { TokenBalance } from '@gnosis.pm/safe-apps-sdk';
import { useState, useEffect } from 'react';

function useSafeBalances(sdk: SafeAppsSDK): [TokenBalance[], boolean] {
  const [assets, setAssets] = useState<TokenBalance[]>([]);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    async function loadBalances() {
      const balances = await sdk.safe.experimental_getBalances();

      setAssets(balances.items);
      setLoaded(true);
    }

    loadBalances();
  }, [sdk]);

  return [assets, loaded];
}

export { useSafeBalances };
```

You should import this hook into `src/App.tsx` and use it to get the list of assets owned by the Safe. Then, remove the documentation link, `submitTx` function and comment out the button that used the submit function and add the hook:

```ts
import React from 'react';
import styled from 'styled-components';
import { Title } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';
import { useSafeBalances } from './hooks/useSafeBalances';

const Container = styled.div`
  padding: 1rem;
  width: 100%;
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();
  const [balances] = useSafeBalances(sdk);

  console.log({ balances });

  return (
    <Container>
      <Title size="md">Safe: {safe.safeAddress}</Title>

      {/* <Button size="lg" color="primary">
        Send the assets
      </Button> */}
    </Container>
  );
};

export default SafeApp;
```

Now, if you load the app inside the Safe, you should see Safe's assets list in the console
