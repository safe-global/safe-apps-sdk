import { makeStyles } from '@material-ui/core/styles'
import * as React from 'react'

import Col from 'src/components/layout/Col'
import Img from 'src/components/layout/Img'
import WALLET_ICONS from './icons'

const useStyles = makeStyles({
  container: {
    marginLeft: '5px',
    marginRight: '10px',
    letterSpacing: '-0.5px',
  },
  icon: {
    maxWidth: 'none',
  },
})

interface WalletIconProps {
  provider: string
}

const WalletIcon = ({ provider }: WalletIconProps): React.ReactElement => {
  const classes = useStyles()
  return (
    <Col className={classes.container} layout="column" start="sm">
      <Img
        alt={provider}
        className={classes.icon}
        height={WALLET_ICONS[provider].height}
        src={WALLET_ICONS[provider].src}
      />
    </Col>
  )
}

export default WalletIcon
