import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const putte = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Putte.png")}
    />
    <Card.Body>
      <Card.Title>Patrick Marklund</Card.Title>
      <Card.Text>Finns bara ett ord för denna man, Kungen.</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Slår typ 300m med sin hybrid</ListGroupItem>
      <ListGroupItem>Dåligt temperament</ListGroupItem>
      <ListGroupItem>Bra prutt</ListGroupItem>
    </ListGroup>
  </Card>
);

export default putte;