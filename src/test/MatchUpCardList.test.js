import React from 'react';
import MatchUpCardList from "../components/MatchUpCardList";

import { mount, shallow, render } from 'enzyme';
import {teamData} from "../TeamData";
import MatchUpCard from "../components/MatchUpCard";

describe('MatchUpCardList', () => {
  it('Should render list of match up cards', () => {
    const playerData = {
      "id": 1,
      "name": "sharon",
      "weeklyPicks": [
        {
          "id": 11,
          "weekNum": 0,
          "score": 0,
          "matchUps": [
            {
              "key": "1",
              "matchUpId": "0101",
              "favoredTeamName": "Team 1",
              "underdogTeamName": "Team 2",
              "pick": "favored",
              "game_start_ts": "01-01-1970 00:00:00.000",
              "last_upd_ts": "01-01-1970 01:00:00.000"
            },
            {
              "key": "2",
              "matchUpId": "0102",
              "favoredTeamName": "Team 3",
              "underdogTeamName": "Team 4",
              "pick": "underdog",
              "game_start_ts": "01-01-1970 00:00:00.000",
              "last_upd_ts": "01-01-1970 01:00:00.000"
            },
            {
              "key": "3",
              "matchUpId": "0103",
              "favoredTeamName": "Team 5",
              "underdogTeamName": "Team 6",
              "pick": "underdog",
              "game_start_ts": "01-01-1970 00:00:00.000",
              "last_upd_ts": "01-01-1970 01:00:00.000"
            }
          ]
        }
      ]
    }
    const matchUpData = {
      "weekNum": 0,
      "matchUps": [
        {
          "matchUpId": "0101",
          "favoredTeamId": "01",
          "underdogTeamId": "02",
          "game_start_ts": "01-01-1970 00:00:00.000"
        },
        {
          "matchUpId": "0102",
          "favoredTeamId": "03",
          "underdogTeamId": "04",
          "game_start_ts": "01-01-1970 00:00:00.000"
        },
        {
          "matchUpId": "0103",
          "favoredTeamId": "05",
          "underdogTeamId": "06",
          "game_start_ts": "01-01-1970 00:00:00.000"
        }
      ]
    };

    const wrapper = shallow(
      <MatchUpCardList
        player={playerData}
        weekNum={0}
        selectedWeekMatchUps={matchUpData}
        teamData={teamData}
      />
    );

    expect(wrapper).toMatchSnapshot();
    expect(wrapper.find(MatchUpCard).length).toBe(matchUpData.matchUps.length);
  })
})