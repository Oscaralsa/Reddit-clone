import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BasicModal from "../../components/Modal/BasicModal";
import SignUpForm from "../../components/SignUpForm";

import "./Home.scss";

export default function Home() {
  const [showModal, setShowModal] = useState(false);
  const [contentModal, setContentModal] = useState(null);

  const handleModal = (content: any) => {
    setShowModal(!showModal);
    setContentModal(content);
  };

  return (
    <>
      <Button
        type="submit"
        variant="primary"
        onClick={() => handleModal(<SignUpForm setShowModal={setShowModal} />)}
      >
        Primary
      </Button>
      <BasicModal show={showModal} setShow={setShowModal}>
        {contentModal}
      </BasicModal>
    </>
  );
}
