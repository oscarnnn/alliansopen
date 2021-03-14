import React from "react";
import { Link } from "react-router-dom";

import "../SideDrawer/DrawerToggleButton";
import "./Toolbar.css";
import DrawerToggleButton from "../SideDrawer/DrawerToggleButton";

const toolbar = props => (
  <header className="toolbar">
    <nav className="toolbar__navigation">
      <div className="toolbar__toggle-button">
        <DrawerToggleButton click={props.drawerClickHandler} />
      </div>
      <div className="toolbar__logo">
        <a href="/">The Shaft-Shank Redemption 2021</a>
      </div>
      <div className="spacerTab"></div>
      <div className="toolbar_navigation-items">
        <ul>
          <Link to="/tavlande">
            <li>Tävlande</li>
          </Link>
          <Link to="/tavlingar">
            <li>Tävlingar</li>
          </Link>
          <Link to="/scoreboard">
            <li>Poängställning</li>
          </Link>
          <Link to="/2020">
            <li>2020</li>
          </Link>
        </ul>
      </div>
    </nav>
  </header>
);

export default toolbar;
