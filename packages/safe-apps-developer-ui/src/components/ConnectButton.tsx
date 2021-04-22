import React from 'react';
import styled from 'styled-components';
import { Web3Provider } from '@ethersproject/providers';

import Button from '@material-ui/core/Button';
import { connectToProvider } from '../api/provider';
import { useProviderStore } from 'src/stores/provider';

const SButton = styled(Button)`
  min-width: 140px;
`;

const ConnectButton = (): React.ReactElement => {
  const fetchAndSetProvider = useProviderStore((state) => state.fetchAndSetProvider);

  const handleClick = async () => {
    const connection = await connectToProvider();
    const provider = new Web3Provider(connection);

    fetchAndSetProvider(provider);
  };

  return (
    <SButton color="primary" type="button" onClick={handleClick} variant="contained">
      Connect
    </SButton>
  );
};

export default ConnectButton;
