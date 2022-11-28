import React, { useState } from 'react';
import styled from 'styled-components';
import { Button, TextInput, Text } from 'evergreen-ui';
import SdkInstance from '@gnosis.pm/safe-apps-sdk';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

type OwnProps = {
  sdk: SdkInstance;
};

const UseOffChainSignatures = ({ sdk }: OwnProps): React.ReactElement => {
  const [shouldUseOffChainSignatures, setShouldUseOffChainSignatures] = useState('');

  const handleClick = async () => {
    try {
      const response = await sdk.safe.useOffChainSignatures(shouldUseOffChainSignatures === 'true');

      console.log({ response });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Text>safe_useOffChainSignature(boolean)</Text>
      <TextInput
        value={shouldUseOffChainSignatures}
        onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
          setShouldUseOffChainSignatures(e.target.value);
        }}
        marginTop={4}
      />
      <Button appearance="primary" onClick={handleClick} maxWidth={140} justifyContent="center" marginTop={8}>
        Request
      </Button>
    </Container>
  );
};

export default UseOffChainSignatures;
