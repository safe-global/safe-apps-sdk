import classNames from 'classnames/bind';
import { MouseEventHandler, CSSProperties, ReactElement, ReactNode, HTMLAttributes } from 'react';

import styles from './index.module.scss';

const cx = classNames.bind(styles);

type Props = HTMLAttributes<HTMLParagraphElement> & {
  align?: string;
  children: ReactNode;
  className?: string;
  color?: string;
  dot?: string;
  noMargin?: boolean;
  size?: string;
  transform?: string;
  weight?: string;
  onClick?: MouseEventHandler<HTMLParagraphElement>;
  style?: CSSProperties;
};

const Paragraph = (props: Props): ReactElement => {
  const { align, children, className, color, dot, noMargin, size, transform, weight, ...restProps } = props;
  return (
    <p
      className={cx(styles.paragraph, className, weight, { noMargin, dot }, size, color, transform, align)}
      {...restProps}
    >
      {children}
    </p>
  );
};

export default Paragraph;
