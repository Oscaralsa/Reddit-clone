import React, { useState } from "react";
import { Button } from "react-bootstrap";

import BasicModal from "../../components/Modal/BasicModal";
import SignForm from "../../components/SignForm";

import "./Home.scss";

export default function Home(props: { setRefreshCheckLogin: React.Dispatch<React.SetStateAction<boolean>>; }) {

  const { setRefreshCheckLogin } = props;

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

  return (
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
              setRefreshCheckLogin={setRefreshCheckLogin}
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
              setRefreshCheckLogin={setRefreshCheckLogin}
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
  );
}
