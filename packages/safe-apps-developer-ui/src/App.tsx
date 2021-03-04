import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'src/components/Header';
import GlobalStyle from 'src/styles/global';

function App(): React.ReactElement {
  return (
    <Router>
      <GlobalStyle />
      <div className="App">
        <Header />
      </div>
    </Router>
  );
}

export default App;
