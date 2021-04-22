import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';

import { ConnectButton } from 'src/components/ConnectButton';
import { md } from 'src/styles/variables';
import { KeyRing } from 'src/components/Header/components/KeyRing';

const useStyles = makeStyles({
  headingContainer: {
    padding: `${md} 12px`,
  },
  logo: {
    justifyContent: 'center',
  },
  text: {
    letterSpacing: '-0.6px',
    flexGrow: 1,
    textAlign: 'center',
  },
  connect: {
    padding: `${md} 0`,
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
      <div className={classes.headingContainer}>
        <Typography className={classes.text} variant="h6">
          Connect a Wallet
        </Typography>
      </div>
      <div className={classes.logo}>
        <KeyRing center circleSize={75} dotRight={25} dotSize={25} dotTop={50} keySize={32} mode="error" />
      </div>
      <div className={classes.connect}>
        <ConnectButton />
      </div>
    </>
  );
};

export default ConnectDetails;
