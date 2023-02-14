import { useState } from 'react';
import styled from 'styled-components';
import SdkInstance from '@safe-global/safe-apps-sdk';
import { Button, RadioGroup, Text } from 'evergreen-ui';

const Container = styled.div`
  display: flex;
  flex-direction: column;
`;

const options = [
  { label: 'True', value: 'true' },
  { label: 'False', value: 'false' },
];

const SafeSettings = ({
  sdk,
  setOffChainSigning,
}: {
  sdk: SdkInstance;
  setOffChainSigning: (offChainEnabled: boolean) => void;
}) => {
  const [value, setValue] = useState<string>('true');

  const handleClick = async () => {
    const settings = value ? { offChainSigning: value === 'true' } : {};
    try {
      const response = await sdk.eth.setSafeSettings([settings]);
      setOffChainSigning(!!response?.offChainSigning);
      console.log({ response });
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <Container>
      <Text>safe_setSettings(SafeSettings)</Text>
      <RadioGroup
        label="offChainSigning"
        value={value}
        options={options}
        onChange={(event) => setValue(event.target.value)}
      />
      <Button appearance="primary" onClick={handleClick} maxWidth={140} justifyContent="center" marginTop={8}>
        Request
      </Button>
    </Container>
  );
};

export default SafeSettings;
