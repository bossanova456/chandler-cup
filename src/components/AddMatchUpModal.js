import {Button, Modal, ModalBody, ModalHeader} from "shards-react";
import {useState} from "react";
import AddMatchUpModalDropDown from "./AddMatchUpModalDropDown";

function AddMatchUpModal({
  showModal,
  toggleModal,
  weekNum,
  currentMatchUps,
  teamData,
  addMatchUpById
}) {
  // TODO: Properly select defaults based on available teams
  const defaultFavoredTeamId = teamData[20].teamId;
  const defaultUnderdogTeamId = teamData[21].teamId;
  const [ addMatchUpFavoredTeamId, setAddMatchUpFavoredTeamId ] = useState(defaultFavoredTeamId);
  const [ addMatchUpUnderdogTeamId, setAddMatchUpUnderdogTeamId ] = useState(defaultUnderdogTeamId);

  return (
    <Modal open={showModal} toggle={toggleModal}>
      <ModalHeader>Add Match Up To Week {weekNum+1}</ModalHeader>
      <ModalBody>
        <p>Select Favored Team</p>
        <AddMatchUpModalDropDown
          teamData={teamData}
          currentMatchUps={currentMatchUps}
          addMatchUpTeamId={addMatchUpFavoredTeamId}
          setAddMatchUpTeamId={setAddMatchUpFavoredTeamId}
        />
        <p>Select Underdog Team</p>
        <AddMatchUpModalDropDown
          teamData={teamData}
          currentMatchUps={currentMatchUps}
          addMatchUpTeamId={addMatchUpUnderdogTeamId}
          setAddMatchUpTeamId={setAddMatchUpUnderdogTeamId}
        />
        <Button
          size="sm"
          onClick={() => {
            // TODO: Update new default teams for next time the modal is opened
            addMatchUpById(addMatchUpFavoredTeamId, addMatchUpUnderdogTeamId);
            toggleModal();
          }}
        >
          Add Match Up
        </Button>
      </ModalBody>
    </Modal>
  );
}

export default AddMatchUpModal;