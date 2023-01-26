import React, { useEffect } from 'react';
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

const RequestAddressBook = ({ sdk }: OwnProps): React.ReactElement => {
  useEffect(() => {
    window.addEventListener('message', console.log);

    return () => {
      window.removeEventListener('message', console.log);
    };
  }, []);

  const handleClick = async () => {
    try {
      const response = await sdk.safe.requestAddressBook();

      console.log(response);
    } catch (e) {
      console.error(e);
    }
  };

  const handlePostMessage = () => {
    window.parent.postMessage(
      {
        env: { sdkVersion: '7.4.1' },
        id: '5b63a0e43b',
        method: 'requestAddressBook',
        params: undefined,
      },
      '*'
    );
  };

  return (
    <Container>
      <Text>requestAddressBook()</Text>
      <Button
        appearance="primary"
        onClick={handleClick}
        maxWidth={140}
        justifyContent="center"
        marginTop={8}
      >
        Request
      </Button>
      <Button
        appearance="primary"
        onClick={handlePostMessage}
        maxWidth={140}
        justifyContent="center"
        marginTop={8}
      >
        Regular postMessage
      </Button>
    </Container>
  );
};

export default RequestAddressBook;
