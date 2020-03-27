import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const competitor = () => (
  <Card style={{ width: "18rem" }}>
    <Card.Img variant="top" src={require("./Axel.jpg")} />
    <Card.Body>
      <Card.Title>Axel Esborn</Card.Title>
      <Card.Text>
        Bra humör, bra frilla och otroligt fin spoon.
      </Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Född 1992</ListGroupItem>
      <ListGroupItem>Nike spons</ListGroupItem>
      <ListGroupItem>Kallas Dr.Hook</ListGroupItem>
    </ListGroup>
  </Card>
);

export default competitor;