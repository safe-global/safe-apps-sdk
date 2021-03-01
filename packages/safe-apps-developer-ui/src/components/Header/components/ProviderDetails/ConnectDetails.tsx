import { withStyles } from '@material-ui/core/styles'
import * as React from 'react'

import ConnectButton from 'src/components/ConnectButton'

import Block from 'src/components/layout/Block'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { lg, md } from 'src/theme/variables'
import { KeyRing } from 'src/components/AppLayout/Header/components/KeyRing'

const styles = () => ({
  container: {
    padding: `${md} 12px`,
  },
  logo: {
    justifyContent: 'center',
  },
  text: {
    letterSpacing: '-0.6px',
    flexGrow: 1,
    textAlign: 'center',
  },
  connect: {
    padding: `${md} ${lg}`,
    textAlign: 'center',
  },
  connectText: {
    letterSpacing: '1px',
  },
  img: {
    margin: '0px 2px',
  },
})

const ConnectDetails = ({ classes }) => (
  <>
    <div className={classes.container}>
      <Row align="center" margin="lg">
        <Paragraph className={classes.text} noMargin size="lg" weight="bolder">
          Connect a Wallet
        </Paragraph>
      </Row>
    </div>
    <Row className={classes.logo} margin="lg">
      <KeyRing center circleSize={75} dotRight={25} dotSize={25} dotTop={50} keySize={32} mode="error" />
    </Row>
    <Block className={classes.connect}>
      <ConnectButton data-testid="heading-connect-btn" />
    </Block>
  </>
)

export default withStyles(styles as any)(ConnectDetails)
