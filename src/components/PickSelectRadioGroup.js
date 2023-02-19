const PickSelectRadioGroup = ({ favoredRegionCode, underdogRegionCode, favoredTeamId, underdogTeamId, pick, selectPick }) => {
	return (
		<>
			{favoredRegionCode}<input type="radio" value="favored" checked={pick === "favored"} onChange={selectPick} name="pick" />
			<input type="radio" value="underdog" checked={pick === "underdog"} onChange={selectPick} name="pick" />{underdogRegionCode}
		</>
	);
}

export default PickSelectRadioGroup;