import React, { Component } from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/BackDrop/BackDrop";
import Scoreboard from "./components/Scoreboard/Scoreboard";
import Competitions from "./components/Competitions/Competitions";
import Competitors from "./components/Competitors/Competitors";

class App extends Component {
  state = {
    sideDrawerOpen: false
  };

  componentDidUpdate(prevProps) {
    if (this.props.location !== prevProps.location) {
      this.onRouteChanged();
    }
  }

  onRouteChanged() {
    this.drawerToggleClickHandler();
  }

  drawerToggleClickHandler = () => {
    this.setState(prevState => {
      return { sideDrawerOpen: !prevState.sideDrawerOpen };
    });
  };

  backdropClickHandler = () => {
    this.setState({ sideDrawerOpen: false });
  };

  render() {
    let backDrop;

    if (this.state.sideDrawerOpen) {
      backDrop = <Backdrop click={this.backdropClickHandler} />;
    }

    return (
      <div style={{ height: "100%" }}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backDrop}
          <main style={{ marginTop: "64px" }}>
            <Switch>
              <Route path="/" exact component={Home} />
              <Route path="/scoreboard" component={Scoreboard} />
              <Route path="/tavlingar" component={Competitions} />
              <Route path="/tavlande" component={Competitors} />
            </Switch>
          </main>
      </div>
    );
  }
}

const Home = () => (
  <div>
    <h1>Home</h1>
  </div>
);

export default withRouter(App);
