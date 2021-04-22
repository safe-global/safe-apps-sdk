import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

import { Img } from 'src/components/Layout/Img';
import WALLET_ICONS from './icons';

const useStyles = makeStyles({
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
    <Img
      alt={`${providerName} logo`}
      className={classes.icon}
      height={WALLET_ICONS[providerName].height}
      src={WALLET_ICONS[providerName].src}
    />
  );
};

export { WalletIcon };
