import React from "react";
import { CardGroup } from "react-bootstrap";

import Axel from "./Axel";
import Putte from "./Putte";
import Jonte from "./Jonte";
import Ogge from "./Ogge";

import './Competitors.css'
const competitor = () => (
  <div
    className="competitors"
  
  >
    <CardGroup>
      <Axel />
      <Putte />
      <Jonte />
      <Ogge />
    </CardGroup>
  </div>
);

export default competitor;
