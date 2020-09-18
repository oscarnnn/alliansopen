import React from "react";
import Iframe from "../Iframe/Iframe";

import "./Competitions.css";

const sisjon =
  "https://online.golfgamebook.com/leaderboard/2ud-ha79?iframe=true";

const torrekulla = "https://online.golfgamebook.com/leaderboard/2ue-f1w3";

const hulta = "https://online.golfgamebook.com/leaderboard/2u8-amdo";
const competitions = () => (
  <div className="competitions">
    <h6 className="header">Hulta GK</h6>
    <Iframe source={hulta}></Iframe>
    <h6 className="header">Torrekulla GK</h6>
    <Iframe source={torrekulla}></Iframe>
    <h6 className="header">Sisjö GK</h6>
    <Iframe source={sisjon}></Iframe>
  </div>
);

export default competitions;
