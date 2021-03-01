import React from 'react';

import Button from '@gnosis.pm/safe-react-components';
import { connectToProvider } from '../api/provider';

const ConnectButton = (): React.ReactElement => (
  <Button color="primary" minWidth={140} onClick={connectToProvider} variant="contained">
    Connect
  </Button>
);

export default ConnectButton;
