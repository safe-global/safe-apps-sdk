import { createStyles, makeStyles } from '@material-ui/core/styles';
import ExpandLess from '@material-ui/icons/ExpandLess';
import ExpandMore from '@material-ui/icons/ExpandMore';
import IconButton from '@material-ui/core/IconButton';
import * as React from 'react';

import { Divider } from 'src/components/Layout/Divider';
import { screenSm, sm } from 'src/styles/variables';

const styles = createStyles({
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

const useStyles = makeStyles(styles);

type ProviderProps = {
  toggle: () => void;
  open: boolean;
  info: React.ReactElement;
  render: (ref: React.MutableRefObject<HTMLElement | null>) => React.ReactElement;
};

const Provider = ({ render, info, open, toggle }: ProviderProps): React.ReactElement => {
  const classes = useStyles();
  const providerRef = React.useRef<HTMLDivElement>(null);

  return (
    <>
      <div className={classes.root} ref={providerRef}>
        <Divider />
        <div className={classes.provider} onClick={toggle}>
          {info}
          <IconButton className={classes.expand} disableRipple>
            {open ? <ExpandLess /> : <ExpandMore />}
          </IconButton>
        </div>
        <Divider />
      </div>
      {render(providerRef)}
    </>
  );
};

export default Provider;
