import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { makeStyles, createStyles } from '@material-ui/core/styles';
import { ethers } from 'ethers';
import { CopyBtn } from 'src/components/CopyBtn';
import { Identicon } from 'src/components/Identicon';
import { sm, md, xs, disabled } from 'src/styles/variables';

type Props = {
  txRecipient: string;
  txData: string;
  txValue: string;
};

const useStyles = makeStyles(() =>
  createStyles({
    txInfoHeading: {
      color: disabled,
      marginBottom: xs,
      '&:not(:first-child)': {
        marginTop: md,
      },
    },
    identicon: {
      marginRight: sm,
    },
  }),
);

const TransactionDetails = ({ txData, txRecipient, txValue }: Props): React.ReactElement => {
  const classes = useStyles();

  return (
    <div>
      <Typography variant="body2" className={classes.txInfoHeading}>
        Recipient
      </Typography>
      <Grid container alignItems="center">
        <Identicon className={classes.identicon} size={32} address={txRecipient} />
        <p>{txRecipient}</p>
        <CopyBtn content={txRecipient} />
      </Grid>
      <Typography variant="body2" className={classes.txInfoHeading}>
        Value
      </Typography>
      <p>{txValue} ETH</p>
      <Typography variant="body2" className={classes.txInfoHeading}>
        Data (hex encoded)
      </Typography>
      <Grid container alignItems="center">
        <p>{ethers.utils.arrayify(txData).length} bytes</p>
        <CopyBtn content={txData} />
      </Grid>
    </div>
  );
};

export { TransactionDetails };
