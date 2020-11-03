import React, {useState, useEffect} from "react";

import { getUsersPostApi } from "../../../api/users";
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

import DateHelper from "../../../utils/date";
import "./RedditPost.scss";
import { IRedditPostProps } from "../../../interfaces/props_interfaces";
import { IUserData } from "../../../interfaces/global_interfaces";

function RedditPost(props: IRedditPostProps) {
  const { post } = props;

  const[user, setUser] = useState<IUserData>({
    birth_date:  "",
    email:  "",
    _id:  "",
    ubication:  "",
    user_name:  "",
    avatar:  "",
    biography:  "",
    web_url:  "",
    banner:  "",
  })

  useEffect(() => {
    getUsersPostApi(post.userId).then((response) => {
      setUser(response);
    });
  }, [post]);

  return (
    <div className="card-post">
      <Row>
        <Col xs={1} className="card-post__left">
          <div className="card-post__left__buttons">
            <span className="card-post__left__buttons__up">
              <FontAwesomeIcon icon={faArrowUp} />
            </span>
            <div className="card-post__left__buttons__votes">{post.likes}</div>
            <span className="card-post__left__buttons__down">
              <FontAwesomeIcon icon={faArrowDown} />
            </span>
          </div>
        </Col>
        <Col xs={11} className="card-post__body">
          <div className="card-post__body__header">
            {user.avatar ?
              <img src={user.avatar} alt="logo" />
              : <img src={RedditChar} alt="logo" />}
            <p className="card-post__body__header__user">r/{user.user_name}</p>
            <p className="card-post__body__header__separator">
              • Posted by {user.user_name} {DateHelper(new Date(post.date))}
            </p>
          </div>
          <h5>{post.title}</h5>
          <h4>
            {post.body}
          </h4>

          <div className="card-post__body__image">
            <img src={post.multimedia} alt="posts" />
          </div>


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
