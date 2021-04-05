import React from 'react';
import styled from 'styled-components';
import { secondaryBackground, xs } from 'src/styles/variables';

const Box = styled.p`
  background: ${secondaryBackground};
  padding: ${xs};
  border-radius: 5px;
  width: fit-content;

  span {
    font-weight: bold;
  }
`;

type Props = {
  balance: string;
  symbol?: string;
};

const BalanceBox = ({ balance, symbol = 'ETH' }: Props): React.ReactElement => (
  <Box>
    Balance:{' '}
    <span>
      {balance} {symbol}
    </span>
  </Box>
);

export { BalanceBox };
