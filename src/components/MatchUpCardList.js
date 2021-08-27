import React from 'react';
import MatchUpCard from "./MatchUpCard"
import { Container, Row, Col } from "shards-react";
function MatchUpCardList({ player, weekNum, selectedWeekMatchUps, teamData }) {
  const {name, weeklyPicks} = player;

  const selectedWeekPicks = weeklyPicks.find(function (singleWeekPicks) {
    return singleWeekPicks.weekNum === weekNum;
  });

  const joinMatchUpJsonData = (targetJson, targetJsonJoinKey, targetJsonWriteKey, matchingJson, matchingJsonJoinKey, matchingJsonWriteKey) => {
    Object.keys(targetJson.matchUps)
      .forEach(key => {
        // Get team name based on teamId
        const favoredTeam = matchingJson.find(function (data) {
          return data[matchingJsonJoinKey] === targetJson.matchUps[key][targetJsonJoinKey];
        });

        // Add key & value to match up data
        targetJson.matchUps[key][targetJsonWriteKey] = favoredTeam[matchingJsonWriteKey];
      });
  }

  // Pass team names to match up data based on team ID
  if (selectedWeekMatchUps) {
    joinMatchUpJsonData(
      selectedWeekMatchUps,
      "favoredTeamId",
      "favoredTeamName",
      teamData,
      "teamId",
      "teamName"
    );

    joinMatchUpJsonData(
      selectedWeekMatchUps,
      "underdogTeamId",
      "underdogTeamName",
      teamData,
      "teamId",
      "teamName"
    );
  }

  if (selectedWeekPicks) {
    joinMatchUpJsonData(
      selectedWeekPicks,
      "matchUpId",
      "favoredTeamName",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "favoredTeamName"
    );

    joinMatchUpJsonData(
      selectedWeekPicks,
      "matchUpId",
      "underdogTeamName",
      selectedWeekMatchUps.matchUps,
      "matchUpId",
      "underdogTeamName"
    );
  }

  return (
    <Container fluid style={{
      "display": "flex",
      "overflow-x": "auto",
      "overflow-y": "hidden",
      "height": "500px",
      "width": "3000px"
    }}>
      <Row>
        <Col>
          <MatchUpCardListRowHeader playerName={name} weeklyScore={12} />
        </Col>
        {
          selectedWeekMatchUps ?
            selectedWeekMatchUps.matchUps.map(function(matchUp, index) {
              return (
                <Col key={index}>
                  <MatchUpCard
                    class="flex-column"
                    matchUp={matchUp}
                    pickData={
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

import MatchUpCardListRowHeader from "./MatchUpCardListRowHeader";

export default MatchUpCardList;