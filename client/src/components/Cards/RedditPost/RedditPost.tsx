import React from "react";

import { Col, Row } from "react-bootstrap";

import RedditChar from "../../../assets/images/character.png";

import "./RedditPost.scss";

function RedditPost(props: any) {
  return (
    <div className="card-post">
      <Row>
        <Col xs={1} className="card-post__left">
          <p>Holsa</p>
        </Col>
        <Col xs={11} className="card-post__body">
          <div className="card-post__body__header">
            <img src={RedditChar} alt="logo" />
            <p className="card-post__body__header__user">reddit user</p>
            <p className="card-post__body__header__separator">• Posted by user 10 hours ago</p>
          </div>
          <h5>The best Reddit experience, with monthly Coins</h5>
          <h4>Here comes the textHere comes the textHere comes the textHere comes the textHere comes the textHere comes the textHere comes the textHere comes the text</h4>
        </Col>
      </Row>
    </div>
  );
}

export default RedditPost;
