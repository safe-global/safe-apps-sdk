import React, { useCallback } from 'react';
import styled from 'styled-components';
import { Button, Title } from '@gnosis.pm/safe-react-components';
import { useSafeAppsSDK } from '@gnosis.pm/safe-apps-react-sdk';

const Container = styled.div`
  padding: 1rem;
`;

const SafeApp = (): React.ReactElement => {
  const { sdk, safe } = useSafeAppsSDK();

  const submitTx = useCallback(async () => {
    try {
      const { safeTxHash } = await sdk.txs.send({
        txs: [
          {
            to: safe.safeAddress,
            value: '0',
            data: '0x',
          },
        ],
      });
      console.log({ safeTxHash });
      const safeTx = await sdk.txs.getBySafeTxHash(safeTxHash);
      console.log({ safeTx });
    } catch (e) {
      console.error(e);
    }
  }, [safe, sdk]);

  return (
    <Container>
      <Title size="md">Safe: {safe.safeAddress}</Title>

      <Button size="lg" color="primary" onClick={submitTx}>
        Click to send a test transaction
      </Button>
    </Container>
  );
};

export default SafeApp;
