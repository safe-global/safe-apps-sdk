import { makeStyles } from '@material-ui/core/styles'
import Dot from '@material-ui/icons/FiberManualRecord'
import classNames from 'classnames'
import * as React from 'react'
import { EthHashInfo, Identicon } from '@gnosis.pm/safe-react-components'

import Spacer from 'src/components/Spacer'
import Block from 'src/components/layout/Block'
import Button from 'src/components/layout/Button'
import Hairline from 'src/components/layout/Hairline'
import Img from 'src/components/layout/Img'
import Paragraph from 'src/components/layout/Paragraph'
import Row from 'src/components/layout/Row'
import { background, connected as connectedBg, lg, md, sm, warning, xs } from 'src/theme/variables'
import { upperFirst } from 'src/utils/css'
import { ETHEREUM_NETWORK } from 'src/config/networks/network.d'
import { getExplorerInfo } from 'src/config'
import { KeyRing } from 'src/components/AppLayout/Header/components/KeyRing'
import { CircleDot } from '../CircleDot'
import { createStyles } from '@material-ui/core'

import WalletIcon from '../../assets/wallet.svg'

const styles = createStyles({
  container: {
    padding: `${md} 12px`,
    display: 'flex',
    flexDirection: 'column',
  },
  identicon: {
    justifyContent: 'center',
    padding: `0 ${md}`,
  },
  user: {
    borderRadius: '3px',
    backgroundColor: background,
    margin: '0 auto',
    padding: '9px',
    lineHeight: 1,
  },
  details: {
    padding: `0 ${md}`,
    height: '20px',
    alignItems: 'center',
  },
  address: {
    flexGrow: 1,
    textAlign: 'center',
    letterSpacing: '-0.5px',
    marginRight: sm,
  },
  labels: {
    fontSize: '12px',
    letterSpacing: '0.5px',
  },
  open: {
    paddingLeft: sm,
    width: 'auto',
    '&:hover': {
      cursor: 'pointer',
    },
  },
  disconnect: {
    padding: `${md} ${lg}`,
    '& button': {
      background: '#f02525',
    },
  },
  dashboard: {
    padding: `${md} ${lg} ${xs}`,
  },
  dashboardText: {
    letterSpacing: '1px',
  },
  disconnectText: {
    letterSpacing: '1px',
  },
  logo: {
    margin: `0px ${xs}`,
  },
  dot: {
    marginRight: xs,
    height: '15px',
    width: '15px',
  },
  warning: {
    color: warning,
  },
  connected: {
    color: connectedBg,
  },
})

type Props = {
  connected: boolean
  network: ETHEREUM_NETWORK
  onDisconnect: () => void
  openDashboard?: (() => void | null) | boolean
  provider?: string
  userAddress: string
}

const useStyles = makeStyles(styles)

export const UserDetails = ({
  connected,
  network,
  onDisconnect,
  openDashboard,
  provider,
  userAddress,
}: Props): React.ReactElement => {
  const status = connected ? 'Connected' : 'Connection error'
  const color = connected ? 'primary' : 'warning'
  const explorerUrl = getExplorerInfo(userAddress)
  const classes = useStyles()

  return (
    <>
      <Block className={classes.container}>
        <Row align="center" className={classes.identicon} margin="md">
          {connected ? (
            <Identicon address={userAddress || 'random'} size="lg" />
          ) : (
            <KeyRing circleSize={75} dotRight={25} dotSize={25} dotTop={50} hideDot keySize={30} mode="warning" />
          )}
        </Row>
        <Block className={classes.user} justify="center">
          {userAddress ? (
            <EthHashInfo hash={userAddress} showCopyBtn explorerUrl={explorerUrl} shortenHash={4} />
          ) : (
            'Address not available'
          )}
        </Block>
      </Block>
      <Hairline margin="xs" />
      <Row className={classes.details}>
        <Paragraph align="right" className={classes.labels} noMargin>
          Status
        </Paragraph>
        <Spacer />
        <Dot className={classNames(classes.dot, connected ? classes.connected : classes.warning)} />
        <Paragraph align="right" className={classes.labels} color={color} noMargin weight="bolder">
          {status}
        </Paragraph>
      </Row>
      <Hairline margin="xs" />
      <Row className={classes.details}>
        <Paragraph align="right" className={classes.labels} noMargin>
          Wallet
        </Paragraph>
        <Spacer />
        <Img alt="Wallet icon" className={classes.logo} height={14} src={WalletIcon} />
        <Paragraph align="right" className={classes.labels} noMargin weight="bolder">
          {upperFirst(provider)}
        </Paragraph>
      </Row>
      <Hairline margin="xs" />
      <Row className={classes.details}>
        <Paragraph align="right" className={classes.labels} noMargin>
          Network
        </Paragraph>
        <Spacer />
        <CircleDot className={classes.logo} />
        <Paragraph align="right" className={classes.labels} noMargin weight="bolder">
          {upperFirst(ETHEREUM_NETWORK[network])}
        </Paragraph>
      </Row>
      <Hairline margin="xs" />
      {openDashboard && (
        <Row className={classes.dashboard}>
          <Button color="primary" fullWidth onClick={openDashboard} size="medium" variant="contained">
            <Paragraph className={classes.dashboardText} color="white" noMargin size="md">
              {upperFirst(provider)} Wallet
            </Paragraph>
          </Button>
        </Row>
      )}
      <Row className={classes.disconnect}>
        <Button
          color="primary"
          fullWidth
          onClick={onDisconnect}
          size="medium"
          variant="contained"
          data-testid="disconnect-btn"
        >
          <Paragraph className={classes.disconnectText} color="white" noMargin size="md">
            Disconnect
          </Paragraph>
        </Button>
      </Row>
    </>
  )
}
