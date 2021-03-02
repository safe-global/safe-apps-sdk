import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';

import Col from 'src/components/layout/Col';
import Img from 'src/components/layout/Img';
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
    <Col className={classes.container} layout="column" start="sm">
      <Img
        alt={`${providerName} logo`}
        className={classes.icon}
        height={WALLET_ICONS[providerName].height}
        src={WALLET_ICONS[providerName].src}
      />
    </Col>
  );
};

export default WalletIcon;
