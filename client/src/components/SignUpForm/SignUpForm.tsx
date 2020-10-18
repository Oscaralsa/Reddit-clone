import React from "react";
import { Row, Col, Form, Button } from "react-bootstrap";
import GoogleLogo from "../../assets/images/google-logo.png";
import AppleLogo from "../../assets/images/apple-logo.png";

import "./SignUpForm.scss";

export default function SignUpForm(props: { setShowModal: any }) {
  const { setShowModal } = props;

  const onSubmit = (e: any) => {
    e.preventDefault();
    setShowModal(false);
  };

  return (
    <div className="sign-up-form">
      <Row>
        <LeftImageComponent />
        <RightComponent onSubmit={onSubmit} />
      </Row>
    </div>
  );
}

function LeftImageComponent() {
  return (
    <Col className="sign-up-form__left" xs={2}>
      {" "}
    </Col>
  );
}

function RightComponent(props: { onSubmit: any }) {
  const { onSubmit } = props;
  return (
    <Col className="sign-up-form__right" xs={5}>
      <h4>Sign up</h4>
      <p>
        By continuing, you agree to our <a href="/#">User Agreement</a> and{" "}
        <a href="/#">Privacy Policy</a>
      </p>

      <div className="sign-up-form__right__options">
        <Button type="submit" variant="outline-primary">
          <img
            src={GoogleLogo}
            alt="Google logo"
            style={{
              width: "20px",
              height: "20px",
              backgroundColor: "white",
              left: "-30px",
              position: "relative",
            }}
          />
          CONTINUE WITH GOOGLE
        </Button>
        <Button type="submit" variant="outline-primary">
        <img
            src={AppleLogo}
            alt="Google logo"
            style={{
              width: "22px",
              height: "22px",
              backgroundColor: "white",
              left: "-35px",
              position: "relative",
            }}
          />
          CONTINUE WITH APPLE
        </Button>
      </div>

      <div className="sign-up-form__right__divider">
        <span className="sign-up-form__right__divider__Line"></span>
        <span className="sign-up-form__right__divider__Text">OR</span>
        <span className="sign-up-form__right__divider__Line"></span>
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control type="email" placeholder="EMAIL" />
            </Col>
          </Row>
        </Form.Group>

        <div className="sign-up-form__right__final">
          <Button type="submit" variant="primary">
            CONTINUE
          </Button>
        </div>

        <p style={{ paddingTop: "10px" }}>
          Already a redditor?{" "}
          <a href="/#" style={{ fontWeight: "bold" }}>
            LOG IN
          </a>
        </p>
      </Form>
    </Col>
  );
}
