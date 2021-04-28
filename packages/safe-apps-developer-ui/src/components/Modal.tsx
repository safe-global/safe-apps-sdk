import React from 'react';
import MuiModal, { ModalProps } from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { useSpring, animated } from 'react-spring';

interface FadeProps {
  children?: React.ReactElement;
  in: boolean;
  onEnter?: () => void;
  onExited?: () => void;
}

const Fade = React.forwardRef<HTMLDivElement, FadeProps>(function Fade(props, ref) {
  const { in: open, children, onEnter, onExited, ...other } = props;
  const style = useSpring({
    from: { opacity: 0 },
    to: { opacity: open ? 1 : 0 },
    onStart: () => {
      if (open && onEnter) {
        onEnter();
      }
    },
    onRest: () => {
      if (!open && onExited) {
        onExited();
      }
    },
  });

  return (
    <animated.div ref={ref} style={style} {...other}>
      {children}
    </animated.div>
  );
});

const Modal = ({ children, open, ...props }: ModalProps): React.ReactElement => (
  <MuiModal
    open={open}
    closeAfterTransition
    BackdropComponent={Backdrop}
    BackdropProps={{
      timeout: 500,
    }}
    {...props}
  >
    <Fade in={open}>{children}</Fade>
  </MuiModal>
);

export { Modal };
