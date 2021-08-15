import PickCard from "./PickCard"
import {Container, Row, Col} from "shards-react";

function PickCardList({ player }) {
  const { name, weeklyPicks } = player;
  return (
    <Container fluid>
      <Row form>
        {
          weeklyPicks[0].matchUps.map(function(matchUp) {
            return (
              <Col><PickCard matchUp={matchUp} /></Col>
            );
          })
        }
      </Row>
    </Container>
  );
}

export default PickCardList;