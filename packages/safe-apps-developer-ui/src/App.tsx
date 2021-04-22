import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from 'src/components/Header';
import { WelcomePage } from './pages/Welcome';

function App(): React.ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route path="/">
          <WelcomePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
