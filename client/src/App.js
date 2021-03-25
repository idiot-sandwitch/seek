import React from "react";
import { HashRouter as Router, Switch, Route } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { Comments } from "./components/layout/comments/comments";
import { ResourcePosts } from "./components/pages/resourcePosts";
import { Provider } from "react-redux";
import store from "./store";
import { Login } from "./components/pages/login";
import { Toaster } from "react-hot-toast";
import { IndividualPost } from "./components/pages/individualPost";
import SignUp from "./components/pages/signup";
import VerifyUserForm from "./components/pages/VerifyUserForm";
import ResetPassword from "./components/pages/ResetPassword";

//TODO: make signUp page
//TODO: Make user verification page
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
            <Route exact path="/teachers" component={IndividualPost} />
            <Route exact path="/forgotPassword" component={SignUp} />
            <Route
              exact
              path="/verify/:token?"
              render={(props) => <VerifyUserForm {...props} />}
            />
          </Switch>
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
