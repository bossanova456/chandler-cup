import {FormSelect, Button, Modal, ModalBody, ModalHeader} from "shards-react";
import {useState} from "react";
import MatchUpCardList from "./MatchUpCardList";

import {matchUpData} from "../MatchUpData";
import {pickData} from "../PickData";
import {teamData} from "../TeamData";
import AddMatchUpModal from "./AddMatchUpModal";

function MatchUpCardListContainer() {
  const [ selectedPlayer, setSelectedPlayer ] = useState("sharon");
  const [ weekNum, setWeekNum ] = useState(0);
  const [ selectedWeekMatchUps, setSelectedWeekMatchUps ] = useState(matchUpData.filter(function(matchUpsByWeek) {
    return matchUpsByWeek.weekNum === weekNum;
  })[0]);
  const [ showAddMatchUpModal, setShowAddMatchUpModal ] = useState(false);

  function selectWeek(targetWeekNum) {
    setWeekNum(targetWeekNum);
    setSelectedWeekMatchUps(matchUpData.filter(function(matchUpsByWeek) {
      return matchUpsByWeek.weekNum === targetWeekNum;
    })[0]);
  }

  function toggleModal() {
    setShowAddMatchUpModal(!showAddMatchUpModal);
  }

  function addMatchUp(favoredTeamId, underdogTeamId) {
    selectedWeekMatchUps.matchUps = [
      ...selectedWeekMatchUps.matchUps,
      {
        "matchUpId": "" + weekNum + selectedWeekMatchUps.matchUps.length,
        "favoredTeamId": favoredTeamId,
        "underdogTeamId": underdogTeamId,
        "game_start_ts": "01-01-1970 00:00:00.000"
      }
    ];

    console.log("New match ups:");
    console.log(selectedWeekMatchUps);
  }

  return (
    <div>
      <FormSelect
        size="md"
        onChange={(event) => {
          selectWeek(parseInt(event.target.value));
        }}
      >
        {
          [...Array(16).keys()].map(function (weekNumOption) {
            return (
              <option
                value={weekNumOption}
                disabled={!matchUpData.find(function (matchUp) {
                  return matchUp.weekNum === weekNumOption;
                })}
              >
                Week {weekNumOption+1}
              </option>
            )
          })
        }
      </FormSelect>
      <Button
        size="md"
        onClick={() => toggleModal()}
      >
        Add Match Up
      </Button>
      <AddMatchUpModal
        showModal={showAddMatchUpModal}
        weekNum={weekNum}
        toggleModal={toggleModal}
        selectedWeekMatchUps={selectedWeekMatchUps}
        teamData={teamData}
        addMatchUp={addMatchUp}
      />
      {
        pickData.map(function (player) {
          return <MatchUpCardList
            player={player}
            weekNum={weekNum}
            selectedWeekMatchUps={selectedWeekMatchUps}
            teamData={teamData}
          />
        })
      }
    </div>
  );
}

export default MatchUpCardListContainer;