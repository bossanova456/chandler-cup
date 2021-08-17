import "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter
} from "shards-react";

function MatchUpCardListRowHeader({ playerName, weeklyScore }) {
  return (
    <Card style={{ maxWidth: "200px" }}>
      <CardHeader>#1</CardHeader>
      <CardBody>
        <CardTitle>{playerName}</CardTitle>
      </CardBody>
      <CardFooter>{weeklyScore + " points this week"}</CardFooter>
    </Card>
  );
}

export default MatchUpCardListRowHeader;