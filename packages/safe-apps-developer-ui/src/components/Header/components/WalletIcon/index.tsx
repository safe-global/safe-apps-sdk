import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Grid } from '@material-ui/core';

import { Img } from 'src/components/Layout/Img';
import WALLET_ICONS from './icons';

const useStyles = makeStyles({
  container: {
    marginLeft: '5px',
    marginRight: '10px',
    letterSpacing: '-0.5px',
  },
  icon: {
    maxWidth: 'none',
  },
});

interface WalletIconProps {
  providerName: string;
}

const WalletIcon = ({ providerName }: WalletIconProps): React.ReactElement => {
  const classes = useStyles();

  return (
    <Grid className={classes.container} sm={12}>
      <Img
        alt={`${providerName} logo`}
        className={classes.icon}
        height={WALLET_ICONS[providerName].height}
        src={WALLET_ICONS[providerName].src}
      />
    </Grid>
  );
};

export { WalletIcon };
