const PickSelectRadioGroup = ({ favoredRegionCode, underdogRegionCode, favoredTeamId, underdogTeamId, pick, selectPick }) => {
	return (
		<div onChange={selectPick}>
			{favoredRegionCode}<input type="radio" value={favoredTeamId} name="pick" />
			<input type="radio" value={underdogTeamId} name="pick" />{underdogRegionCode}
		</div>
	);
}

export default PickSelectRadioGroup;