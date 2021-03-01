import ClickAwayListener from '@material-ui/core/ClickAwayListener'
import Grow from '@material-ui/core/Grow'
import List from '@material-ui/core/List'
import Popper from '@material-ui/core/Popper'
import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { Link } from 'react-router-dom'

import Provider from './Provider'

import Spacer from 'src/components/Spacer'
import Col from 'src/components/layout/Col'
import Img from 'src/components/layout/Img'
import Row from 'src/components/layout/Row'
import { border, headerHeight, md, screenSm, sm } from 'src/theme/variables'
import { useStateHandler } from 'src/logic/hooks/useStateHandler'

import SafeLogo from '../assets/gnosis-safe-multisig-logo.svg'

const styles = () => ({
  root: {
    backgroundColor: 'white',
    borderRadius: sm,
    boxShadow: '0 0 10px 0 rgba(33, 48, 77, 0.1)',
    marginTop: '11px',
    minWidth: '280px',
    padding: 0,
  },
  summary: {
    alignItems: 'center',
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
    flexShrink: '0',
    flexGrow: '0',
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
})

const Layout = ({ classes, providerDetails, providerInfo }) => {
  const { clickAway, open, toggle } = useStateHandler()

  return (
    <Row className={classes.summary}>
      <Col className={classes.logo} middle="xs" start="xs">
        <Link to="/">
          <Img alt="Gnosis Team Safe" height={36} src={SafeLogo} testId="heading-gnosis-logo" />
        </Link>
      </Col>
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
                  <ClickAwayListener mouseEvent="onClick" onClickAway={clickAway} touchEvent={false}>
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
    </Row>
  )
}

export default withStyles(styles as any)(Layout)
