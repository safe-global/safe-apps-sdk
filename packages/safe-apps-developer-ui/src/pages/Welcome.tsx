import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles } from '@material-ui/core/styles';
import { lg, md } from 'src/styles/variables';

const useStyles = makeStyles({
  pageContainer: {
    padding: `0 ${md}`,
  },
  heading: {
    margin: `${lg} 0`,
  },
});

const WelcomePage = (): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid container className={classes.pageContainer}>
      <Grid item xs={5}>
        <Typography className={classes.heading} variant="h3">
          Welcome to Gnosis Safe Multisig Developer Interface.
        </Typography>
        <Typography variant="h5">
          Developer Interface is an interface without dependencies on Gnosis infrastructure, where you can deploy Safe
          Contracts on any network. Here is how to get started:
        </Typography>
      </Grid>
    </Grid>
  );
};

export { WelcomePage };
