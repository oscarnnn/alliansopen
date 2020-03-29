import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const jonte = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Jonte.png")}
    />
    <Card.Body>
      <Card.Title>Jonathan Karrin</Card.Title>
      <Card.Text>Greenguden! Finns inga puttar eller chippar som är svåra för Jon.</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Innehar sveriges dyraste putter</ListGroupItem>
      <ListGroupItem>Älskar att chippa</ListGroupItem>
      <ListGroupItem>Kungen av mulligans</ListGroupItem>
    </ListGroup>
  </Card>
);

export default jonte;