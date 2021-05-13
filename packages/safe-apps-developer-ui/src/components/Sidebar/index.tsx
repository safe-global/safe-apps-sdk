import React from 'react';
import { useParams, NavLink, NavLinkProps, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { useProviderStore } from 'src/stores/provider';
import { upperFirst } from 'src/utils/strings';
import { connected, headerHeight, sm } from 'src/styles/variables';
import { SafeHeader } from './SafeHeader';
import AppsIcon from './apps.svg';
import { getNetworkNameByChainId } from 'src/api/eth';

const SidebarContainer = styled.aside`
  width: 200px;
  height: calc(100vh - ${headerHeight});
  background-color: white;
  border-right: ${(props) => `2px solid ${props.theme.colors.separator}`};
  padding: ${sm};

  display: flex;
  flex-direction: column;
`;

const Line = styled.hr`
  width: 100%;
  background-color: ${(props) => props.theme.colors.separator};
  height: 2px;
  border: none;
`;

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

// https://material-ui.com/ru/guides/composition/#list
const ListItemLink = (props: ListItemLinkProps): React.ReactElement => {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    () =>
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      React.forwardRef<any, Omit<NavLinkProps, 'to'>>((itemProps, ref) => (
        <NavLink activeStyle={{ color: connected }} to={to} ref={ref} {...itemProps} />
      )),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon && <ListItemIcon>{icon}</ListItemIcon>}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
};

const Sidebar = (): React.ReactElement => {
  const chainId = useProviderStore((state) => state.chainId);
  const params = useParams<{ safeAddress: string }>();
  const { url } = useRouteMatch();

  return (
    <SidebarContainer>
      <SafeHeader network={upperFirst(getNetworkNameByChainId(chainId))} safeAddress={params.safeAddress} />
      <Line />
      <List component="nav" aria-label="main safe features navigation">
        <ListItemLink
          to={`${url}/apps`}
          primary="Apps"
          icon={<img src={AppsIcon} alt="Apps Icon" style={{ width: 24, fill: '#5D7274' }} />}
        />
      </List>
    </SidebarContainer>
  );
};

export { Sidebar };
