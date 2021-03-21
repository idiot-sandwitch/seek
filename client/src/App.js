import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { ResourcePosts } from "./components/pages/resourcePosts";
import { Provider } from "react-redux";
import store from "./store";
import { Login } from "./components/pages/login";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/resources" component={ResourcePosts} />
            <Route exact path="/login" component={Login} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
