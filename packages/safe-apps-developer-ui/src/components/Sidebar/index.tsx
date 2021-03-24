import React from 'react';
import { useParams, Link, LinkProps, useLocation } from 'react-router-dom';
import styled from 'styled-components';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import { ETHEREUM_NETWORK_TO_ID } from 'src/api/provider';
import { useProviderStore } from 'src/stores/provider';
import { upperFirst } from 'src/utils/strings';
import { headerHeight } from 'src/styles/variables';
import { SafeHeader } from './SafeHeader';
import ÅppsIcon from './apps.svg';

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

interface ListItemLinkProps {
  icon?: React.ReactElement;
  primary: string;
  to: string;
}

// https://material-ui.com/ru/guides/composition/#list
function ListItemLink(props: ListItemLinkProps) {
  const { icon, primary, to } = props;

  const renderLink = React.useMemo(
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    () => React.forwardRef<any, Omit<LinkProps, 'to'>>((itemProps, ref) => <Link to={to} ref={ref} {...itemProps} />),
    [to],
  );

  return (
    <li>
      <ListItem button component={renderLink}>
        {icon ? <ListItemIcon>{icon}</ListItemIcon> : null}
        <ListItemText primary={primary} />
      </ListItem>
    </li>
  );
}

const Sidebar = (): React.ReactElement => {
  const networkId = useProviderStore((state) => state.networkId);
  const params = useParams<{ safeAddress: string }>();
  const { pathname } = useLocation();

  return (
    <SidebarContainer>
      <SafeHeader network={upperFirst(ETHEREUM_NETWORK_TO_ID[networkId])} safeAddress={params.safeAddress} />
      <Line />
      <List component="nav" aria-label="main safe features navigation">
        <ListItemLink to={`${pathname}/apps`} primary="Apps" icon={<img src={ÅppsIcon} alt="Apps Icon" />} />
      </List>
    </SidebarContainer>
  );
};

export { Sidebar };
