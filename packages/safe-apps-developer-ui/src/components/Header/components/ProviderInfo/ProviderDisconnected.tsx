import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

import { sm } from 'src/styles/variables';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
  network: {
    // fontFamily: 'Averta, sans-serif',
    fontWeight: 800,
  },
  account: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'center',
    paddingRight: sm,
  },
  connect: {
    letterSpacing: '-0.5px',
    whiteSpace: 'nowrap',
  },
});

const ProviderDisconnected = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={17} mode="error" />
      <Grid className={classes.account} xs={12}>
        <Typography className={classes.network} variant="body2">
          Not Connected
        </Typography>
        <Typography className={classes.connect} variant="body2">
          Connect Wallet
        </Typography>
      </Grid>
    </>
  );
};

export default ProviderDisconnected;
