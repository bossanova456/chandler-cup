import MatchupTableRow from "./MatchupTableRow";

const MatchupTable = ({ matchups, savedPicks, unsavedPicks, teams, user, updateUnsavedPicks, selectMatchup, updateScore }) => {

	
	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Favored</th>
						<th>Underdog</th>
						<th>Line</th>
						<th>Start Time</th>
						<th>Outcome</th>
						<th>Pick</th>
						<th>Set Pick</th>
						<th>Update Score</th>
					</tr>
				</thead>
				<tbody>
					{
						Object.keys(matchups)
							.sort((a, b) => {
								const date1 = new Date(matchups[a].game_start_ts).getTime();
								const date2 = new Date(matchups[b].game_start_ts).getTime();
								if (date1 > date2) return 1;
								if (date1 < date2) return -1;
								else return 0;
							})
							.map((matchupId, i) => {
								return <MatchupTableRow 
											key={"" + i}
											matchup={matchups[matchupId]}
											userPick={unsavedPicks[user] ? unsavedPicks[user][matchups[matchupId].favoredTeamId + matchups[matchupId].underdogTeamId] : {}}
											favoredTeam={teams[matchups[matchupId].favoredTeamId]}
											underdogTeam={teams[matchups[matchupId].underdogTeamId]}
											updateUnsavedPicks={updateUnsavedPicks}
											selectMatchup={() => selectMatchup(matchupId)}
										/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;