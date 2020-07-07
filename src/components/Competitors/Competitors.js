import React from "react";
import { CardGroup } from "react-bootstrap";

import Axel from "./Axel";
import Putte from "./Putte";
import Jonte from "./Jonte";
import Ogge from "./Ogge";
import Ludde from "./Ludde";
import Ljubo from "./Ljubo";

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
      <Ludde />
      <Ljubo />
    </CardGroup>
  </div>
);

export default competitor;
