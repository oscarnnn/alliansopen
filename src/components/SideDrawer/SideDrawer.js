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
        <Link>
          <li>Tävlande</li>
        </Link>
        <Link>
          <li to="/scoreboard">Scoreboard</li>
        </Link>
        <Link>
          <li>Tävlingar</li>
        </Link>
      </ul>
    </nav>
  );
};

export default sideDrawer;
