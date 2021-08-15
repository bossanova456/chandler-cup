import PickCard from "./PickCard"
import { Container, Row, Col } from "shards-react";
import PickCardListRowHeader from "./PickCardListRowHeader";

function PickCardList({ player, weekNum }) {
  const { name, weeklyPicks } = player;
  const selectedWeekPicks = weeklyPicks.find(function(singleWeekPicks) {
    return singleWeekPicks.weekNum === weekNum;
  });

  return (
    <Container fluid>
      <Row form>
        <Col>
          <PickCardListRowHeader playerName={name} weeklyScore={12} />
        </Col>
        {
          selectedWeekPicks ?
            selectedWeekPicks.matchUps.map(function(matchUp) {
              return (
                <Col><PickCard matchUp={matchUp} /></Col>
              );
            }) :
            <p>No picks for week {weekNum+1}</p>
        }
      </Row>
    </Container>
  );
}

export default PickCardList;