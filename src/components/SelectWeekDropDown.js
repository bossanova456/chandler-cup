import {FormSelect} from "shards-react";

function SelectWeekDropDown({ matchUpData, selectWeek }) {
  return (
    <FormSelect
      size="md"
      onChange={(event) => {
        selectWeek(parseInt(event.target.value));
      }}
    >
      {
        [...Array(16).keys()].map(function (weekNumOption) {
          return (
            <option
              value={weekNumOption}
              disabled={!matchUpData.find(function (matchUp) {
                return matchUp.weekNum === weekNumOption;
              })}
            >
              Week {weekNumOption+1}
            </option>
          )
        })
      }
    </FormSelect>
  )
}

export default SelectWeekDropDown;