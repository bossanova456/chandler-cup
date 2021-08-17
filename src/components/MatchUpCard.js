import { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardBody,
  CardFooter,
  FormRadio,
  Button
} from "shards-react";

function MatchUpCard({ matchUp, pickData }) {
  const [ pick, setPick ] = useState(pickData ? pickData.pick : undefined);
  const [ selectedPick, setSelectedPick ] = useState();

  const { favoredTeamName, underdogTeamName } = matchUp;

  const isFavoredSelected = (
    selectedPick === "favored" || (selectedPick === undefined && pickData && pickData.pick === "favored")
  );

  return (
    <Card style={{ maxWidth: "200px" }}>
      <CardHeader>Game Time</CardHeader>
      <CardBody>
        <CardTitle>{favoredTeamName + " - " + underdogTeamName}</CardTitle>
        <FormRadio
          name={matchUp.matchUpId}
          checked={isFavoredSelected}
          onChange={() => {
            setSelectedPick("favored")
          }}
        >
          Favored
        </FormRadio>
        <FormRadio
          name={matchUp.matchUpId}
          checked={!isFavoredSelected}
          onChange={() => {
            setSelectedPick("underdog")
          }}
        >
          Underdog
        </FormRadio>
      </CardBody>
      <CardFooter>
        <Button
          size="sm"
          onClick={() => setPick(selectedPick)}
          disabled={
            !(selectedPick !== undefined && pick !== selectedPick)
          }
        >
          Submit?
        </Button>
      </CardFooter>
    </Card>
  );
}

export default MatchUpCard;