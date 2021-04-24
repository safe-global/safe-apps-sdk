import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';

import { Divider } from 'src/components/Layout/Divider';
import { screenSm, sm } from 'src/styles/variables';

const useStyles = makeStyles({
  root: {
    alignItems: 'center',
    display: 'flex',
    height: '100%',
    marginLeft: 'auto',
    [`@media (min-width: ${screenSm}px)`]: {
      maxWidth: '284px',
      marginRight: '20px',
    },
  },
  provider: {
    alignItems: 'center',
    cursor: 'pointer',
    display: 'flex',
    flex: '1 1 auto',
    padding: sm,
    [`@media (min-width: ${screenSm}px)`]: {
      paddingLeft: sm,
      paddingRight: sm,
    },
  },
  expand: {
    height: '30px',
    width: '30px',
  },
});

type Props = {
  info: React.ReactNode;
  open: boolean;
  toggle: () => void;
  render: (ref: React.MutableRefObject<HTMLDivElement | null>) => React.ReactNode;
};

const Provider = ({ render, info, open, toggle }: Props): React.ReactElement => {
  const classes = useStyles();
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  return (
    <>
      <div className={classes.root} ref={containerRef}>
        <Divider />
        <div className={classes.provider} onClick={toggle}>
          {info}
          <IconButton className={classes.expand} disableRipple>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <Divider />
      </div>
      {render(containerRef)}
    </>
  );
};

export { Provider };
