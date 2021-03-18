import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { ResourcePosts } from "./components/pages/resourcePosts";
import ResourcePostState from "./context/resourcePost/resourcePostState";
function App() {
  
  return (
    <ResourcePostState>
      <Router>
        <div className="App">
          <Header />
          <Switch>
            <Route exact path="/resources" component={ResourcePosts} />
          </Switch>
        </div>
      </Router>
    </ResourcePostState>
  );
}

export default App;
