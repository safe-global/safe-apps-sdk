import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';
import { EthHashInfo, Text } from '@gnosis.pm/safe-react-components';

import NetworkLabel from '../NetworkLabel';
import WalletIcon from '../WalletIcon';
import { connected as connectedBg, screenSm, sm } from 'src/styles/variables';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
  network: {
    fontFamily: 'Averta, sans-serif',
  },
  networkLabel: {
    '& div': {
      paddingRight: sm,
      paddingLeft: sm,
    },
  },
  identicon: {
    display: 'none',
    [`@media (min-width: ${screenSm}px)`]: {
      display: 'block',
    },
  },
  dot: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    color: connectedBg,
    display: 'none',
    height: '15px',
    position: 'relative',
    right: '10px',
    top: '12px',
    width: '15px',
    [`@media (min-width: ${screenSm}px)`]: {
      display: 'block',
    },
  },
  providerContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    width: '100px',
  },
  account: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'left',
    paddingRight: sm,
  },
  address: {
    marginLeft: '5px',
    letterSpacing: '-0.5px',
  },
});

interface ProviderInfoProps {
  connected: boolean;
  provider: string;
  // TODO: [xDai] Review. This may cause some issues with EthHashInfo.
  userAddress: string;
}

const ProviderInfo = ({ connected, provider, userAddress }: ProviderInfoProps): React.ReactElement => {
  const classes = useStyles();
  const addressColor = connected ? 'text' : 'warning';
  return (
    <>
      {!connected && <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={14} mode="warning" />}
      <WalletIcon providerName={provider.toUpperCase()} />
      <Grid className={classes.account}>
        <Typography className={classes.network}>{provider}</Typography>
        <div className={classes.providerContainer}>
          {connected ? (
            <EthHashInfo
              hash={userAddress}
              shortenHash={4}
              showIdenticon
              identiconSize="xs"
              textColor={addressColor}
              textSize="sm"
            />
          ) : (
            <Text size="md" color={addressColor}>
              Connection Error
            </Text>
          )}
        </div>
      </Grid>
      <Grid className={classes.networkLabel}>
        <NetworkLabel />
      </Grid>
    </>
  );
};

export default ProviderInfo;
