import { lg, md, sm, xl, xs } from 'src/styles/variables';

export type GridLayoutUnit = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export const getSize = (size?: GridLayoutUnit): string => {
  switch (size) {
    case 'xs':
      return xs;
    case 'sm':
      return sm;
    case 'md':
      return md;
    case 'lg':
      return lg;
    case 'xl':
      return xl;
    default:
      return '0';
  }
};
