import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const ludde = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Ludde.png")}
    />
    <Card.Body>
      <Card.Title>Ludvig Andersson</Card.Title>
      <Card.Text>HYBRIDEN! Mannen som spelar lika bra med vänster som högerklubbor</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Sveriges högsta handikapp</ListGroupItem>
      <ListGroupItem>Enda svensk som kan slå med en järntrea</ListGroupItem>
      <ListGroupItem>Tar längre tid från parkeringen till första tee än att spela 18 hål</ListGroupItem>
    </ListGroup>
  </Card>
);

export default ludde;