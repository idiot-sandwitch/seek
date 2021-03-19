import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { ResourcePosts } from "./components/pages/resourcePosts";
import { Login } from "./components/pages/login";
import ResourcePostState from "./context/resourcePost/resourcePostState";
import AlertState from "./context/alert/alertState";
import { Provider } from "react-redux";
import store from "./store";
function App() {
  return (
    <Provider store={store}>
      <ResourcePostState>
      <AlertState>
        <Router>
          <React.Fragment>
            <Header />
            <Switch>
              <Route exact path='/resources' component={ResourcePosts} />
              <Route exact path="/login" component={Login} />
            </Switch>
          </React.Fragment>
        </Router>
        </AlertState>
      </ResourcePostState>
    </Provider>
  );
}

export default App;
