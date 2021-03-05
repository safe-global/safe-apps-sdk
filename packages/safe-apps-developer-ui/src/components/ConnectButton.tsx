import React from 'react';
import styled from 'styled-components';

import Button from '@material-ui/core/Button';
import { connectToProvider } from '../api/provider';

const SButton = styled(Button)`
  min-width: 140px;
`;

const ConnectButton = (): React.ReactElement => (
  <SButton color="primary" type="button" onClick={connectToProvider} variant="contained">
    Connect
  </SButton>
);

export default ConnectButton;
