import * as React from 'react';

import makeBlockie from 'ethereum-blockies-base64';
import styled from 'styled-components';

type Props = {
  address: string;
  size?: number;
  className?: string;
};

const StyledImg = styled.img<{ size: number }>`
  height: ${({ size }) => `${size}px`};
  width: ${({ size }) => `${size}px`};
  border-radius: 50%;
`;

const Identicon = ({ size = 40, address, ...rest }: Props): React.ReactElement => {
  const iconSrc = React.useMemo(() => makeBlockie(address), [address]);

  return <StyledImg src={iconSrc} size={size} {...rest} />;
};

export { Identicon };
