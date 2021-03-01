import { createStyles, makeStyles } from '@material-ui/core/styles'
import Dot from '@material-ui/icons/FiberManualRecord'
import React, { ReactElement } from 'react'

import Block from 'src/components/layout/Block'
import Img from 'src/components/layout/Img'
import { border, fancy, screenSm, warning } from 'src/theme/variables'

import KeyIcon from '../assets/key.svg'
import TriangleIcon from '../assets/triangle.svg'

const styles = createStyles({
  root: {
    display: 'none',
    [`@media (min-width: ${screenSm}px)`]: {
      display: 'flex',
    },
  },
  dot: {
    position: 'relative',
    backgroundColor: '#ffffff',
    color: fancy,
  },
  key: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: border,
  },
  warning: {
    position: 'relative',
    top: '-2px',
  },
})

const useStyles = makeStyles(styles)

const buildKeyStyleFrom = (size, center, dotSize) => ({
  width: `${size}px`,
  height: `${size}px`,
  marginLeft: center ? `${dotSize}px` : 'none',
  borderRadius: `${size}px`,
})

const buildDotStyleFrom = (size, top, right, mode) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: `${size}px`,
  top: `${top}px`,
  right: `${right}px`,
  color: mode === 'error' ? fancy : warning,
})

type Props = {
  center?: boolean
  circleSize?: number
  dotRight?: number
  dotSize?: number
  dotTop?: number
  hideDot?: boolean
  keySize: number
  mode?: string
}

export const KeyRing = ({
  center = false,
  circleSize,
  dotRight,
  dotSize,
  dotTop,
  hideDot = false,
  keySize,
  mode,
}: Props): ReactElement => {
  const classes = useStyles(styles)
  const keyStyle = buildKeyStyleFrom(circleSize, center, dotSize)
  const dotStyle = buildDotStyleFrom(dotSize, dotTop, dotRight, mode)
  const isWarning = mode === 'warning'
  const img = isWarning ? TriangleIcon : KeyIcon

  return (
    <>
      <Block className={classes.root}>
        <Block className={classes.key} style={keyStyle}>
          <Img
            alt="Status connection"
            className={isWarning ? classes.warning : undefined}
            height={keySize}
            src={img}
            width={isWarning ? keySize + 2 : keySize}
          />
        </Block>
        {!hideDot && <Dot className={classes.dot} style={dotStyle} />}
      </Block>
    </>
  )
}
