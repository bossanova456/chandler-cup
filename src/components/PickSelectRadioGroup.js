const PickSelectRadioGroup = ({ favoredTeam, underdogTeam, userPick, updateUnsavedPicks }) => {
	const matchupId = "" + favoredTeam.teamId + underdogTeam.teamId;

	const changeHandler = (e) => {
		updateUnsavedPicks(matchupId, {
			"pick": e.target.value,
			"last_upd_ts": "01-01-1970 01:00:00.000"
		});
	}

	return (
		<>
			<div>
				<input type="radio" value="favored" onChange={changeHandler} checked={userPick?.pick === "favored"} name={matchupId} id="favored" />
				<label htmlFor="favored">{favoredTeam.teamRegionCode}</label>
			</div>
			<div>
				<input type="radio" value="underdog" onChange={changeHandler} checked={userPick?.pick === "underdog"} name={matchupId} id="underdog" />
				<label htmlFor="underdog">{underdogTeam.teamRegionCode}</label>
			</div>
		</>
	);
}

export default PickSelectRadioGroup;