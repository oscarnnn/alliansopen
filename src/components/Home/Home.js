import React from "react";
import { Image } from "react-bootstrap";

import "./Home.css";

const home = () => (
  <div className="home">
    <h1>Allians Max Tour 2020</h1>
    <p>
      Sveriges sämsta fyrboll styr upp en trevlig sommartour. Upplägget är
      enkelt, som Allians Max medlem har man tillgång till 4 banor i Västra
      Götaland. Touren kommer gå ut på att dessa banor spelas en gång var och
      spelarna ska samla så mycket poäng under dessa rundor. Den totala poängen
      kommer räknas ut och den med mest poäng tar hem vinsten!
    </p>
    <br></br>
    <p>Banor som ingår i Touren:</p>
    <ul>
      <li>Hulta GK</li>
      <li>Torrekulla GK</li>
      <li>Sisjö GK</li>
      <li>WoG Korthålsbana</li>
    </ul>
    <Image src={require("../../assets/Frontpage/Golfball.jpg")} fluid rounded />
  </div>
);

export default home;
