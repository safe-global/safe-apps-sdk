import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import List from '@material-ui/core/List';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';

import Provider from './Provider';

import { Spacer } from 'src/components/Layout/Spacer';
import Grid from '@material-ui/core/Grid';
import Img from 'src/components/Layout/Img';
import { border, headerHeight, md, screenSm, sm } from 'src/styles/variables';
import { useOpenHandler } from 'src/hooks/useOpenHandler';

import SafeLogo from '../assets/gnosis-safe-multisig-logo.svg';

const useStyles = makeStyles({
  root: {
    backgroundColor: 'white',
    borderRadius: sm,
    boxShadow: '0 0 10px 0 rgba(33, 48, 77, 0.1)',
    marginTop: '11px',
    minWidth: '280px',
    padding: 0,
  },
  summary: {
    backgroundColor: 'white',
    borderBottom: `solid 2px ${border}`,
    boxShadow: '0 2px 4px 0 rgba(212, 212, 211, 0.59)',
    flexWrap: 'nowrap',
    height: headerHeight,
    position: 'fixed',
    width: '100%',
    zIndex: 1301,
  },
  logo: {
    flexBasis: '114px',
    flexShrink: 0,
    flexGrow: 0,
    maxWidth: '55px',
    padding: sm,
    marginTop: '4px',
    [`@media (min-width: ${screenSm}px)`]: {
      maxWidth: 'none',
      paddingLeft: md,
      paddingRight: md,
    },
  },
  popper: {
    zIndex: 2000,
  },
});

const Layout = ({ providerDetails, providerInfo }) => {
  const classes = useStyles();
  const { close, open, toggle } = useOpenHandler();

  return (
    <Grid container justify="center" className={classes.summary}>
      <Grid xs={3} className={classes.logo}>
        <Link to="/">
          <Img alt="Gnosis Team Safe" height={36} src={SafeLogo} />
        </Link>
      </Grid>
      <Spacer />
      <Provider
        info={providerInfo}
        open={open}
        toggle={toggle}
        render={(providerRef) => (
          <Popper
            anchorEl={providerRef.current}
            className={classes.popper}
            open={open}
            placement="bottom"
            popperOptions={{ positionFixed: true }}
          >
            {({ TransitionProps }) => (
              <Grow {...TransitionProps}>
                <>
                  <ClickAwayListener mouseEvent="onClick" onClickAway={close} touchEvent={false}>
                    <List className={classes.root} component="div">
                      {providerDetails}
                    </List>
                  </ClickAwayListener>
                </>
              </Grow>
            )}
          </Popper>
        )}
      />
    </Grid>
  );
};

export default Layout;
