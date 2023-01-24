import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextInput, Text } from 'evergreen-ui';
import SdkInstance from '@safe-global/safe-apps-sdk';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type OwnProps = {
  sdk: SdkInstance;
};

const RequestPermissions = ({ sdk }: OwnProps): React.ReactElement => {
  const [permissions, setPermissions] = useState('');

  const handleClick = async () => {
    try {
      const response = await sdk.wallet.requestPermissions(
        permissions.split(',').map((p) => ({
          [p]: {},
        }))
      );

      console.log({ response });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Text>wallet_requestPermissions(permissions)</Text>
      <TextInput
        value={permissions}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setPermissions(e.target.value);
        }}
        marginTop={4}
      />
      <Button
        appearance="primary"
        onClick={handleClick}
        maxWidth={140}
        justifyContent="center"
        marginTop={8}
      >
        Request
      </Button>
    </Container>
  );
};

export default RequestPermissions;
