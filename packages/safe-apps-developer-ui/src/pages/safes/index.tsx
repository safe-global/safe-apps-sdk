import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import styled from 'styled-components';
import { Sidebar } from 'src/components/Sidebar';
import Apps from './apps';

const PageContainer = styled.div`
  display: flex;
`;

const Content = styled.main`
  flex-grow: 1;
`;

const SafePage = (): React.ReactElement => {
  const { path, url } = useRouteMatch();

  return (
    <PageContainer>
      <Sidebar />
      <Content>
        <Switch>
          <Route path={`${path}/apps`}>
            <Apps />
          </Route>
          <Redirect to={`${url}/apps`} />
        </Switch>
      </Content>
    </PageContainer>
  );
};

export { SafePage };
