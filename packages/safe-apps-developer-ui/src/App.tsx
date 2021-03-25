import { BrowserRouter as Router, Redirect, Route, Switch } from 'react-router-dom';
import Header from 'src/components/Header';
import { WelcomePage } from './pages/Welcome';
import { SafePage } from './pages/safes';

function App(): React.ReactElement {
  return (
    <Router>
      <Header />
      <Switch>
        <Route exact path="/">
          <WelcomePage />
        </Route>
        <Route path="/safes/:safeAddress">
          <SafePage />
        </Route>
        <Redirect to="/" />
      </Switch>
    </Router>
  );
}

export default App;
