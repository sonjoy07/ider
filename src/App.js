import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Upload from './Components/Upload'
import Table from './Components/TableView'
import configureStore from './store/configureStore';
import { Provider } from 'react-redux';
const store = configureStore();

function App() {
  return (
    <Provider store={store}>
      <Router>
        <div>
          <Switch>
            <Route exact path="/" component={Upload} />
            <Route path="/table" component={Table} />
          </Switch>
        </div>
      </Router>
    </Provider>
  );
}

export default App;
