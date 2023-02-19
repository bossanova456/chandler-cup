import MatchupTableRow from "./MatchupTableRow";

import { matchUpData } from "../MatchUpData";
import { teamData } from "../TeamData";

function getTeamName(teamId) {
	return teamData.filter(team => team.teamId === teamId)[0].teamName;
}

const MatchupTable = () => {
	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Favored</th>
						<th>Line</th>
						<th>Underdog</th>
					</tr>
				</thead>
				<tbody>
					{
						matchUpData[0].matchUps.map(matchup => {
							return <MatchupTableRow 
										favoredTeamName={getTeamName(matchup.favoredTeamId)}
										underdogTeamName={getTeamName(matchup.underdogTeamId)}
										line={matchup.line}
									/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;