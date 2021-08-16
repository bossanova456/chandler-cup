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
      <CardHeader>{playerName}</CardHeader>
      <CardBody>
        <CardTitle>{weeklyScore + " weekly score"}</CardTitle>
      </CardBody>
      <CardFooter>Card footer</CardFooter>
    </Card>
  );
}

export default MatchUpCardListRowHeader;