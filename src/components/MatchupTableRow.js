const MatchupTableRow = ({ favoredTeamName, underdogTeamName, line }) => {
	return (
		<>
			<tr>
				<td>{favoredTeamName}</td>
				<td>{line}</td>
				<td>{underdogTeamName}</td>
			</tr>
		</>
	)
}

export default MatchupTableRow;