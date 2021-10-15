# Display a list of Safe's assets

Let's add a table that displays Safe's owned assets to the App. But first, you need the following pieces:

1. A function that fetches the assets
2. Table component
3. Add the table component to the App

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

      setAssets(balances.items.filter((item) => parseInt(item.fiatBalance) > 0));
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

If you load the App inside the Safe, you should see Safe's assets list in the console. Let's make a Table component that displays the assets.

`src/components/BalancesTable.tsx`:

```ts
import { Table } from '@gnosis.pm/safe-react-components';
import { TokenBalance, TokenInfo } from '@gnosis.pm/safe-apps-sdk';
import BigNumber from 'bignumber.js';

const ethToken: TokenInfo = {
  address: '0x0000000000000',
  tokenType: 'ETHER',
  logoUri: './eth.svg',
  symbol: 'ETH',
  name: 'Ether',
  decimals: 18,
};

const formatTokenValue = (value: number | string, decimals: number): string => {
  return new BigNumber(value).times(`1e-${decimals}`).toFixed();
};

const formatFiatValue = (value: string, currency: string): string => {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency }).format(parseFloat(value));
};

function Balances({ balances }: { balances: TokenBalance[] }): JSX.Element {
  return (
    <Table
      headers={[
        { id: 'col1', label: 'Asset' },
        { id: 'col2', label: 'Amount' },
        { id: 'col3', label: `Value, USD` },
      ]}
      rows={balances.map((item: TokenBalance, index: number) => {
        const token = item.tokenInfo.tokenType === 'ETHER' ? ethToken : item.tokenInfo;

        return {
          id: `row${index}`,
          cells: [
            {
              content: (
                <div style={{ display: 'flex', alignItems: 'center' }}>
                  <img src={token.logoUri || undefined} alt={`${token.symbol} Logo`} />
                  {token.name}
                </div>
              ),
            },

            { content: formatTokenValue(item.balance, token.decimals) },
            { content: formatFiatValue(item.fiatBalance, 'USD') },
          ],
        };
      })}
    />
  );
}

export default Balances;
```

We iterate over the array of balances and create corresponding DOM elements. We also introduced two functions:

- `formatTokenValue` - converts the token amount to a human-readable value with decimals
- `formatFiatValue` - converts the fiat value according to user's locale

Let's hook it into our `App.tsx`:

```tsx
<Container>
  <Title size="md">Safe: {safe.safeAddress}</Title>
  <BalancesTable balances={balances} />

  {/* <Button size="lg" color="primary">
        Send the assets
      </Button> */}
</Container>
```

Now you should be able to see the assets table when you load the App.
Congrats! You're halfway through - the only thing left is generating the transaction data for transfers, which we'll cover in the next section.
