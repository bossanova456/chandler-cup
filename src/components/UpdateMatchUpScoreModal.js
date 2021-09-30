import {Button, FormInput, Modal, ModalBody, ModalHeader} from "shards-react";
import React, {useState} from "react";

function UpdateMatchUpScoreModal({
  showModal,
  toggleModal
}) {
  return (
    <Modal open={showModal} toggle={toggleModal}>
      <ModalHeader>Update Score</ModalHeader>
    </Modal>
  );
}

export default UpdateMatchUpScoreModal;
