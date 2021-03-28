import React from "react";
import { Switch, Route } from "react-router-dom";

import { IndividualPost } from "./components/pages/individualPost";
import { Login } from "./components/pages/login";
import { ResourcePosts } from "./components/pages/resourcePosts";
import SignUp from "./components/pages/signup";
import VerifyUserForm from "./components/pages/VerifyUserForm";
import CreatePost from "./components/pages/posts/createPost";
import ResetPassword from "./components/pages/ResetPassword";
import ForgotPassPage from "./components/pages/ForgotPassword/ForgotPassPage";
import SetNewPassPage from "./components/pages/ForgotPassword/SetNewPassPage";
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
      <Route exact path='/signup' component={SignUp} />
      <Route
        exact
        path='/verify/:token?'
        render={(props) => <VerifyUserForm {...props} />}
      />
      <Route exact path='/resetPassword' component={ResetPassword} />
      <Route exact path='/forgotPassword' component={ForgotPassPage} />
      <Route exact path='/setNewPassword' component={SetNewPassPage} />
      <Route exact path='/createPost' component={CreatePost} />
    </Switch>
  );
};

export default Routes;
