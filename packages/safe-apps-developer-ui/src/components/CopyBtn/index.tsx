import React from 'react';
import Tooltip from '@material-ui/core/Tooltip';
import { makeStyles } from '@material-ui/core/styles';

import CopyIcon from './copy.svg';

import { Img } from 'src/components/Layout/Img';
import { xs } from 'src/styles/variables';
import { copyToClipboard } from 'src/utils/clipboard';

const useStyles = makeStyles({
  container: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    cursor: 'pointer',
    margin: `0 ${xs}`,
    borderRadius: '50%',
    transition: 'background-color .2s ease-in-out',
    '&:hover': {
      backgroundColor: '#F0EFEE',
    },
  },
  increasedPopperZindex: {
    zIndex: 2001,
  },
});

interface CopyBtnProps {
  className?: string;
  content: string;
  increaseZIndex?: boolean;
}

const CopyBtn = ({ className = '', content, increaseZIndex = false }: CopyBtnProps): React.ReactElement => {
  const [clicked, setClicked] = React.useState(false);
  const classes = useStyles();
  const customClasses = increaseZIndex ? { popper: classes.increasedPopperZindex } : {};

  return (
    <Tooltip
      classes={customClasses}
      onClose={() => {
        // this is fired before tooltip is closed
        // added setTimeout so the user doesn't see the text changing/jumping
        setTimeout(() => {
          if (clicked) {
            setClicked(false);
          }
        }, 300);
      }}
      placement="top"
      title={clicked ? 'Copied' : 'Copy to clipboard'}
    >
      <div className={`${classes.container} ${className}`}>
        <Img
          alt="Copy to clipboard"
          height={20}
          onClick={(event) => {
            event.stopPropagation();
            copyToClipboard(content);
            setClicked(true);
          }}
          src={CopyIcon}
        />
      </div>
    </Tooltip>
  );
};

export { CopyBtn };
