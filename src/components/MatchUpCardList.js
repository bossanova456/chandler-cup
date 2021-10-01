import React, {useState} from 'react';
import { Container, Row, Col } from "shards-react";
import MatchUpCard from "./MatchUpCard";
import MatchUpCardListRowHeader from "./MatchUpCardListRowHeader";

function MatchUpCardList({ player, weekNum, selectedWeekMatchUps, teamData, toggleUpdateMatchUpScoreModal }) {
  const matchUpCardWidth = 200;
  const {name, weeklyPicks} = player;

  const selectedWeekPicks = weeklyPicks.find(function (singleWeekPicks) {
    return singleWeekPicks.weekNum === weekNum;
  });

  // Combines all data into targetJson object
  const joinMatchUpJsonData = (targetJson, targetJsonJoinKey, targetJsonWriteKey, matchingJson, matchingJsonJoinKey, matchingJsonWriteKey) => {
    Object.keys(targetJson)
      .forEach(key => {
        // Get matching record
        const matchUpData = matchingJson.find(function (data) {
          return data[matchingJsonJoinKey] === targetJson[key][targetJsonJoinKey];
        });

        // Add key & value to match up data
        targetJson[key][targetJsonWriteKey] = matchUpData[matchingJsonWriteKey];
      });
  }

  // Pass team names to match up data based on team ID
  if (selectedWeekMatchUps) {
    joinMatchUpJsonData(
      selectedWeekMatchUps.matchUps,
      "favoredTeamId",
      "favoredTeamName",
      teamData,
      "teamId",
      "teamName"
    );

    joinMatchUpJsonData(
      selectedWeekMatchUps.matchUps,
      "underdogTeamId",
      "underdogTeamName",
      teamData,
      "teamId",
      "teamName"
    );
  }

  if (selectedWeekPicks) {
    joinMatchUpJsonData(
      selectedWeekPicks.matchUps,
      "matchUpId",
      "favoredTeamName",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "favoredTeamName"
    );

    joinMatchUpJsonData(
      selectedWeekPicks.matchUps,
      "matchUpId",
      "underdogTeamName",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "underdogTeamName"
    );

    joinMatchUpJsonData(
      selectedWeekPicks.matchUps,
      "matchUpId",
      "favoredScore",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "favoredScore"
    );

    joinMatchUpJsonData(
      selectedWeekPicks.matchUps,
      "matchUpId",
      "underdogScore",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "underdogScore"
    );

    joinMatchUpJsonData(
      selectedWeekPicks.matchUps,
      "matchUpId",
      "line",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "line"
    );
  }

  // Calculate weekly score
  function calculateWeeklyScore() {
    let tempWeeklyScore = 0;
    selectedWeekPicks.matchUps.map((matchUp) => {
      const {favoredScore, underdogScore, line, pick} = matchUp;
      if ((favoredScore - underdogScore > line)) {
        tempWeeklyScore++;
      }
    });
    return tempWeeklyScore;
  }
  const [ weeklyScore, setWeeklyScore ] = useState(calculateWeeklyScore());

  return (
    <Container fluid style={{
      "display": "flex",
      "overflowX": "auto",
      "overflowY": "hidden",
      "height": "500px",
      "width": "3000px"
    }}>
      <Row>
        <Col>
          <MatchUpCardListRowHeader playerName={name} weeklyScore={weeklyScore} />
        </Col>
        {
          selectedWeekMatchUps ?
            selectedWeekMatchUps.matchUps.map(function(matchUp, index) {
              return (
                <Col key={index}>
                  <MatchUpCard
                    class="flex-column"
                    matchUp={matchUp}
                    toggleUpdateMatchUpScoreModal={toggleUpdateMatchUpScoreModal}
                    pickData={
                      // Picks may not be set
                      selectedWeekPicks ?
                        // TODO: why is this returning a one element array?
                        selectedWeekPicks.matchUps.filter(function(selectedWeekSingleMatchUp) {
                          return selectedWeekSingleMatchUp.matchUpId === matchUp.matchUpId
                        })[0] :
                        undefined
                    }
                  />
                </Col>
              );
            }) :
            <p>No picks for week {weekNum+1}</p>
        }
      </Row>
    </Container>
  );
}

export default MatchUpCardList;
