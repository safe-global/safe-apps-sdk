import { BrowserRouter as Router } from 'react-router-dom';
import Header from 'src/components/Header';

function App(): React.ReactElement {
  return (
    <Router>
      <div className="App">
        <Header />
      </div>
    </Router>
  );
}

export default App;
