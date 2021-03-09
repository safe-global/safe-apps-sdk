import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import { NetworkLabel } from '../NetworkLabel';
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
  userAddress?: string;
}

const ProviderInfo = ({ connected, userAddress }: ProviderInfoProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      {!connected && <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={14} mode="warning" />}
      <Grid className={classes.account}>
        <Typography>{userAddress}</Typography>
        <div className={classes.providerContainer}>
          {connected ? <Typography>{userAddress}</Typography> : <Typography>Connection Error</Typography>}
        </div>
      </Grid>
      <Grid className={classes.networkLabel}>
        <NetworkLabel />
      </Grid>
    </>
  );
};

export default ProviderInfo;
