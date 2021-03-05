import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { NetworkLabel } from '../NetworkLabel';
import { WalletIcon } from '../WalletIcon';
import { connected as connectedBg, screenSm, sm } from 'src/styles/variables';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
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
  userAddress?: string;
}

const ProviderInfo = ({ connected, provider }: ProviderInfoProps): React.ReactElement => {
  const classes = useStyles();
  // const addressColor = connected ? 'text' : 'warning';
  return (
    <>
      {!connected && <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={14} mode="warning" />}
      <WalletIcon providerName={provider.toUpperCase()} />
      <Grid className={classes.account}>
        <Typography>{provider}</Typography>
        <div className={classes.providerContainer}>
          {connected ? (
            // <EthHashInfo
            //   hash={userAddress}
            //   shortenHash={4}
            //   showIdenticon
            //   identiconSize="xs"
            //   textColor={addressColor}
            //   textSize="sm"
            // />
            'connected'
          ) : (
            <Typography>Connection Error</Typography>
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
