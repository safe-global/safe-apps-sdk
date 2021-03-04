import { createStyles, makeStyles } from '@material-ui/core/styles';
import Dot from '@material-ui/icons/FiberManualRecord';
import React, { ReactElement } from 'react';

import { Img } from 'src/components/Layout/Img';
import { border, fancyColor, screenSm, warning } from 'src/styles/variables';

import KeyIcon from '../assets/key.svg';
import TriangleIcon from '../assets/triangle.svg';

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
    color: fancyColor,
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
});

const useStyles = makeStyles(styles);

const buildKeyStyleFrom = (size: number, center: boolean, dotSize: number) => ({
  width: `${size}px`,
  height: `${size}px`,
  marginLeft: center ? `${dotSize}px` : 'none',
  borderRadius: `${size}px`,
});

const buildDotStyleFrom = (size: number, top: number, right: number, mode: string) => ({
  width: `${size}px`,
  height: `${size}px`,
  borderRadius: `${size}px`,
  top: `${top}px`,
  right: `${right}px`,
  color: mode === 'error' ? fancyColor : warning,
});

type Props = {
  center?: boolean;
  circleSize?: number;
  dotRight?: number;
  dotSize?: number;
  dotTop?: number;
  hideDot?: boolean;
  keySize: number;
  mode?: string;
};

export const KeyRing = ({
  center = false,
  circleSize,
  dotRight,
  dotSize,
  dotTop,
  hideDot = false,
  keySize,
  mode = '',
}: Props): ReactElement => {
  const classes = useStyles(styles);
  const keyStyle = buildKeyStyleFrom(circleSize || 5, center, dotSize || 5);
  const dotStyle = buildDotStyleFrom(dotSize || 5, dotTop || 5, dotRight || 5, mode);
  const isWarning = mode === 'warning';
  const img = isWarning ? TriangleIcon : KeyIcon;

  return (
    <>
      <div className={classes.root}>
        <div className={classes.key} style={keyStyle}>
          <Img
            alt="Connection status"
            className={isWarning ? classes.warning : undefined}
            height={keySize}
            src={img}
            width={isWarning ? keySize + 2 : keySize}
          />
        </div>
        {!hideDot && <Dot className={classes.dot} style={dotStyle} />}
      </div>
    </>
  );
};
