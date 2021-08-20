import {FormSelect} from "shards-react";

function AddMatchUpModalDropDown({ teamData, currentMatchUps, addMatchUpTeamId, setAddMatchUpTeamId }) {
  return (
    <FormSelect
      size="md"
      value={addMatchUpTeamId}
      placeholder={"Select team"}
      onChange={(event) => {
        setAddMatchUpTeamId(event.target.value);
      }}
    >
      {
        teamData.map(function(team) {
          return <option
            value={team.teamId}
            disabled={
              currentMatchUps.matchUps.filter(function(currentMatchUp) {
                return currentMatchUp.favoredTeamId === team.teamId
                || currentMatchUp.underdogTeamId === team.teamId;
              })[0]
            }
          >
            {team.teamName}
          </option>
        })
      }
    </FormSelect>
  );
}

export default AddMatchUpModalDropDown;