import {Button} from "shards-react";
import React, {useState} from "react";

import AddMatchUpModal from "./AddMatchUpModal";
import SelectWeekDropDown from "./SelectWeekDropDown";
import MatchUpCardList from "./MatchUpCardList";

import {matchUpData} from "../MatchUpData";
import {pickData} from "../PickData";
import {teamData} from "../TeamData";
import UpdateMatchUpScoreModal from "./UpdateMatchUpScoreModal";

function MatchUpCardListContainer() {
  const [ selectedPlayer, setSelectedPlayer ] = useState("sharon");
  const [ weekNum, setWeekNum ] = useState(0);
  const [ selectedWeekMatchUps, setSelectedWeekMatchUps ] = useState(matchUpData.filter(function(matchUpsByWeek) {
    return matchUpsByWeek.weekNum === weekNum;
  })[0]);
  const [ showAddMatchUpModal, setShowAddMatchUpModal ] = useState(false);
  const [ updateMatchUpScoreModalData, setUpdateMatchUpScoreModalData ] = useState(
    {
      showUpdateMatchUpScoreModal: false,
      updateMatchUpScoreId: ""
    }
  );

  function selectWeek(targetWeekNum) {
    setWeekNum(targetWeekNum);
    setSelectedWeekMatchUps(matchUpData.filter(function(matchUpsByWeek) {
      return matchUpsByWeek.weekNum === targetWeekNum;
    })[0]);
  }

  function toggleAddMatchUpModal() {
    setShowAddMatchUpModal(!showAddMatchUpModal);
  }

  function toggleUpdateMatchUpScoreModal(matchUpId) {
    setUpdateMatchUpScoreModalData({
      showUpdateMatchUpScoreModal: !updateMatchUpScoreModalData.showUpdateMatchUpScoreModal,
      updateMatchUpScoreId: matchUpId
    });
    console.log("Update score match up data: " + JSON.stringify(updateMatchUpScoreModalData));
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

  function updateScore(matchUpId, favoredTeamScore, underdogTeamScore, isFinal) {
    console.log("Updating with: Favored score: " + favoredTeamScore + " | Underdog score: " + underdogTeamScore + " | Is final? " + isFinal);
    const newScoreMatchUp = selectedWeekMatchUps.matchUps.filter(function (matchUp) {
      return matchUp.matchUpId === matchUpId;
    })[0];

    newScoreMatchUp.favoredScore = favoredTeamScore;
    newScoreMatchUp.underdogScore = underdogTeamScore;
    newScoreMatchUp.isFinal = isFinal;

    selectedWeekMatchUps.matchUps.map(function(matchUp) {
      return matchUp.matchUpId === matchUpId ? newScoreMatchUp : matchUp;
    });

    console.log("New score match up: " + JSON.stringify(newScoreMatchUp));
  }

  return (
    <div>
      <SelectWeekDropDown
        matchUpData={matchUpData}
        selectWeek={selectWeek}
      />
      <Button
        size="md"
        onClick={() => toggleAddMatchUpModal()}
      >
        Add Match Up
      </Button>
      <AddMatchUpModal
        showModal={showAddMatchUpModal}
        weekNum={weekNum}
        toggleModal={toggleAddMatchUpModal}
        selectedWeekMatchUps={selectedWeekMatchUps}
        teamData={teamData}
        currentMatchUps={selectedWeekMatchUps}
        addMatchUpById={addMatchUpById}
      />
      <UpdateMatchUpScoreModal
        showModal={updateMatchUpScoreModalData.showUpdateMatchUpScoreModal}
        toggleModal={toggleUpdateMatchUpScoreModal}
        matchUpScoreId={updateMatchUpScoreModalData.updateMatchUpScoreId}
        updateScore={updateScore}
      />
      {
        pickData.map(function (player) {
          return <MatchUpCardList
              player={player}
              weekNum={weekNum}
              selectedWeekMatchUps={selectedWeekMatchUps}
              teamData={teamData}
              toggleUpdateMatchUpScoreModal={toggleUpdateMatchUpScoreModal}
            />
        })
      }
    </div>
  );
}

export default MatchUpCardListContainer;
