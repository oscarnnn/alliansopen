import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const axel = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Acke.png")}
    />
    <Card.Body>
      <Card.Title>Axel Esborn</Card.Title>
      <Card.Text>Bra humör, bra frilla och otroligt fin spoon.</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Spelat sen han va 12</ListGroupItem>
      <ListGroupItem>Nike spons</ListGroupItem>
      <ListGroupItem>Kallas Captain Hook</ListGroupItem>
    </ListGroup>
  </Card>
);

export default axel;
