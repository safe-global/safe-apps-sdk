import React from 'react';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';
import { lg, md } from 'src/styles/variables';
import { Card } from 'src/components/Card';
import { Dot } from 'src/components/Dot';
import { useProviderStore } from 'src/stores/provider';
import { useContractsStore } from 'src/stores/contracts';
import { ConnectButton } from 'src/components/ConnectButton';
import { deployFallbackHandler, deployProxyFactory, deployMasterCopy } from 'src/api/safeContracts';

const useStyles = makeStyles({
  pageContainer: {
    padding: `0 ${md}`,
  },
  heading: {
    margin: `${lg} 0`,
  },
  stepsContainer: {
    marginTop: md,
  },
  interfaceDescription: {
    fontWeight: 400,
  },
  stepCard: {
    height: 276,
    display: 'flex',
    flexDirection: 'column',
  },
  btn: {
    marginTop: 'auto',
  },
  dot: {
    marginRight: md,
    '& > h5': {
      color: '#fff',
      fontWeight: 400,
    },
  },
  cardTitle: {
    marginBottom: md,
  },
});

const WelcomePage = (): React.ReactElement => {
  const classes = useStyles();
  const providerLoaded = useProviderStore((state) => state.loaded);
  const networkId = useProviderStore((state) => state.networkId);
  const signer = useProviderStore((state) => state.signer);
  const saveContracts = useContractsStore((state) => state.saveContracts);

  const deployContracts = React.useCallback(async (): Promise<void> => {
    if (signer) {
      const [proxyFactory, fallbackHandler, masterCopy] = await Promise.all([
        deployProxyFactory(signer),
        deployFallbackHandler(signer),
        deployMasterCopy(signer),
      ]);

      console.info({ proxyFactory, fallbackHandler, masterCopy });
      saveContracts(networkId, {
        fallbackHandler: fallbackHandler.address,
        proxyFactory: proxyFactory.address,
        masterCopy: masterCopy.address,
      });
    }
  }, [networkId, saveContracts, signer]);

  return (
    <Grid container direction="column" className={classes.pageContainer}>
      <Grid item xs={5}>
        <Typography className={classes.heading} variant="h3">
          Welcome to Gnosis Safe Multisig Developer Interface.
        </Typography>
        <Typography className={classes.interfaceDescription} variant="h5" component="p">
          Developer Interface is an interface without dependencies on Gnosis infrastructure, where you can deploy Safe
          Contracts on any network. Here is how to get started:
        </Typography>
      </Grid>
      <Grid container spacing={3} className={classes.stepsContainer}>
        <Grid item xs={3} lg={2}>
          <Card className={classes.stepCard} disabled={providerLoaded}>
            <Grid container alignItems="center" className={classes.cardTitle}>
              <Dot className={classes.dot} color="primary">
                <Typography variant="h5">{providerLoaded ? '✔' : 1}</Typography>
              </Dot>
              <Typography variant="h5">Connect a wallet</Typography>
            </Grid>
            <Typography variant="body2">
              Gnosis Safe Multisig supports a wide range of wallets that you can choose to be one of the authentication
              factors.
            </Typography>
            <ConnectButton className={classes.btn} />
          </Card>
        </Grid>
        <Grid item xs={3} lg={2}>
          <Card className={classes.stepCard} disabled={!providerLoaded}>
            <Grid container alignItems="center" className={classes.cardTitle}>
              <Dot className={classes.dot} color="primary">
                <Typography variant="h5">2</Typography>
              </Dot>
              <Typography variant="h5">Deploy contracts</Typography>
            </Grid>
            <Typography variant="body2">
              Because the interface doesn't depend on Gnosis infrastructure, you need to deploy the master copy and
              proxy factory yourself.
            </Typography>
            <Button type="button" variant="contained" color="primary" className={classes.btn} onClick={deployContracts}>
              Deploy
            </Button>
          </Card>
        </Grid>
        <Grid item xs={3} lg={2}>
          <Card className={classes.stepCard} disabled={!providerLoaded}>
            <Grid container alignItems="center" className={classes.cardTitle}>
              <Dot className={classes.dot} color="primary">
                <Typography variant="h5">3</Typography>
              </Dot>
              <Typography variant="h5">Create Safe</Typography>
            </Grid>
            <Button type="button" variant="contained" color="primary" className={classes.btn}>
              Create
            </Button>
          </Card>
        </Grid>
      </Grid>
    </Grid>
  );
};

export { WelcomePage };
