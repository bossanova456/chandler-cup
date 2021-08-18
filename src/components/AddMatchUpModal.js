import {Button, Modal, ModalBody, ModalHeader} from "shards-react";
import {useState} from "react";
import AddMatchUpModalDropDown from "./AddMatchUpModalDropDown";

function AddMatchUpModal({
  showModal,
  toggleModal,
  weekNum,
  selectedWeekMatchUps,
  teamData,
  addMatchUp
}) {
  const [ addMatchUpFavoredTeam, setAddMatchUpFavoredTeam ] = useState();
  const [ addMatchUpUnderdogTeam, setAddMatchUpUnderdogTeam ] = useState();

  return (
    <Modal open={showModal} toggle={toggleModal}>
      <ModalHeader>Add Match Up To Week {weekNum+1}</ModalHeader>
      <ModalBody>
        <p>Select Favored Team</p>
        <AddMatchUpModalDropDown
          teamData={teamData}
          defaultTeam={teamData[0]}
          setAddMatchUpTeam={setAddMatchUpFavoredTeam}
        />
        <p>Select Underdog Team</p>
        <AddMatchUpModalDropDown
          teamData={teamData}
          defaultTeam={teamData[1]}
          setAddMatchUpTeam={setAddMatchUpUnderdogTeam}
        />
        <Button
          size="sm"
          onClick={() => {
            addMatchUp(addMatchUpFavoredTeam, addMatchUpUnderdogTeam);
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