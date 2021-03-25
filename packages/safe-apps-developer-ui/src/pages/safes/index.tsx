import { Redirect, Route, Switch, useRouteMatch } from 'react-router-dom';
import { Sidebar } from 'src/components/Sidebar';
import Apps from './apps';

const SafePage = (): React.ReactElement => {
  const { path, url } = useRouteMatch();

  return (
    <div>
      <Sidebar />
      <main>
        <Switch>
          <Route path={`${path}/apps`}>
            <Apps />
          </Route>
          <Redirect to={`${url}/apps`} />
        </Switch>
      </main>
    </div>
  );
};

export { SafePage };
