import React from 'react';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { SendTransactionParams, Transaction } from '@gnosis.pm/safe-apps-sdk';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import Backdrop from '@material-ui/core/Backdrop';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import { ModalProps } from '@material-ui/core/Modal';
import { Button, IconButton } from '@material-ui/core';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import { createTransaction } from 'src/api/transactions';
import { Modal } from 'src/components/Modal';
import { SafeApp } from 'src/types/apps';
import { useEthBalance } from 'src/hooks/useEthBalance';
import { DividerLine } from 'src/components/DividerLine';
import { encodeMultiSendCall, CALL, DELEGATE_CALL } from 'src/api/transactions';
import { useContractsStore } from 'src/stores/contracts';
import { useProviderStore } from 'src/stores/provider';
import { md, lg, border, sm } from 'src/styles/variables';
import { Img } from 'src/components/Layout/Img';
import CodeIcon from 'src/assets/icons/icon-code.svg';
import ArrowIcon from 'src/assets/icons/icon-arrow.svg';
import { ModalHeader } from './ModalHeader';
import { SafeDetails } from './SafeDetails';
import { TransactionDetails } from './TransactionDetails';

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
    transactionBtnContainer: {
      width: '100%',
      borderTop: `${border} 2px solid`,
      padding: `${md} ${lg}`,
      '& > h6': {
        marginRight: 'auto',
      },
    },
  }),
);

const Content = styled.div`
  padding: ${md} ${lg};
`;

const ButtonContainer = styled.div`
  display: flex;
  width: 100%;
  justify-content: space-around;

  padding: 1rem 0;
`;

type Props = Omit<ModalProps, 'children'> & {
  txs: Transaction[];
  app: SafeApp;
  params?: SendTransactionParams;
  safeAddress: string;
  onUserConfirm?: (safeTxHash: string) => void;
  onUserReject?: () => void;
};

const TransactionModal = ({
  open,
  onClose,
  app,
  safeAddress,
  txs,
  params,
  onUserConfirm,
  onUserReject,
}: Props): React.ReactElement => {
  const classes = useStyles();
  const ethBalance = useEthBalance(safeAddress, true);
  const isMultiSend = txs.length > 1;
  const [signer, chainId, userAddress] = useProviderStore((state) => [
    state.signer as ethers.providers.JsonRpcSigner,
    state.chainId,
    state.account,
  ]);
  const multiSendAddress = useContractsStore((state) => state.contracts[chainId].multiSend);
  const [openedTransaction, setOpenedTransaction] = React.useState<Transaction | null>(null);

  const txRecipient = React.useMemo(
    () => (isMultiSend ? multiSendAddress : txs[0]?.to),
    [txs, isMultiSend, multiSendAddress],
  );
  const txData = React.useMemo(
    () => (isMultiSend ? encodeMultiSendCall(signer, multiSendAddress, txs) : txs[0]?.data),
    [txs, isMultiSend, signer, multiSendAddress],
  );
  const txValue = React.useMemo(
    () => (isMultiSend ? '0' : ethers.BigNumber.from(txs[0]?.value || 0).toString()),
    [txs, isMultiSend],
  );
  const operation = isMultiSend ? DELEGATE_CALL : CALL;

  if (!txRecipient || !txData || !txValue) {
    return <div />;
  }

  let header = (
    <ModalHeader
      icon={<img src={`${app.url}/${app.iconPath}`} alt={`${app.name} logo`} width={20} height={20} />}
      heading={app.name}
      onClose={onClose}
    />
  );
  let content = (
    <>
      <Content>
        <SafeDetails safeAddress={safeAddress} ethBalanceWei={ethBalance} />
        <DividerLine withArrow />
        <TransactionDetails txData={txData} txRecipient={txRecipient} txValue={txValue} />
      </Content>
      {txs.length > 1 &&
        txs.map((tx, index) => (
          <Grid
            role="button"
            key={index}
            container
            className={classes.transactionBtnContainer}
            alignItems="center"
            onClick={() => setOpenedTransaction(tx)}
            onKeyDown={(e) => {
              if (e.key === ' ' || e.key === 'Enter' || e.key === 'Spacebar') {
                setOpenedTransaction(tx);
              }
            }}
            tabIndex={0}
          >
            <Img src={CodeIcon} style={{ marginRight: sm }} alt="Code icon" />
            <Typography variant="subtitle1">Transaction {index}</Typography>
            <Img src={ArrowIcon} alt="Arrow right" style={{ transform: 'rotate(90deg)' }} />
          </Grid>
        ))}
      <DividerLine noMargin />
      <ButtonContainer>
        <Button
          onClick={(e) => {
            onClose?.(e, 'escapeKeyDown');

            onUserReject?.();
          }}
          variant="contained"
          color="secondary"
        >
          Cancel
        </Button>
        <Button
          onClick={async (e) => {
            try {
              const { safeTxHash } = await createTransaction(signer, safeAddress, userAddress, {
                to: txRecipient,
                data: txData,
                valueInWei: txValue,
                operation,
                safeTxGas: params?.safeTxGas ?? 0,
              });

              onClose?.(e, 'escapeKeyDown');
              onUserConfirm?.(safeTxHash);
            } catch (err) {
              onClose?.(e, 'escapeKeyDown');
              onUserReject?.();
            }
          }}
          variant="contained"
          color="primary"
        >
          Confirm
        </Button>
      </ButtonContainer>
    </>
  );

  if (openedTransaction) {
    header = (
      <ModalHeader
        icon={
          <IconButton aria-label="Go back" onClick={() => setOpenedTransaction(null)}>
            <ArrowBackIcon fontSize="large" />
          </IconButton>
        }
        heading="Transaction"
        onClose={onClose}
      />
    );
    content = (
      <Content>
        <TransactionDetails
          txData={openedTransaction.data}
          txRecipient={openedTransaction.to}
          txValue={openedTransaction.value}
        />
      </Content>
    );
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
        {header}
        <DividerLine noMargin />
        {content}
      </div>
    </Modal>
  );
};

export { TransactionModal };
