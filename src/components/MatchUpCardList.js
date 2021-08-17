import MatchUpCard from "./MatchUpCard"
import { Container, Row, Col } from "shards-react";
import MatchUpCardListRowHeader from "./MatchUpCardListRowHeader";

import {matchUpData} from "../MatchUpData";
import {teamData} from "../TeamData";

function MatchUpCardList({ player, weekNum }) {
  const {name, weeklyPicks} = player;

  const selectedWeekMatchUps = matchUpData.find(function (singleWeekMatchUps) {
    return singleWeekMatchUps.weekNum === weekNum;
  });

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
        // const underdogTeam = teamData.find(function (team) {
        //   return team.teamId === targetJson.matchUps[key].underdogTeamId;
        // });

        // Add key & value to match up data
        targetJson.matchUps[key][targetJsonWriteKey] = favoredTeam[matchingJsonWriteKey];
        // targetJson.matchUps[key].underdogTeamName = underdogTeam.teamName;
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
    <Container fluid>
      <Row form>
        <Col>
          <MatchUpCardListRowHeader playerName={name} weeklyScore={12} />
        </Col>
        {
          selectedWeekMatchUps ?
            selectedWeekMatchUps.matchUps.map(function(matchUp) {
              return (
                <Col>
                  <MatchUpCard
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

export default MatchUpCardList;