import React from "react";
import { Link } from "react-router-dom";

import "./SideDrawer.css";

const sideDrawer = props => {
  let drawerClasses = ["side-drawer"];
  if (props.show) {
    drawerClasses = ["side-drawer open"];
  }
  return (
    <nav className={drawerClasses}>
      <ul>
          <Link to="/tavlande">
            <li>Tävlande</li>
          </Link>
          <Link to="/scoreboard">
            <li>Scoreboard</li>
          </Link>
          <Link to="/tavlingar">
            <li>Tävlingar</li>
          </Link>
        </ul>
    </nav>
  );
};

export default sideDrawer;
