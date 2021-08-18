import {FormSelect} from "shards-react";

function AddMatchUpModalDropDown({ teamData, defaultTeam, setAddMatchUpTeam }) {
  return (
    <FormSelect
      size="md"
      onChange={(event) => {
        console.log("Selected: " + event.target.value);
        setAddMatchUpTeam(event.target.value);
      }}
    >
      {
        teamData.map(function(team) {
          return <option
            value={team.teamId}
          >
            {team.teamName}
          </option>
        })
      }
    </FormSelect>
  );
}

export default AddMatchUpModalDropDown;