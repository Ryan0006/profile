import React, { Component } from "react";
import { Route, Redirect, Switch } from "react-router-dom";
import NotFound from "./components/notFound";
import "./App.css";
import ProfileForm from "./components/profileForm";

class App extends Component {
  state = {};

  render() {
    return (
      <React.Fragment>
        <main className="container">
          <Switch>
            <Route path="/profile" component={ProfileForm} />
            <Route path="/not-found" component={NotFound} />
            <Redirect from="/" exact to="/profile" />
            <Redirect to="/not-found" />
          </Switch>
        </main>
      </React.Fragment>
    );
  }
}

export default App;
