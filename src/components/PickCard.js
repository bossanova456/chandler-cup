import "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  Button
} from "shards-react";

function PickCard({ matchUp }) {
  const { favoredTeamName, underdogTeamName, pick } = matchUp;
  return (
    <Card style={{ maxWidth: "200px" }}>
      <CardHeader>Game Time</CardHeader>
      <CardBody>
        <CardTitle>{favoredTeamName + " v " + underdogTeamName}</CardTitle>
        <p>{pick}</p>
        <Button>Read more &rarr;</Button>
      </CardBody>
      <CardFooter>Card footer</CardFooter>
    </Card>
  );
}

export default PickCard;