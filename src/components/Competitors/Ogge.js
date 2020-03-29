import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const ogge = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Ogge.png")}
    />
    <Card.Body>
      <Card.Title>Oscar Nilsson</Card.Title>
      <Card.Text>Självutnämnd coach, han har ungefär 1000 timmar av erfarenhet från Youtube.</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Kungen av slice</ListGroupItem>
      <ListGroupItem>Tjötar alltid om nya klubbor</ListGroupItem>
      <ListGroupItem>Älskar att leta boll</ListGroupItem>
    </ListGroup>
  </Card>
);

export default ogge;