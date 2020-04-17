import React from 'react';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";

import Cabecalho from './componentes/Cabecalho';
import UploadSimples from './componentes/UploadSimples';
import UploadDrop from './componentes/UploadDrop';

function App() {
  return (
    <div className="container">
      <Router>
        <Cabecalho/>
        <Switch>
          <Route path="/" exact={true}><UploadSimples/></Route>
          <Route path="/drop"><UploadDrop/></Route>
        </Switch>
      </Router>
    </div>
  );
}

export default App;
