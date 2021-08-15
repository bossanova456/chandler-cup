import { useState } from "react";
import { FormSelect } from "shards-react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "shards-ui/dist/css/shards.min.css";

import { matchUpData } from "./MatchUpData";
import { pickData } from "./PickData";
import PickCardList from "./components/PickCardList";

function App() {
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
          return <PickCardList player={player} weekNum={weekNum} />
        })
      }
    </div>
  );
}

export default App;