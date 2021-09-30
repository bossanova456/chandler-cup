import {Button} from "shards-react";
import React, {useState} from "react";

import AddMatchUpModal from "./AddMatchUpModal";
import SelectWeekDropDown from "./SelectWeekDropDown";
import MatchUpCardList from "./MatchUpCardList";

import {matchUpData} from "../MatchUpData";
import {pickData} from "../PickData";
import {teamData} from "../TeamData";

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

  function addMatchUpById(favoredTeamId, underdogTeamId, line) {
    selectedWeekMatchUps.matchUps = [
      ...selectedWeekMatchUps.matchUps,
      {
        // Always inserting at end, so use old length of match ups array for new ID
        "matchUpId": weekNum.toString().padStart(2, '0') + selectedWeekMatchUps.matchUps.length.toString().padStart(2, '0'),
        "favoredTeamId": favoredTeamId,
        "underdogTeamId": underdogTeamId,
        "line": line,
        "isFinal": false,
        "game_start_ts": "01-01-1970 00:00:00.000"
      }
    ];
  }

  return (
    <div>
      <SelectWeekDropDown
        matchUpData={matchUpData}
        selectWeek={selectWeek}
      />
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
        currentMatchUps={selectedWeekMatchUps}
        addMatchUpById={addMatchUpById}
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
