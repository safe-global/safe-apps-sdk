import React from 'react';

import { Button } from '@gnosis.pm/safe-react-components';
import { connectToProvider } from '../api/provider';

const ConnectButton = (): React.ReactElement => (
  <Button color="primary" type="button" size="lg" onClick={connectToProvider} variant="contained">
    Connect
  </Button>
);

export default ConnectButton;
