import React from "react";
import { Modal } from "react-bootstrap";

import "./BasicModal.scss";

export default function BasicModal(props: { show: any; setShow: any; children: any; }) {
  const { show, setShow, children } = props;

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      {/**
       * <Modal.Header>
        <Modal.Title>
          <h3>Hola</h3>
        </Modal.Title>
      </Modal.Header>
       */}

      <Modal.Body>{children}</Modal.Body>

    </Modal>
  )
}