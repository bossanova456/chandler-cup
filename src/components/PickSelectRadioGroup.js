import { useState } from "react";

const PickSelectRadioGroup = ({ favoredRegionCode, underdogRegionCode, favoredTeamId, underdogTeamId, userPick }) => {
	const [ pick, setPick ] = useState("favored");

	const changeHandler = (e) => {
		setPick(e.target.value);
	}

	return (
		<>

			{favoredRegionCode}<input type="radio" value="favored" isSelected={pick === "favored"} onChange={changeHandler} name="pick" />
			<input type="radio" value="underdog" isSelected={pick === "underdog"} onChange={changeHandler} name="pick" />{underdogRegionCode}
		</>
	);
}

export default PickSelectRadioGroup;