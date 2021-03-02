import classNames from 'classnames/bind';
import * as React from 'react';

import styles from './index.module.scss';

import { capitalize } from 'src/utils/strings';

const cx = classNames.bind(styles);

const Col = ({
  around,
  between,
  bottom,
  center,
  children,
  className,
  end,
  layout = 'inherit',
  lg,
  lgOffset,
  margin,
  md,
  mdOffset,
  middle,
  overflow,
  sm,
  smOffset,
  start,
  top,
  xs,
  xsOffset,
  ...props
}: any) => {
  const colClassNames = cx(
    'col',
    center ? capitalize(center, 'center') : undefined,
    start ? capitalize(start, 'start') : undefined,
    end ? capitalize(end, 'end') : undefined,
    top ? capitalize(top, 'top') : undefined,
    middle ? capitalize(middle, 'middle') : undefined,
    bottom ? capitalize(bottom, 'bottom') : undefined,
    around ? capitalize(around, 'around') : undefined,
    between ? capitalize(between, 'between') : undefined,
    margin ? capitalize(margin, 'margin') : undefined,
    xs ? capitalize(xs, 'xs') : undefined,
    sm ? capitalize(sm, 'sm') : undefined,
    md ? capitalize(md, 'md') : undefined,
    lg ? capitalize(lg, 'lg') : undefined,
    xsOffset ? capitalize(xsOffset, 'xsOffset') : undefined,
    smOffset ? capitalize(smOffset, 'smOffset') : undefined,
    mdOffset ? capitalize(mdOffset, 'mdOffset') : undefined,
    lgOffset ? capitalize(lgOffset, 'lgOffset') : undefined,
    { overflow },
    layout,
    className,
  );

  return (
    <div className={colClassNames} {...props}>
      {children}
    </div>
  );
};

export default Col;
