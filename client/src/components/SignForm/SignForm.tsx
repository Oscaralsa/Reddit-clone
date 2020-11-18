import React, { useState, useEffect } from "react";
import { Row, Col, Form, Button, FormControl } from "react-bootstrap";
import GoogleLogo from "../../assets/images/google-logo.png";
import AppleLogo from "../../assets/images/apple-logo.png";
import { AnyAction, bindActionCreators, Dispatch } from 'redux';
import { connect } from 'react-redux';

import "./SignForm.scss";
import { ISignUpData, ILoginData } from "../../interfaces/global_interfaces";
import { signUpApi, loginApi, setTokenApi, getUserData } from "../../api/auth";
import { setUser } from "../../actions/authAction"
import {
  ISignUpFormProps,
  ISignFormRightProps,
  IBasicModalFooterProps,
  IFinalSignUpProps,
  IFirstSignUpProps,
  ILoginProps,
} from "../../interfaces/props_interfaces";

function SignForm(props: ISignUpFormProps) {
  const {
    setShowModal,
    setTitleModal,
    setFooterModal,
    setShowFooterModal,
    setShowTitleModal,
    setUser
  } = props;

  const [signUpType, setSignUpType] = useState<boolean>(props.signUpType);
  const [showFinalStep, setShowFinalStep] = useState<boolean>(false);
  const [signUpData, setSignUpData] = useState<ISignUpData>({
    user_name: "",
    email: "",
    password: "",
  });
  const [loginData, setLoginData] = useState<ILoginData>({
    user_name: "",
    password: "",
  });

  useEffect(() => {
    setFooterModal(
      <ModalFooter handleBack={handleBack} onSubmit={onSubmitFinal} />
    );
  });

  const handleBack = () => {
    setTitleModal(<></>);
    setFooterModal(<></>);
    setShowTitleModal(false);
    setShowFooterModal(false);
    setShowFinalStep(false);
  };

  const onSubmitFinal = async (e: any) => {
    e.preventDefault();
    if (
      signUpData.user_name !== "" ||
      signUpData.email !== "" ||
      signUpData.password.length >= 6
    ) {
      const response = await signUpApi(signUpData);
      setUser(getUserData(response), response)
      setShowModal(false);
      
    }
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

  const onSubmitLogin = async (e: any) => {
    console.log(loginData)
    e.preventDefault();
    if (
      loginData.user_name !== "" ||
      loginData.password.length >= 6
    ) {
      const response = await loginApi(loginData);
      console.log(response);

      if(response.token) {
        setTokenApi(response.token)
        window.location.reload();
        setShowModal(false);
      }
    }
  };

  return (
    <div className="sign-up-form">
      <Row>
        {!showFinalStep ? <LeftImageComponent /> : ""}
        <RightComponent
          onSubmit={onSubmitFirst}
          showFinalStep={showFinalStep}
          signUpData={signUpData}
          setSignUpData={setSignUpData}
          loginData={loginData}
          setLoginData={setLoginData}
          signUpType={signUpType}
          onSubmitLogin={onSubmitLogin}
          setSignUpType={setSignUpType}
        />
      </Row>
    </div>
  );
}

function LeftImageComponent() {
  return (
    <Col className="sign-up-form__left" xs={2} />
  );
}

function RightComponent(props: ISignFormRightProps) {
  const {
    onSubmit,
    showFinalStep,
    signUpData,
    setSignUpData,
    loginData,
    setLoginData,
    signUpType,
    onSubmitLogin,
    setSignUpType,
  } = props;
  return signUpType ? (
    !showFinalStep ? (
      <FistSignUp
        onSubmit={onSubmit}
        signUpData={signUpData}
        setSignUpData={setSignUpData}
        setSignUpType={setSignUpType}
      />
    ) : (
      <FinalSignUp signUpData={signUpData} setSignUpData={setSignUpData} />
    )
  ) : (
    <LoginComponent
      onSubmit={onSubmitLogin}
      loginData={loginData}
      setLoginData={setLoginData}
      setSignUpType={setSignUpType}
    />
  );
}

function FistSignUp(props: IFirstSignUpProps) {
  const { onSubmit, signUpData, setSignUpData, setSignUpType } = props;
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
        <span className="sign-up-form__right__divider__Line"/>
        <span className="sign-up-form__right__divider__Text">OR</span>
        <span className="sign-up-form__right__divider__Line"/>
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
          <a
            href="/#"
            style={{ fontWeight: "bold" }}
            onClick={() => setSignUpType(false)}
          >
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

function LoginComponent(props: ILoginProps) {
  const { onSubmit, loginData, setLoginData, setSignUpType } = props;
  return (
    <Col className="sign-up-form__right" xs={5}>
      <h4>Login</h4>
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
        <span className="sign-up-form__right__divider__Line"/>
        <span className="sign-up-form__right__divider__Text">OR</span>
        <span className="sign-up-form__right__divider__Line"/>
      </div>

      <Form onSubmit={onSubmit}>
        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="text"
                placeholder="USERNAME"
                value={loginData.user_name}
                onChange={(e) =>
                  setLoginData({ ...loginData, user_name: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>

        <Form.Group>
          <Row>
            <Col>
              <Form.Control
                type="password"
                placeholder="PASSWORD"
                value={loginData.password}
                onChange={(e) =>
                  setLoginData({ ...loginData, password: e.target.value })
                }
              />
            </Col>
          </Row>
        </Form.Group>

        <div className="sign-up-form__right__final">
          <Button type="submit" variant="primary">
            LOG IN
          </Button>
        </div>

        <p style={{ paddingTop: "10px" }}>
          New in reddit?{" "}
          <a
            href="/#"
            style={{ fontWeight: "bold" }}
            onClick={() => setSignUpType(true)}
          >
            SIGN UP
          </a>
        </p>
      </Form>
    </Col>
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

const mapDispatchToProps = (dispatch: Dispatch<AnyAction>) => bindActionCreators(
  {
    setUser: setUser
  },
  dispatch,
);

export default connect(null, mapDispatchToProps)(SignForm);