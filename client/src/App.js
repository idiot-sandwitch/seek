import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { ResourcePosts } from "./components/pages/resourcePosts";
import { Login } from "./components/pages/login";
import ResourcePostState from "./context/resourcePost/resourcePostState";
import AlertState from "./context/alert/alertState";

function App() {
  return (
    <ResourcePostState>
      <AlertState>
        <Router>
          <div className="App">
            <Header />
            <Switch>
              <Route exact path="/resources" component={ResourcePosts} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </div>
        </Router>
      </AlertState>
    </ResourcePostState>
  );
}

export default App;
