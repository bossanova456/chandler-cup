import {FormSelect} from "shards-react";
import {matchUpData} from "../MatchUpData";
import {pickData} from "../PickData";
import MatchUpCardList from "./MatchUpCardList";
import {useState} from "react";

function MatchUpCardListContainer() {
  const [ weekNum, setWeekNum ] = useState(0);

  return (
    <div>
      <FormSelect onChange={(event) => {
        setWeekNum(parseInt(event.target.value));
      }}
      >
        {
          [...Array(16).keys()].map(function (weekNumOption) {
            return (
              <option
                value={weekNumOption}
                disabled={matchUpData.find(function (matchUp) {
                  return matchUp.weekNum === weekNumOption;
                }) ? false : true}
              >
                Week {weekNumOption+1}
              </option>
            )
          })
        }
      </FormSelect>
      {
        pickData.map(function (player) {
          return <MatchUpCardList player={player} weekNum={weekNum} />
        })
      }
    </div>
  );
}

export default MatchUpCardListContainer;