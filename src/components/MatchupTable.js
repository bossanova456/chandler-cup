import MatchupTableRow from "./MatchupTableRow";

import { matchUpData } from "../MatchUpData";
import { pickData } from "../PickData";

const getMatchupPick = (matchupId) => {
	return pickData[0].weeklyPicks.filter(week => week.weekNum === 0)[0]
		.matchUps.filter(matchup => matchup.matchUpId === matchupId)[0]
		.pick;
}

const MatchupTable = () => {
	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Favored</th>
						<th>Underdog</th>
						<th>Line</th>
						<th>Outcome</th>
					</tr>
				</thead>
				<tbody>
					{
						matchUpData[0].matchUps.map((matchup, i) => {
							return <MatchupTableRow 
										key={"" + i}
										matchup={matchup}
										userPick={getMatchupPick(matchup.favoredTeamId + matchup.underdogTeamId)}
									/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;