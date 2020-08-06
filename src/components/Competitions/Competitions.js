import React from "react";
import Iframe from "../Iframe/Iframe";

import "./Competitions.css";

const sisjon =
  "https://online.golfgamebook.com/leaderboard/2ud-ha79?iframe=true";

  const competitions = () => (
  <div className="competitions">
    <Iframe source={sisjon}></Iframe>
  </div>
);

export default competitions;
