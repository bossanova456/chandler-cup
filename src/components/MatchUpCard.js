import React, { useState } from "react";

import {
  Card,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
  FormRadio,
  Button
} from "shards-react";

function MatchUpCard({ matchUp, pickData }) {
  const [ pick, setPick ] = useState(pickData ? pickData.pick : undefined);
  const [ selectedPick, setSelectedPick ] = useState();

  const { favoredTeamName, underdogTeamName, line, favoredScore, underdogScore, isFinal } = matchUp;

  const isFavoredSelected = (
    selectedPick === "favored" || (selectedPick === undefined && pickData && pickData.pick === "favored")
  );

  const options = { dateStyle: "short", timeStyle: "short" };
  const formatter = new Intl.DateTimeFormat("en-US", options);

  return (
    <Card style={{ maxWidth: "200px" }}>
      <CardHeader>
        {
          (favoredScore ? favoredScore : "0") + "-" + (underdogScore ? underdogScore : "0") + " " +
          (parseInt(favoredScore) - parseInt(underdogScore) > parseInt(line) ? favoredTeamName : underdogTeamName) + " " +
          (isFinal ? "FINAL" : "")
        }
      </CardHeader>
      <CardBody>
        <CardTitle>{favoredTeamName + " (-" + (line ? line : "0") + ") vs " + underdogTeamName}</CardTitle>
        <CardSubtitle>{formatter.format(Date.parse(matchUp.game_start_ts))}</CardSubtitle>
        <FormRadio
          id="selectFavoredTeam"
          name={matchUp.matchUpId}
          checked={isFavoredSelected}
          onChange={() => {
            setSelectedPick("favored")
          }}
        >
          Favored
        </FormRadio>
        <FormRadio
          id="selectUnderdogTeam"
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
