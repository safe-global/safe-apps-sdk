import React from 'react';
import styled from 'styled-components';
import { Button, Text } from 'evergreen-ui';
import SdkInstance from '@safe-global/safe-apps-sdk';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type OwnProps = {
  sdk: SdkInstance;
};

const GetPermissions = ({ sdk }: OwnProps): React.ReactElement => {
  const handleClick = async () => {
    const response = await sdk.wallet.getPermissions();

    console.log({ response });
  };

  return (
    <Container>
      <Text>wallet_getPermissions()</Text>
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

export default GetPermissions;
