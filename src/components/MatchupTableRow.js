import PickSelectRadioGroup from "./PickSelectRadioGroup";

function getUserPickString(pick) {
	if (pick && pick.pick) return pick.pick;
	else return "not set";
}

function getOutcomeString(matchup, favoredTeamName, underdogTeamName) {
	if (matchup.favoredScore === matchup.underdogScore) {
		return "" + matchup.favoredScore + " - " + matchup.underdogScore + " TIE";
	} else {
		return "" + matchup.favoredScore + " - " + matchup.underdogScore + " "
			 + (matchup.favoredScore > matchup.underdogScore ? favoredTeamName : underdogTeamName);
	}
}

const MatchupTableRow = ({ matchup, userPick, favoredTeam, underdogTeam, updateUnsavedPicks }) => {
	return (
		<>
			<tr>
				<td>{favoredTeam.teamName}</td>
				<td>{underdogTeam.teamName}</td>
				<td>-{matchup.line}</td>
				<td>{new Date(matchup.game_start_ts).toLocaleString([], {weekday: "long", hour: '2-digit', minute:'2-digit'})}</td>
				<td>{getOutcomeString(matchup, favoredTeam.teamName, underdogTeam.teamName)}</td>
				<td>{getUserPickString(userPick)}</td>
				<td><PickSelectRadioGroup favoredTeam={favoredTeam} underdogTeam={underdogTeam} userPick={userPick} updateUnsavedPicks={updateUnsavedPicks} /></td>
			</tr>
		</>
	)
}

export default MatchupTableRow;