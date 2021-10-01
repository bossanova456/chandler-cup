import {Button, FormCheckbox, FormInput, Modal, ModalBody, ModalFooter, ModalHeader} from "shards-react";
import React from "react";

function UpdateMatchUpScoreModal({
  showModal,
  toggleModal,
  matchUpScoreId,
  updateScore
}) {
  let favoredTeamScore = 0, underdogTeamScore = 0, isFinal = false;

  return (
    <Modal open={showModal} toggle={toggleModal}>
      <ModalHeader>{"Update Score (" + matchUpScoreId + ")"}</ModalHeader>
      <ModalBody>
        <p>Favored Team Score</p>
        <FormInput
          onChange={(event) => {
            favoredTeamScore = event.target.value;
          }}
        />
        <p>Underdog Team Score</p>
        <FormInput
          onChange={(event) => {
            underdogTeamScore = event.target.value;
          }}
        />
        <p>Final Score?</p>
        <FormCheckbox
          checked={isFinal}
          onChange={(event) => {isFinal = !isFinal}}
        />
      </ModalBody>
      <ModalFooter>
        <Button
          size="sm"
          onClick={() => {
            updateScore(matchUpScoreId, favoredTeamScore, underdogTeamScore, isFinal);
            toggleModal(matchUpScoreId);
          }}
        >
          Submit
        </Button>
      </ModalFooter>
    </Modal>
  );
}

export default UpdateMatchUpScoreModal;
