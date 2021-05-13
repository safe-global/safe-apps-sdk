import { makeStyles } from '@material-ui/core/styles';
import Dot from '@material-ui/icons/FiberManualRecord';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import clsx from 'clsx';

import { Identicon } from 'src/components/Identicon';
import { Spacer } from 'src/components/Layout/Spacer';
import { Hairline } from 'src/components/Layout/Hairline';
import { Img } from 'src/components/Layout/Img';
import { background, connected as connectedBg, lg, md, sm, warning, xs } from 'src/styles/variables';
import { upperFirst, textShortener } from 'src/utils/strings';

import { KeyRing } from 'src/components/Header/components/KeyRing';
import { CircleDot } from '../CircleDot';
import { createStyles } from '@material-ui/core';

import WalletIcon from '../../assets/wallet.svg';
import { getNetworkNameByChainId } from 'src/api/eth';

const styles = createStyles({
  container: {
    padding: `${md} 12px`,
  },
  identicon: {
    margin: `${md} 0`,
  },
  user: {
    borderRadius: '3px',
    backgroundColor: background,
    margin: '0 auto',
    padding: '9px',
    lineHeight: 1,
  },
  details: {
    padding: `0 ${md}`,
    height: '20px',
    alignItems: 'center',
  },
  address: {
    flexGGrid: 1,
    textAlign: 'center',
    letterSpacing: '-0.5px',
    marginRight: sm,
  },
  labels: {
    fontSize: '12px',
    letterSpacing: '0.5px',
  },
  open: {
    paddingLeft: sm,
    width: 'auto',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  disconnect: {
    padding: `${md} ${lg}`,
    '& button': {
      background: '#f02525',
    },
  },
  disconnectText: {
    letterSpacing: '1px',
  },
  logo: {
    margin: `0px ${xs}`,
  },
  dot: {
    marginRight: xs,
    height: '15px',
    width: '15px',
  },
  warning: {
    color: warning,
  },
  connected: {
    color: connectedBg,
  },
});

type Props = {
  connected: boolean;
  chainId: number;
  onDisconnect: () => void;
  openDashboard?: () => void | null;
  providerName?: string;
  userAddress: string;
};

const useStyles = makeStyles(styles);

export const UserDetails = ({
  connected,
  chainId,
  onDisconnect,
  providerName = 'UNKNOWN',
  userAddress,
}: Props): React.ReactElement => {
  const status = connected ? 'Connected' : 'Connection error';
  // const color = connected ? 'primary' : 'warning';

  const classes = useStyles();

  return (
    <>
      <Grid container justify="center" alignItems="center" direction="column" className={classes.container}>
        {connected ? (
          <Identicon className={classes.identicon} address={userAddress || 'random'} />
        ) : (
          <KeyRing circleSize={75} dotRight={25} dotSize={25} dotTop={50} hideDot keySize={30} mode="warning" />
        )}
        <div className={classes.user}>{userAddress ? textShortener(userAddress, 6, 4) : 'Address not available'}</div>
      </Grid>
      <Hairline margin="xs" />
      <Grid container className={classes.details}>
        <Typography className={classes.labels}>Status</Typography>
        <Spacer />
        <Dot className={clsx(classes.dot, connected ? classes.connected : classes.warning)} />
        <Typography className={classes.labels}>{status}</Typography>
      </Grid>
      <Hairline margin="xs" />
      <Grid container className={classes.details}>
        <Typography className={classes.labels}>Wallet</Typography>
        <Spacer />
        <Img alt="Wallet icon" className={classes.logo} height={14} src={WalletIcon} />
        <Typography className={classes.labels}>{upperFirst(providerName)}</Typography>
      </Grid>
      <Hairline margin="xs" />
      <Grid container className={classes.details}>
        <Typography className={classes.labels}>Network</Typography>
        <Spacer />
        <CircleDot className={classes.logo} />
        <Typography className={classes.labels}>{upperFirst(getNetworkNameByChainId(chainId))}</Typography>
      </Grid>
      <Hairline margin="xs" />
      <Grid container className={classes.disconnect}>
        <Button color="primary" fullWidth onClick={onDisconnect} variant="contained" data-testid="disconnect-btn">
          <Typography className={classes.disconnectText}>Disconnect</Typography>
        </Button>
      </Grid>
    </>
  );
};
