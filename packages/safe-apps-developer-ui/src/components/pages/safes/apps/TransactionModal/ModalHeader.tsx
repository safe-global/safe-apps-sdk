import React from 'react';
import styled from 'styled-components';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import { ModalProps } from '@material-ui/core/Modal';
import CloseIcon from '@material-ui/icons/Close';

const AppNameContainer = styled.div`
  display: flex;
  align-items: center;
  padding: 0.3rem 1rem;

  img:first-child,
  button:first-child {
    margin-right: 0.5rem;
  }

  h2 {
    font-weight: 400;
    margin-right: auto;
  }
`;

type Props = {
  icon?: React.ReactNode;
  heading: string;
} & Pick<ModalProps, 'onClose'>;

const ModalHeader = ({ icon, heading, onClose }: Props): React.ReactElement => (
  <AppNameContainer>
    {icon}
    <Typography variant="h5" component="h2" id="transaction-modal-title">
      {heading}
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
);

// const ModalHeading = ({ app, onClose }: Props): React.ReactElement => (
//   <AppNameContainer>
//     <img src={`${app.url}/${app.iconPath}`} alt={`${app.name} logo`} width={20} height={20} />
//     <Typography variant="h5" component="h2" id="transaction-modal-title">
//       {app.name}
//     </Typography>
//     <IconButton
//       aria-label="Close modal"
//       onClick={(e) => {
//         onClose?.(e, 'escapeKeyDown');
//       }}
//     >
//       <CloseIcon fontSize="large" />
//     </IconButton>
//   </AppNameContainer>
// );

export { ModalHeader };
