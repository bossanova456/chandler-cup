import PickSelectRadioGroup from "./PickSelectRadioGroup";

function getUserPickString(pick) {
	if (pick) return pick.pick;
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

const MatchupTableRow = ({ matchup, userPick, favoredTeam, underdogTeam }) => {
	return (
		<>
			<tr>
				<td>{favoredTeam.teamName}</td>
				<td>{underdogTeam.teamName}</td>
				<td>-{matchup.line}</td>
				<td>{getOutcomeString(matchup, favoredTeam.teamName, underdogTeam.teamName)}</td>
				<td>{getUserPickString(userPick)}</td>
			</tr>
		</>
	)
}

export default MatchupTableRow;