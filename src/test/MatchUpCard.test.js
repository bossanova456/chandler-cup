import React from 'react';
import renderer from "react-test-renderer";
import MatchUpCard from "../components/MatchUpCard";

import {CardBody, FormRadio} from "shards-react";

import { mount, shallow, render } from 'enzyme';

describe('MatchUpCard', () => {

  it('Selection changes when clicked', () => {
    const matchUpData = {
      "matchUpId": "0101",
      "favoredTeamId": "01",
      "underdogTeamId": "02",
      "favoredTeamName": "Falcons",
      "underdogTeamName": "Buccaneers",
      "game_start_ts": "01-01-1970 00:00:00.000"
    };

    const pickData = {
      "matchUpId": "0101",
      "favoredTeamName": "Team 1",
      "underdogTeamName": "Team 2",
      "pick": "favored",
      "game_start_ts": "01-01-1970 00:00:00.000",
      "last_upd_ts": "01-01-1970 01:00:00.000"
    };

    const wrapper = shallow(
      <MatchUpCard
        matchUp={matchUpData}
        pickData={pickData}
      />
    );

    expect(wrapper).toMatchSnapshot();

    // TODO: Check if button is enabled
    wrapper.find(CardBody).find(FormRadio).last().simulate('change');
    expect(wrapper).toMatchSnapshot();

    // TODO: Check if button is disabled
    wrapper.find(CardBody).find(FormRadio).first().simulate('change');
    expect(wrapper).toMatchSnapshot();

  });

  it('Pick changes when submitted', () => {

  })
});