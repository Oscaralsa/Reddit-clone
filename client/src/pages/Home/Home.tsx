import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";

import "./Home.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);
  const [showTitleModal, setShowTitleModal] = useState(false);
  const [titleModal, setTitleModal] = useState(<></>);
  const [showFooterModal, setShowFooterModal] = useState(false);
  const [footerModal, setFooterModal] = useState(<></>);

  const handleModal = (content: any) => {
    setShowModal(!showModal);
    setShowTitleModal(false)
    setTitleModal(<></>)
    setShowFooterModal(false)
    setFooterModal(<></>)
    setContentModal(content);
  };

  return (
    <>
      <Button
        type="submit"
        variant="primary"
        onClick={() =>
          handleModal(
            <SignUpForm
              setShowModal={setShowModal}
              setTitleModal={setTitleModal}
              setFooterModal={setFooterModal}
              setShowFooterModal={setShowFooterModal}
              setShowTitleModal={setShowTitleModal}
            />
          )
        }
      >
        Primary
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
  );
}
