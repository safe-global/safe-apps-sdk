import React from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import { Identicon } from 'src/components/Identicon';
import { textShortener } from 'src/utils/strings';
import { useEthBalance } from 'src/hooks/useEthBalance';
import { BalanceBox } from '../BalanceBox';

type Props = {
  network: string;
  safeAddress: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;
`;

const SafeHeader = ({ network, safeAddress }: Props): React.ReactElement => {
  const etherBalance = useEthBalance(safeAddress);

  return (
    <Container>
      <p>{network}</p>
      <Identicon size={40} address={safeAddress} />
      <p>{textShortener(safeAddress, 6, 4)}</p>
      <BalanceBox balance={ethers.utils.formatEther(etherBalance)} />
    </Container>
  );
};

export { SafeHeader };
