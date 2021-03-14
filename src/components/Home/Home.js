import React from "react";
import { Image } from "react-bootstrap";
import "./Home.css";

const home = () => (
  <div className="home">
    <div className="home">
      <h1>Välkommen till Shaft-Shank Redemption 2021!</h1>
      <Image fluid src={require("../../assets/Frontpage/AMTLogo.png")} />
    </div>
    <div>
      <br />
      <p>
        Shaft-Shank Redemption är en trött liten tour som några av göteborgs sämsta golflirare dragit igång. Vi körde år 2020 och det var riktigt sköj, så vi kör i år igen. Upplägget är enkelt, vi spelar 18 hål på Hulta, Torrekulla och Sisjön. Den spelare som lyckas kamma ihop mest poäng vinner den ärofyllda och mycket fina vandringspokalen, som just nu står i mästaren Oscars lägenhet och glänser!
      </p>
      <p>Banor som ingår i Touren:</p>
      <ul>
        <li>Hulta GK</li>
        <li>Torrekulla GK</li>
        <li>Sisjö GK</li>
      </ul>
    </div>
  </div>
);

export default home;
