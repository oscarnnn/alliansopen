import React, { Component } from "react";
import {
  Switch,
  Route,
  withRouter
} from "react-router-dom";

import Toolbar from "./components/Toolbar/Toolbar";
import SideDrawer from "./components/SideDrawer/SideDrawer";
import Backdrop from "./components/BackDrop/BackDrop";
import Leaderboard from "./components/Score/Leaderboard";
import Competitions from "./components/Competitions/Competitions";
import Competitors from "./components/Competitors/Competitors";
import Home from "./components/Home/Home";

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
    this.setState({ sideDrawerOpen: false });
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
      <div style={{ height: "100%",  }}>
          <Toolbar drawerClickHandler={this.drawerToggleClickHandler} />
          <SideDrawer show={this.state.sideDrawerOpen} />
          {backDrop}
          <main style={{ marginTop: "64px" }}>
            <Switch>
              <Route exact path="/" exact component={Home} />
              <Route path="/scoreboard" component={Leaderboard} />
              <Route path="/tavlingar" component={Competitions} />
              <Route path="/tavlande" component={Competitors} />
            </Switch>
          </main>
      </div>
    );
  }
}

export default withRouter(App);
