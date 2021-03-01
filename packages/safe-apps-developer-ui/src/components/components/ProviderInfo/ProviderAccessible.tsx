import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'
import { EthHashInfo, Text } from '@gnosis.pm/safe-react-components'

import NetworkLabel from '../NetworkLabel'
import Col from 'src/components/layout/Col'
import Paragraph from 'src/components/layout/Paragraph'
import WalletIcon from '../WalletIcon'
import { connected as connectedBg, screenSm, sm } from 'src/theme/variables'
import { KeyRing } from 'src/components/AppLayout/Header/components/KeyRing'

const useStyles = makeStyles({
  network: {
    fontFamily: 'Averta, sans-serif',
  },
  networkLabel: {
    '& div': {
      paddingRight: sm,
      paddingLeft: sm,
    },
  },
  identicon: {
    display: 'none',
    [`@media (min-width: ${screenSm}px)`]: {
      display: 'block',
    },
  },
  dot: {
    backgroundColor: '#fff',
    borderRadius: '15px',
    color: connectedBg,
    display: 'none',
    height: '15px',
    position: 'relative',
    right: '10px',
    top: '12px',
    width: '15px',
    [`@media (min-width: ${screenSm}px)`]: {
      display: 'block',
    },
  },
  providerContainer: {
    display: 'flex',
    flex: 1,
    alignItems: 'center',
    width: '100px',
  },
  account: {
    alignItems: 'start',
    display: 'flex',
    flexDirection: 'column',
    flexGrow: 1,
    justifyContent: 'left',
    paddingRight: sm,
  },
  address: {
    marginLeft: '5px',
    letterSpacing: '-0.5px',
  },
})

interface ProviderInfoProps {
  connected: boolean
  provider: string
  // TODO: [xDai] Review. This may cause some issues with EthHashInfo.
  userAddress: string
}

const ProviderInfo = ({ connected, provider, userAddress }: ProviderInfoProps): React.ReactElement => {
  const classes = useStyles()
  const addressColor = connected ? 'text' : 'warning'
  return (
    <>
      {!connected && <KeyRing circleSize={35} dotRight={11} dotSize={16} dotTop={24} keySize={14} mode="warning" />}
      <WalletIcon provider={provider.toUpperCase()} />
      <Col className={classes.account} layout="column" start="sm">
        <Paragraph
          className={classes.network}
          noMargin
          size="xs"
          transform="capitalize"
          weight="bolder"
          data-testid="connected-wallet"
        >
          {provider}
        </Paragraph>
        <div className={classes.providerContainer}>
          {connected ? (
            <EthHashInfo
              hash={userAddress}
              shortenHash={4}
              showIdenticon
              identiconSize="xs"
              textColor={addressColor}
              textSize="sm"
            />
          ) : (
            <Text size="md" color={addressColor}>
              Connection Error
            </Text>
          )}

          {/* <Paragraph className={classes.address} color={color} noMargin size="xs">
            {cutAddress}
          </Paragraph> */}
        </div>
      </Col>
      <Col className={classes.networkLabel} layout="column" start="sm">
        <NetworkLabel />
      </Col>
    </>
  )
}

export default ProviderInfo
