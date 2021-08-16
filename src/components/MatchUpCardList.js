import MatchUpCard from "./MatchUpCard"
import { Container, Row, Col } from "shards-react";
import MatchUpCardListRowHeader from "./MatchUpCardListRowHeader";

function MatchUpCardList({ player, weekNum }) {
  const { name, weeklyPicks } = player;
  const selectedWeekPicks = weeklyPicks.find(function(singleWeekPicks) {
    return singleWeekPicks.weekNum === weekNum;
  });

  return (
    <Container fluid>
      <Row form>
        <Col>
          <MatchUpCardListRowHeader playerName={name} weeklyScore={12} />
        </Col>
        {
          selectedWeekPicks ?
            selectedWeekPicks.matchUps.map(function(matchUp) {
              return (
                <Col><MatchUpCard matchUp={matchUp} /></Col>
              );
            }) :
            <p>No picks for week {weekNum+1}</p>
        }
      </Row>
    </Container>
  );
}

export default MatchUpCardList;