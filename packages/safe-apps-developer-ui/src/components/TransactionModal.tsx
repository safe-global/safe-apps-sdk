import React from 'react';
import { makeStyles, Theme, createStyles } from '@material-ui/core/styles';
import { Modal } from 'src/components/Modal';
import Backdrop from '@material-ui/core/Backdrop';

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    modal: {
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    },
    paper: {
      backgroundColor: theme.palette.background.paper,
      border: '2px solid #000',
      boxShadow: theme.shadows[5],
      padding: theme.spacing(2, 4, 3),
    },
  }),
);

const TransactionModal = ({ open, handleClose }: { open: boolean; handleClose: () => void }): React.ReactElement => {
  const classes = useStyles();

  return (
    <Modal
      aria-labelledby="transaction-modal-title"
      aria-describedby="transaction-modal-description"
      className={classes.modal}
      open={open}
      onClose={handleClose}
      closeAfterTransition
      BackdropComponent={Backdrop}
      BackdropProps={{
        timeout: 500,
      }}
    >
      <div className={classes.paper}>
        <h2 id="spring-modal-title">Spring modal</h2>
        <p id="spring-modal-description">react-spring animates me.</p>
      </div>
    </Modal>
  );
};

export { TransactionModal };
