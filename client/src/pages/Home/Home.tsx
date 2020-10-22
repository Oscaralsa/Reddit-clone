import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BasicModal from "../../components/Modal/BasicModal";
import SignForm from "../../components/SignForm";

import BasicLayout from "../../layouts/BasicLayout";

import { connect } from 'react-redux';

import "./Home.scss";

function Home(props: any) {

  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(<></>);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [titleModal, setTitleModal] = useState(<></>);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const [footerModal, setFooterModal] = useState(<></>);

  const handleModal = (content: JSX.Element) => {
    setShowModal(!showModal);
    setShowTitleModal(false);
    setTitleModal(<></>);
    setShowFooterModal(false);
    setFooterModal(<></>);
    setContentModal(content);
  };

  console.log(props)
  if(props.user.user_name){
    console.log("Logeado")
  }
  return (
    <BasicLayout>
      <>
        <Button
          type="submit"
          variant="primary"
          onClick={() =>
            handleModal(
              <SignForm
                setShowModal={setShowModal}
                setTitleModal={setTitleModal}
                setFooterModal={setFooterModal}
                setShowFooterModal={setShowFooterModal}
                setShowTitleModal={setShowTitleModal}
                signUpType={true}
              />
            )
          }
        >
          Primary
        </Button>
        <Button
          type="submit"
          variant="primary"
          onClick={() =>
            handleModal(
              <SignForm
                setShowModal={setShowModal}
                setTitleModal={setTitleModal}
                setFooterModal={setFooterModal}
                setShowFooterModal={setShowFooterModal}
                setShowTitleModal={setShowTitleModal}
                signUpType={false}
              />
            )
          }
        >
          Secondary
        </Button>
        <BasicModal
          show={showModal}
          setShow={setShowModal}
          titleModal={titleModal}
          footerModal={footerModal}
          showFooterModal={showFooterModal}
          showTitleModal={showTitleModal}
        >
          {contentModal}
        </BasicModal>
      </>
    </BasicLayout>
  );
}

const mapStateToProps = (state: { user: any; token: string }, props: any) => ({
  ...props,
  user: state.user,
  token: state.token
});

export default connect(mapStateToProps)(Home)