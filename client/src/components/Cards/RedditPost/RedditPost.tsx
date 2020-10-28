import React from "react";

import { Col, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowDown,
  faArrowUp,
  faComment,
  faGift,
  faSave,
  faShare,
} from "@fortawesome/free-solid-svg-icons";
import RedditChar from "../../../assets/images/character.png";

import "./RedditPost.scss";

function RedditPost(props: any) {
  return (
    <div className="card-post">
      <Row>
        <Col xs={1} className="card-post__left">
          <div className="card-post__left__buttons">
            <span className="card-post__left__buttons__up">
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
            <div className="card-post__left__buttons__votes">122</div>
            <span className="card-post__left__buttons__down">
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </div>
        </Col>
        <Col xs={11} className="card-post__body">
          <div className="card-post__body__header">
            <img src={RedditChar} alt="logo" />
            <p className="card-post__body__header__user">reddit user</p>
            <p className="card-post__body__header__separator">
              • Posted by user 10 hours ago
            </p>
          </div>
          <h5>The best Reddit experience, with monthly Coins</h5>
          <h4>
            Here comes the textHere comes the textHere comes the textHere comes
            the textHere comes the textHere comes the textHere comes the
            textHere comes the text
          </h4>

          <div className="card-post__body__footer">
            <div className="card-post__body__footer__comments">
              <FontAwesomeIcon icon={faComment} /><p>36 Comments</p>
            </div>
            <div className="card-post__body__footer__others">
              <FontAwesomeIcon icon={faGift} /><p>Give Award</p>
            </div>
            <div className="card-post__body__footer__others__small">
              <FontAwesomeIcon icon={faShare} /><p>Share</p>
            </div>
            <div className="card-post__body__footer__others__small">
              <FontAwesomeIcon icon={faSave} /><p>Save</p>
            </div>
          </div>
        </Col>
      </Row>
    </div>
  );
}

export default RedditPost;
