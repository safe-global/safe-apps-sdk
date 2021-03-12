import React from 'react';
import styled from 'styled-components';
import { Web3Provider } from '@ethersproject/providers';
import Button from '@material-ui/core/Button';

import { connectToProvider } from '../api/provider';
import { useProviderStore } from 'src/stores/provider';

const SButton = styled(Button)`
  min-width: 140px;
`;

const ConnectButton = ({ className }: { className?: string }): React.ReactElement => {
  const [disabled, setDisabled] = React.useState(false);
  const fetchAndSetProvider = useProviderStore((state) => state.fetchAndSetProvider);

  const handleClick = async () => {
    setDisabled(true);

    try {
      const connection = await connectToProvider();
      const provider = new Web3Provider(connection);
      fetchAndSetProvider(provider);
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  };

  return (
    <SButton
      color="primary"
      type="button"
      onClick={handleClick}
      variant="contained"
      disabled={disabled}
      className={className}
    >
      Connect
    </SButton>
  );
};

export { ConnectButton };
