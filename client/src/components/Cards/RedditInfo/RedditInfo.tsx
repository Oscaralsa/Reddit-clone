import React from "react";

import { Col, Card, Row } from "react-bootstrap";

import "./RedditInfo.scss";

export default function RedditInfo() {
  return (
    <Card className="card-info">
      <Row>
        <Col xs={6} className="card-info__left" style={{ paddingLeft: "9%" }}>
          <p>Help</p>
          <p>Reddit App</p>
          <p>Reddit Coins</p>
          <p>Reddit Premium</p>
          <p>Reddit Gifts</p>
          <p>Communities</p>
          <p>Rereddit</p>
          <p>Top Posts</p>
          <p>Topics</p>
        </Col>
        <Col xs={6} className="card-info__right" style={{ paddingLeft: "0" }}>
          <p>About</p>
          <p>Careers</p>
          <p>Press</p>
          <p>Advertise</p>
          <p>Blog</p>
          <p>Terms</p>
          <p>Content Policy</p>
          <p>Privacy Policy</p>
          <p>Mod Policy</p>
        </Col>
      </Row>
      <h5>Reddit Clone 2020. All rights reserved for Reddit ©</h5>
    </Card>
  );
}
