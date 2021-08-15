import "react";
import 'bootstrap/dist/css/bootstrap.min.css';
import "shards-ui/dist/css/shards.min.css";

import { data } from "./PickData";
import PickCardList from "./components/PickCardList";

function App() {
    return (
      data.map(function (player) {
        return <PickCardList player={player} />
      })
    );
}

export default App;