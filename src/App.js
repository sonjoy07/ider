import './App.css';
import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Link,
} from "react-router-dom";
import Upload from './Components/Upload'

function App() {
  return (
      <Router>
        <div>

         <Upload/>

          <Switch>
            <Route path="/">
              {/* <PublicPage /> */}
            </Route>
            <Route path="/public">
              {/* <PublicPage /> */}
            </Route>
            <Route path="/login">
              {/* <LoginPage /> */}
            </Route>
          </Switch>
        </div>
      </Router>
    
  );
}

export default App;
