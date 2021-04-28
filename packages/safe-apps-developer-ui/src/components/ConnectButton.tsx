import React from 'react';
import styled from 'styled-components';
import Button from '@material-ui/core/Button';

import { useProviderStore } from 'src/stores/provider';

const SButton = styled(Button)`
  min-width: 140px;
`;

const ConnectButton = ({ className }: { className?: string }): React.ReactElement => {
  const [disabled, setDisabled] = React.useState(false);
  const connectProvider = useProviderStore((state) => state.connectProvider);

  const handleProviderConnect = React.useCallback(async () => {
    setDisabled(true);

    try {
      await connectProvider();
    } catch (err) {
      console.error(err);
    } finally {
      setDisabled(false);
    }
  }, [connectProvider]);

  return (
    <SButton
      color="primary"
      type="button"
      onClick={handleProviderConnect}
      variant="contained"
      disabled={disabled}
      className={className}
    >
      Connect
    </SButton>
  );
};

export { ConnectButton };
