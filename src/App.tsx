import { BrowserRouter as Router } from 'react-router-dom';

import {Routes} from './routes/index';

import { GlobalStyle } from "./styles/global";

function App() {
  return (
    <>
      <Router>
        <Routes/>
      </Router>
      <GlobalStyle/>
    </>
  );
}

export default App;
