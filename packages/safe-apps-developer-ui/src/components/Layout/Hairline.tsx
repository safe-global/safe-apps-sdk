import { CSSProperties } from 'react';
import { getSize, GridLayoutUnit } from 'src/styles/utils';
import { border } from 'src/styles/variables';

const calculateStyleFrom = (color?: string, margin?: GridLayoutUnit) => ({
  width: '100%',
  minHeight: '2px',
  height: '2px',
  backgroundColor: color || border,
  margin: `${getSize(margin)} 0px`,
});

type Props = {
  className?: string;
  color?: string;
  margin?: GridLayoutUnit;
  style?: CSSProperties;
};

const Hairline = ({ className, color, margin, style }: Props): React.ReactElement => {
  const calculatedStyles = calculateStyleFrom(color, margin);
  const mergedStyles = { ...calculatedStyles, ...(style || {}) };

  return <div className={className} style={mergedStyles} />;
};

export { Hairline };
