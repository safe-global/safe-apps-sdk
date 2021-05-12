import React from 'react';
import { ethers } from 'ethers';
import styled from 'styled-components';
import Grid from '@material-ui/core/Grid';
import { Identicon } from 'src/components/Identicon';
import { textShortener } from 'src/utils/strings';
import { useEthBalance } from 'src/hooks/useEthBalance';
import { BalanceBox } from '../BalanceBox';
import { CopyBtn } from '../CopyBtn';

type Props = {
  network: string;
  safeAddress: string;
};

const Container = styled.div`
  display: flex;
  align-items: center;
  flex-direction: column;

  & > * {
    margin-top: 0.5rem;
  }
`;

const SafeHeader = ({ network, safeAddress }: Props): React.ReactElement => {
  const etherBalance = useEthBalance(safeAddress, true);

  return (
    <Container>
      <p>{network}</p>
      <Identicon size={40} address={safeAddress} />
      <Grid container alignItems="center" justify="center">
        <p>{textShortener(safeAddress, 6, 4)}</p>
        <CopyBtn content={safeAddress} />
      </Grid>
      <BalanceBox balance={ethers.utils.formatEther(etherBalance)} />
    </Container>
  );
};

export { SafeHeader };
