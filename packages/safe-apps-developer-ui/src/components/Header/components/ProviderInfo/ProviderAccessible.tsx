import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { Identicon } from 'src/components/Identicon';
import { textShortener } from 'src/utils/strings';
import { connected as connectedBg, screenSm } from 'src/styles/variables';
import { NetworkLabel } from '../NetworkLabel';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
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
  address: {
    marginLeft: '5px',
    letterSpacing: '-0.5px',
  },
  icon: {
    marginRight: '8px',
  },
});

interface ProviderInfoProps {
  connected: boolean;
  userAddress?: string;
  chainId: number;
}

const ProviderInfo = ({ connected, userAddress, chainId }: ProviderInfoProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      {!connected && <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={14} mode="warning" />}
      <Grid container alignItems="center">
        <Identicon className={classes.icon} size={35} address={userAddress || ''} />
        {connected ? (
          <Typography variant="body2">{textShortener(userAddress || '', 6, 4)}</Typography>
        ) : (
          <Typography variant="body2">Connection Error</Typography>
        )}
      </Grid>
      <NetworkLabel chainId={chainId} />
    </>
  );
};

export default ProviderInfo;
