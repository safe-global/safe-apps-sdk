import React from 'react';
import styled from 'styled-components';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import IconButton from '@material-ui/core/IconButton';
import Backdrop from '@material-ui/core/Backdrop';
import CloseIcon from '@material-ui/icons/Close';
import Typography from '@material-ui/core/Typography';
import { ModalProps } from '@material-ui/core/Modal';
import { Modal } from 'src/components/Modal';
import { Transaction } from '@gnosis.pm/safe-apps-sdk';
import { SafeApp } from 'src/types/apps';
import { Identicon } from 'src/components/Identicon';
import { BalanceBox } from './BalanceBox';
import { useEthBalance } from 'src/hooks/useEthBalance';
import { ethers } from 'ethers';

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
  padding: 1rem;
`;

const SafeContainer = styled.div`
  display: flex;
  align-items: center;
  img {
    margin-right: 0.5rem;
  }
`;

type Props = Omit<ModalProps, 'children'> & {
  txs: Transaction[];
  app: SafeApp;
  safeAddress: string;
};

const TransactionModal = ({ open, onClose, app, safeAddress }: Props): React.ReactElement => {
  const classes = useStyles();
  const ethBalance = useEthBalance(safeAddress);

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
        <hr />
        <Content>
          <SafeContainer>
            <Identicon size={32} address={safeAddress} />
            <p>{safeAddress}</p>
          </SafeContainer>
          <BalanceBox balance={ethers.utils.formatEther(ethBalance)} />
        </Content>
      </div>
    </Modal>
  );
};

export { TransactionModal };
