import Grid from '@material-ui/core/Grid';
import styled from 'styled-components';
import { ethers } from 'ethers';
import { BalanceBox } from 'src/components/BalanceBox';
import { Identicon } from 'src/components/Identicon';
import { CopyBtn } from 'src/components/CopyBtn';

type Props = {
  safeAddress: string;
  ethBalanceWei: ethers.BigNumberish;
};

const SafeContainer = styled.div`
  display: flex;
  align-items: center;

  & > img {
    margin-right: 0.5rem;
  }

  p + p {
    margin-top: 0.5rem;
  }
`;

const SafeDetails = ({ safeAddress, ethBalanceWei }: Props): React.ReactElement => (
  <SafeContainer>
    <Identicon size={32} address={safeAddress} />
    <Grid container direction="column" justify="center">
      <Grid container alignItems="center">
        <p>{safeAddress}</p>
        <CopyBtn content={safeAddress} />
      </Grid>
      <BalanceBox balance={ethers.utils.formatEther(ethBalanceWei)} />
    </Grid>
  </SafeContainer>
);

export { SafeDetails };
