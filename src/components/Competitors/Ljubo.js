import React from "react";
import { Card, ListGroup, ListGroupItem } from "react-bootstrap";

const ljubo = () => (
  <Card border="dark" style={{ width: "18rem" }}>
    <Card.Img
      variant="top"
      style={{
        borderRadius: "10"
      }}
      src={require("../../assets/Competitors/Ljubo.png")}
    />
    <Card.Body>
      <Card.Title>Ljubo Cvijetic</Card.Title>
      <Card.Text>Big Papa, föddes med två biceps större än Magnus Samuelssons lår.</Card.Text>
    </Card.Body>
    <ListGroup className="list-group-flush">
      <ListGroupItem>Spelat i 2 veckor men hävdar att han är natural talent</ListGroupItem>
      <ListGroupItem>Storfavorit att kamma hem hela skiten</ListGroupItem>
      <ListGroupItem>Hans största idol är såklart Gentlemanscoach John Andreas</ListGroupItem>
    </ListGroup>
  </Card>
);

export default ljubo;