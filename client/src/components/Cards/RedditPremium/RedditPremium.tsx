import React from "react";

import { Col, Card, Row, Button } from "react-bootstrap";
import OrangeShield from "../../../assets/images/orange-shield.png";

import "./RedditPremium.scss";

export default function RedditPremium() {
  return (
    <Card className="card-premium">
      <Row>
        <Col xs={2} className="card-premium__logo">
          <img src={OrangeShield} alt="logo" />
        </Col>
        <Col xs={6} className="card-premium__body">
          <Card.Body>
            <p>Reddit Premium</p>
            <h6>The best Reddit experience, with monthly Coins</h6>
          </Card.Body>
        </Col>
        <Col xs={3} className="card-premium__button">
          <Button>TRY NOW</Button>
        </Col>
      </Row>
    </Card>
  );
}
