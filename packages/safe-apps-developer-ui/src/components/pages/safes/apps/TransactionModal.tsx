import React from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ModalProps } from '@material-ui/core/Modal';
import { Button } from '@material-ui/core';
import { Modal } from 'src/components/Modal';
import { SafeApp } from 'src/types/apps';
import { Identicon } from 'src/components/Identicon';
import { BalanceBox } from 'src/components/BalanceBox';
import { useEthBalance } from 'src/hooks/useEthBalance';
import { DividerLine } from 'src/components/DividerLine';
import { encodeMultiSendCall, CALL, DELEGATE_CALL } from 'src/api/transactions';
import { useContractsStore } from 'src/stores/contracts';
import { useProviderStore } from 'src/stores/provider';
import { disabled, md, xs, sm, lg } from 'src/styles/variables';
import { CopyBtn } from 'src/components/CopyBtn';
import { Img } from 'src/components/Layout/Img';
import CodeIcon from 'src/assets/icons/icon-code.svg';
import ArrowIcon from 'src/assets/icons/icon-arrow.svg';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      borderRadius: 8,
      backgroundColor: theme.palette.background.paper,
      boxShadow: theme.shadows[5],
      width: 500,
    },
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

const AppNameContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;
  img {
    margin-right: 0.5rem;
  }

  h2 {
    font-weight: 400;
    margin-right: auto;
  }
`;

const Content = styled.div`
  padding: ${md} ${lg};
`;

const SafeContainer = styled.div`
  display: flex;
  align-items: center;

  & > img {
    margin-right: 0.5rem;
  }

  p + p {
    margin-top: 0.5rem;
  }
`;

const TransactionDetails = styled.div``;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  padding: 1rem 0;
`;

type Props = Omit<ModalProps, 'children'> & {
  txs: Transaction[];
  app: SafeApp;
  safeAddress: string;
};

const TransactionModal = ({ open, onClose, app, safeAddress, txs }: Props): React.ReactElement => {
  const classes = useStyles();
  const ethBalance = useEthBalance(safeAddress);
  const isMultiSend = txs.length > 1;
  const [signer, networkId] = useProviderStore((state) => [
    state.signer as ethers.providers.JsonRpcSigner,
    state.networkId,
  ]);
  const multiSendAddress = useContractsStore((state) => state.contracts[networkId].multiSend);
  const [openedTransaction, setOpenedTransaction] = React.useState<Transaction | null>(null);

  const txRecipient = React.useMemo(() => (isMultiSend ? multiSendAddress : txs[0]?.to), [
    txs,
    isMultiSend,
    multiSendAddress,
  ]);
  const txData = React.useMemo(
    () => (isMultiSend ? encodeMultiSendCall(signer, multiSendAddress, txs) : txs[0]?.data),
    [txs, isMultiSend, signer, multiSendAddress],
  );
  const txValue = React.useMemo(() => (isMultiSend ? '0' : ethers.BigNumber.from(txs[0]?.value || 0).toString()), [
    txs,
    isMultiSend,
  ]);
  const operation = isMultiSend ? DELEGATE_CALL : CALL;

  if (!txRecipient || !txData || !txValue) {
    return <div />;
  }

  return (
    <Modal
      aria-labelledby="transaction-modal-title"
      className={classes.modal}
      open={open}
      onClose={onClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <AppNameContainer>
          <img src={`${app.url}/${app.iconPath}`} alt={`${app.name} logo`} width={20} height={20} />
          <Typography variant="h5" component="h2" id="transaction-modal-title">
            {app.name}
          </Typography>
          <IconButton
            aria-label="Close modal"
            onClick={(e) => {
              onClose?.(e, 'escapeKeyDown');
            }}
          >
            <CloseIcon fontSize="large" />
          </IconButton>
        </AppNameContainer>
        <DividerLine noMargin />
        <Content>
          <SafeContainer>
            <Identicon size={32} address={safeAddress} />
            <Grid container direction="column" justify="center">
              <Grid container alignItems="center">
                <p>{safeAddress}</p>
                <CopyBtn content={safeAddress} />
              </Grid>
              <BalanceBox balance={ethers.utils.formatEther(ethBalance)} />
            </Grid>
          </SafeContainer>
          <DividerLine withArrow />
          <TransactionDetails>
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
          </TransactionDetails>
          {txs.length > 1 &&
            txs.map((tx, index) => (
              <Grid role="button" key={index} container alignItems="center" onClick={() => setOpenedTransaction(tx)}>
                <Img src={CodeIcon} alt="Code icon" />
                <Typography variant="subtitle1">Transaction {index}</Typography>
                <Img src={ArrowIcon} alt="Arrow right" />
              </Grid>
            ))}
        </Content>
        <DividerLine noMargin />
        <ButtonContainer>
          <Button
            onClick={() => {
              console.log({ txData, operation, txValue, txRecipient });
            }}
            variant="contained"
            color="secondary"
          >
            Cancel
          </Button>
          <Button
            onClick={() => {
              console.log({ txData, operation, txValue, txRecipient });
            }}
            variant="contained"
            color="primary"
          >
            Confirm
          </Button>
        </ButtonContainer>
      </div>
    </Modal>
  );
};

export { TransactionModal };
