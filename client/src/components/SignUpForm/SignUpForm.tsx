import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, FormControl } from "react-bootstrap";
import GoogleLogo from "../../assets/images/google-logo.png";
import AppleLogo from "../../assets/images/apple-logo.png";

import "./SignUpForm.scss";
import { ISignUpData } from "../../interfaces/global_interfaces";
import { signUpApi } from "../../api/auth";
import 
{ 
  ISignUpFormProps, 
  ISignUpFormRightProps, 
  IBasicModalFooterProps, 
  IFinalSignUpProps,
  IFirstSignUpProps
 } from "../../interfaces/posps_interfaces";

export default function SignUpForm(props: ISignUpFormProps) {
  const {
    setShowModal,
    setTitleModal,
    setFooterModal,
    setShowFooterModal,
    setShowTitleModal,
  } = props;

  const [showFinalStep, setShowFinalStep] = useState(false);

  const [signUpData, setSignUpData] = useState<ISignUpData>({
    user_name: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setFooterModal(
      <ModalFooter handleBack={handleBack} onSubmit={onSubmitFinal} />
    );
  });

  const onSubmitFinal = async (e: any) => {
    e.preventDefault();
    console.log(signUpData);
    if (
      signUpData.user_name !== "" ||
      signUpData.email !== "" ||
      signUpData.password.length >= 8
    ) {
      const response = await signUpApi(signUpData);
      console.log(response);

      setShowModal(false);
    }
  };

  const handleBack = () => {
    setTitleModal(<></>);
    setFooterModal(<></>);
    setShowTitleModal(false);
    setShowFooterModal(false);
    setShowFinalStep(false);
  };

  const onSubmitFirst = (e: any) => {
    e.preventDefault();
    setTitleModal(<ModalTitle />);
    setFooterModal(
      <ModalFooter handleBack={handleBack} onSubmit={onSubmitFinal} />
    );
    setShowFooterModal(true);
    setShowTitleModal(true);
    setShowFinalStep(true);
  };

  console.log(signUpData);
  return (
    <div className="sign-up-form">
      <Row>
        {!showFinalStep ? <LeftImageComponent /> : ""}
        <RightComponent
          onSubmit={onSubmitFirst}
          showFinalStep={showFinalStep}
          signUpData={signUpData}
          setSignUpData={setSignUpData}
        />
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

function RightComponent(props: ISignUpFormRightProps) {
  const {
    onSubmit,
    showFinalStep,
    signUpData,
    setSignUpData,
  } = props;
  return !showFinalStep ? (
    <FisrtSignUp
      onSubmit={onSubmit}
      signUpData={signUpData}
      setSignUpData={setSignUpData}
    />
  ) : (
    <FinalSignUp signUpData={signUpData} setSignUpData={setSignUpData} />
  );
}

function FisrtSignUp(props: IFirstSignUpProps) {
  const { onSubmit, signUpData, setSignUpData } = props;
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
              <Form.Control
                type="email"
                placeholder="EMAIL"
                value={signUpData.email}
                onChange={(e) =>
                  setSignUpData({ ...signUpData, email: e.target.value })
                }
              />
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

function FinalSignUp(props: IFinalSignUpProps) {
  const { signUpData, setSignUpData } = props;

  return (
    <>
      <Col className="sign-up-form__final" xs={6}>
        <Row>
          <Col>
            <FormControl
              type="text"
              placeholder="CHOOSE A USERNAME"
              value={signUpData.user_name}
              onChange={(e) =>
                setSignUpData({ ...signUpData, user_name: e.target.value })
              }
            />
          </Col>
        </Row>
        <Row>
          <Col>
            <FormControl
              type="password"
              placeholder="PASSWORD"
              value={signUpData.password}
              onChange={(e) =>
                setSignUpData({ ...signUpData, password: e.target.value })
              }
            />
          </Col>
        </Row>
      </Col>

      <Col className="sign-up-form__final" xs={1} />

      <Col className="sign-up-form__sug" xs={5}>
        <p>Here are some username suggestions</p>
        <a href="/#" onClick={() => setSignUpData({ ...signUpData, user_name: "The_best123" })}>The_best123</a>
        <a href="/#" onClick={() => setSignUpData({ ...signUpData, user_name: "Test123" })}>Test123</a>
        <a href="/#" onClick={() => setSignUpData({ ...signUpData, user_name: "Prox123" })}>Prox123</a>
        <a href="/#" onClick={() => setSignUpData({ ...signUpData, user_name: "Turtle123" })}>Turtle123</a>
        <a href="/#" onClick={() => setSignUpData({ ...signUpData, user_name: "Skylinep" })}>Skylinep</a>
      </Col>
    </>
  );
}

function ModalTitle() {
  return (
    <div className="modal-title">
      <h3>Choose your user_name</h3>
      <p>
        Your user_name is how other community members will see you. This name
        will be used to credit you for things you share on Reddit. What should
        we call you?
      </p>
    </div>
  );
}

function ModalFooter(props: IBasicModalFooterProps) {
  const { handleBack, onSubmit } = props;
  return (
    <>
      <a href="/#" onClick={handleBack}>
        Back
      </a>
      <Button type="button" variant="primary" onClick={onSubmit}>
        SIGN UP
      </Button>
    </>
  );
}
