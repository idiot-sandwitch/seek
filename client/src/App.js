import React from "react";
import { HashRouter as Router } from "react-router-dom";
import "./App.css";
import { Header } from "./components/layout/navbar";
import { Provider } from "react-redux";
import store from "./store";

import { Toaster } from "react-hot-toast";
import Routes from "./routes";

//TODO:DONE make signUp page
//TODO:DONE Make user verification page
function App() {
  return (
    <Provider store={store}>
      <Router>
        <React.Fragment>
          <React.Fragment>
            <Toaster position='bottom-right' />
          </React.Fragment>
          <Routes />
          <Header />
        </React.Fragment>
      </Router>
    </Provider>
  );
}

export default App;
