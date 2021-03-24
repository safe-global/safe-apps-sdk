import { useParams } from 'react-router-dom';
import styled from 'styled-components';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';
import { useProviderStore } from 'src/stores/provider';
import { upperFirst } from 'src/utils/strings';
import { headerHeight } from 'src/styles/variables';
import { SafeHeader } from './SafeHeader';

const SidebarContainer = styled.aside`
  width: 200px;
  height: calc(100vh - ${headerHeight});
  background-color: white;
  border-right: ${(props) => `2px solid ${props.theme.colors.separator}`};

  display: flex;
  flex-direction: column;
`;

const Line = styled.hr`
  width: 100%;
  background-color: ${(props) => props.theme.colors.separator};
  height: 2px;
  border: none;
`;

const Sidebar = (): React.ReactElement => {
  const networkId = useProviderStore((state) => state.networkId);
  const params = useParams<{ safeAddress: string }>();

  return (
    <SidebarContainer>
      <SafeHeader network={upperFirst(ETHEREUM_NETWORK_TO_ID[networkId])} safeAddress={params.safeAddress} />
      <Line />
      <a href="#test">Apps</a>
    </SidebarContainer>
  );
};

export { Sidebar };
