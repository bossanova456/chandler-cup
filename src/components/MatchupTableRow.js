import PickSelectRadioGroup from "./PickSelectRadioGroup";

import { teamData } from "../TeamData";

function getTeamName(teamId) {
	return teamData.filter(team => team.teamId === teamId)[0].teamRegion;
}

function getRegionCode(teamId) {
	return teamData.filter(team => team.teamId === teamId)[0].teamRegionCode;
}

function getOutcomeString(matchup) {
	const favoredTeamName = getTeamName(matchup.favoredTeamId);
	const underdogTeamName = getTeamName(matchup.underdogTeamId);

	if (matchup.favoredScore === matchup.underdogScore) {
		return "" + matchup.favoredScore + " - " + matchup.underdogScore + " TIE";
	} else {
		return "" + matchup.favoredScore + " - " + matchup.underdogScore + " "
			 + (matchup.favoredScore > matchup.underdogScore ? favoredTeamName : underdogTeamName);
	}
}

const MatchupTableRow = ({ matchup, userPick }) => {
	return (
		<>
			<tr>
				<td>{getTeamName(matchup.favoredTeamId)}</td>
				<td>{getTeamName(matchup.underdogTeamId)}</td>
				<td>-{matchup.line}</td>
				<td>{getOutcomeString(matchup)}</td>
			</tr>
		</>
	)
}

export default MatchupTableRow;