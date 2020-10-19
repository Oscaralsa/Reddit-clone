import React from "react";
import { Modal } from "react-bootstrap";
import { IBasicFormProps } from "../../../interfaces/posps_interfaces";

import "./BasicModal.scss";

export default function BasicModal(props: IBasicFormProps) {
  const { show, setShow, children, titleModal, footerModal, showFooterModal, showTitleModal } = props;

  return (
    <Modal
      className="basic-modal"
      show={show}
      onHide={() => setShow(false)}
      centered
      size="lg"
    >
      {showTitleModal ? (
        <Modal.Header>
          <Modal.Title>{titleModal}</Modal.Title>
        </Modal.Header>
      ) : (
        ""
      )}

      <Modal.Body>{children}</Modal.Body>

      {showFooterModal ? (
        <Modal.Footer
          style={{
            backgroundColor: "#f8f9fa",
            padding: "0.25rem",
            
          }}
        >
          {footerModal}
        </Modal.Footer>
      ) : (
        ""
      )}
    </Modal>
  );
}
