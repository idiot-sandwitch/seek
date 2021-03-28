import React from "react";
import { Switch, Route } from "react-router-dom";

import { IndividualPost } from "./components/pages/individualPost";
import { Login } from "./components/pages/login";
import { ResourcePosts } from "./components/pages/resourcePosts";
import SignUp from "./components/pages/signup";
import VerifyUserForm from "./components/pages/VerifyUserForm";

const Routes = () => {
  return (
    <Switch>
      <Route exact path='/resources' component={ResourcePosts} />
      <Route exact path='/login' component={Login} />
      <Route
        exact
        path='/post/:id?'
        render={(props) => <IndividualPost {...props} />}
      />
      <Route exact path='/forgotPassword' component={SignUp} />
      <Route
        exact
        path='/verify/:token?'
        render={(props) => <VerifyUserForm {...props} />}
      />
    </Switch>
  );
};

export default Routes;
