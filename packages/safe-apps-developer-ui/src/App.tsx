import Header from 'src/components/Header';
import { BrowserRouter as Router } from 'react-router-dom';

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
