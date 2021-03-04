import { makeStyles } from '@material-ui/core/styles';
import { Grid, Typography } from '@material-ui/core';

import ConnectButton from 'src/components/ConnectButton';

import { lg, md } from 'src/styles/variables';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
  container: {
    padding: `${md} 12px`,
  },
  logo: {
    justifyContent: 'center',
  },
  text: {
    letterSpacing: '-0.6px',
    flexGrow: 1,
    textAlign: 'center',
    fontSize: '0.85rem',
  },
  connect: {
    padding: `${md} ${lg}`,
    textAlign: 'center',
  },
  connectText: {
    letterSpacing: '1px',
  },
  img: {
    margin: '0px 2px',
  },
});

const ConnectDetails = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <>
      <div className={classes.container}>
        <Grid xs={12}>
          <Typography className={classes.text} variant="body2">
            Connect a Wallet
          </Typography>
        </Grid>
      </div>
      <Grid className={classes.logo}>
        <KeyRing center circleSize={75} dotRight={25} dotSize={25} dotTop={50} keySize={32} mode="error" />
      </Grid>
      <div className={classes.connect}>
        <ConnectButton />
      </div>
    </>
  );
};

export default ConnectDetails;
