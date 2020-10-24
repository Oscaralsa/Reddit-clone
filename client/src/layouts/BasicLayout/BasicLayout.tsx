import React from "react";

import { Row, Col } from "react-bootstrap";
import NavBar from "../../components/NavBar";

import "./BasicLayout.scss"

export default function BasicLayout(props: {children: JSX.Element[];}) {

  const { children } = props;
  return(
    <div className="basic-layout" >
      <NavBar />
        <div className="basic-layout__body">
          <Row>
            <Col xs={2} />
            <Col xs={5}>
              {children[0]}
            </Col>
            <Col xs={3}>
              {children[1]}
            </Col>
          </Row>
        </div>
    </ div>
  )
}



