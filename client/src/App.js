import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { Comment_item } from "./components/layout/comments/comment_item";
import { ResourcePosts } from "./components/pages/resourcePosts";
import { Provider } from "react-redux";
import store from "./store";
import { Login } from "./components/pages/login";
import { Toaster } from "react-hot-toast";
function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <React.Fragment>
            <Toaster position="top-right" />
          </React.Fragment>
          <Header />
          <Switch>
            <Route exact path="/resources" component={ResourcePosts} />
            <Route exact path="/login" component={Login} />
            <Route exact path="/teachers" component={Comment_item} />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
