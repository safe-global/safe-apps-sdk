import ClickAwayListener from '@material-ui/core/ClickAwayListener';
import Grow from '@material-ui/core/Grow';
import Grid from '@material-ui/core/Grid';
import Popper from '@material-ui/core/Popper';
import { makeStyles } from '@material-ui/core/styles';
import * as React from 'react';
import { Link } from 'react-router-dom';

import { Provider } from './Provider';

import { Img } from 'src/components/Layout/Img';
import { border, headerHeight, sm, md } from 'src/styles/variables';
import { useOpenHandler } from 'src/hooks/useOpenHandler';

import SafeLogo from '../assets/gnosis-safe-multisig-logo.svg';
import { Spacer } from 'src/components/Layout/Spacer';

const useStyles = makeStyles({
  dropdownContainer: {
    backgroundColor: 'white',
    borderRadius: sm,
    boxShadow: '0 0 10px 0 rgba(33, 48, 77, 0.1)',
    marginTop: '11px',
    minWidth: '280px',
    minHeight: '244px',
    padding: 0,
  },
  container: {
    backgroundColor: 'white',
    borderBottom: `solid 2px ${border}`,
    boxShadow: '0 2px 4px 0 rgba(212, 212, 211, 0.59)',
    flexWrap: 'nowrap',
    height: headerHeight,
    width: '100%',
    zIndex: 1301,
  },
  link: {
    display: 'flex',
    height: '100%',
    alignItems: 'center',
    paddingLeft: md,
  },
  popper: {
    zIndex: 2000,
  },
});

type Props = { dropdownContent: React.ReactElement; providerInfo: React.ReactElement };

const Layout = ({ dropdownContent, providerInfo }: Props): React.ReactElement => {
  const classes = useStyles();
  const { close, open, toggle } = useOpenHandler();

  return (
    <Grid component="header" container className={classes.container}>
      <Grid item xs={2}>
        <Link className={classes.link} to="/">
          <Img alt="Gnosis Safe Multisig Logo" height={36} src={SafeLogo} />
        </Link>
      </Grid>
      <Spacer />
      <Grid item xs={3}>
        <Provider
          info={providerInfo}
          open={open}
          toggle={toggle}
          render={(providerRef: React.MutableRefObject<HTMLDivElement | null>) => (
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
                      <Grid
                        container
                        direction="column"
                        alignItems="center"
                        justify="space-between"
                        className={classes.dropdownContainer}
                      >
                        {dropdownContent}
                      </Grid>
                    </ClickAwayListener>
                  </>
                </Grow>
              )}
            </Popper>
          )}
        />
      </Grid>
    </Grid>
  );
};

export default Layout;
