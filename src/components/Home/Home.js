import React from "react";
import { Image, Card } from "react-bootstrap";

import "./Home.css";

const home = () => (
  <div className="home">
        <Image fluid src={require("../../assets/Frontpage/AMTLogo.png")} />
        <h1>Allians Max Tour 2020</h1>
        <br />
        <p>
          Sveriges sämsta fyrboll styr upp en trevlig sommartour. Upplägget är
          enkelt, som Allians Max medlem har man tillgång till 4 banor i Västra
          Götaland. Touren kommer gå ut på att dessa banor spelas en gång var
          och spelarna ska samla så mycket poäng under dessa rundor. Den totala
          poängen kommer räknas ut och den med mest poäng tar hem vinsten!
        </p>
        <p>Banor som ingår i Touren:</p>
        <ul>
          <li>Hulta GK</li>
          <li>Torrekulla GK</li>
          <li>Sisjö GK</li>
          <li>WoG Korthålsbana</li>
        </ul>
  </div>
);

export default home;
