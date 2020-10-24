import React from "react";

import { Col, Row } from "react-bootstrap";

import "./RedditPost.scss";

function RedditPost(){
  return(
    <div className="card-post">
      <Row>
        <Col xs={1} className="card-post__left">
          <p>Holsa</p>
        </Col>
        <Col xs={11} className="card-post__body">
            <p>Reddit post</p>
            <h6>The best Reddit experience, with monthly Coins</h6>
        </Col>
      </Row>
    </div>
  )
}

export default RedditPost;