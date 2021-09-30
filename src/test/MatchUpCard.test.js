import React from 'react';
import MatchUpCard from "../components/MatchUpCard";

import {CardBody, CardFooter, FormRadio, Button} from "shards-react";

import { mount, shallow, render } from 'enzyme';

const matchUpData = {
  "matchUpId": "0101",
  "favoredTeamId": "01",
  "underdogTeamId": "02",
  "favoredTeamName": "Falcons",
  "underdogTeamName": "Buccaneers",
  "isFinal": false,
  "game_start_ts": "01-01-1970 00:00:00.000"
};

const pickData = {
  "matchUpId": "0101",
  "pick": "favored",
  "game_start_ts": "01-01-1970 00:00:00.000",
  "last_upd_ts": "01-01-1970 01:00:00.000"
};

describe('MatchUpCard', () => {
  let wrapper;
  beforeEach(() => {
    wrapper = shallow(
      <MatchUpCard
        matchUp={matchUpData}
        pickData={pickData}
      />
    );
  });

  afterEach(() => {
    wrapper.unmount();
  });

  it('Renders a card footer with two buttons', () => {
    const cardFooter = wrapper.find(CardFooter);

    expect(cardFooter).toHaveLength(1);
    expect(cardFooter.find(Button)).toHaveLength(2);

    expect(cardFooter.find(Button).first().prop('children')).toEqual('Submit?');
    expect(cardFooter.find(Button).last().prop('children')).toEqual('Update?');
  })

  it('Selection changes and button is enabled/disabled when pick radio button is selected', () => {
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(CardFooter).find(Button).first().prop("disabled")).toBe(true);
    wrapper.find(CardBody).find(FormRadio).last().simulate('change');
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(CardFooter).find(Button).first().prop("disabled")).toBe(false);
    wrapper.find(CardBody).find(FormRadio).first().simulate('change');
    expect(wrapper).toMatchSnapshot();

    expect(wrapper.find(CardFooter).find(Button).first().prop("disabled")).toBe(true);
  });

  it('Pick changes when submitted', () => {
    wrapper.find(CardBody).find(FormRadio).last().simulate('change');
    expect(wrapper).toMatchSnapshot();

    wrapper.find(CardFooter).find(Button).first().simulate('click');

  })
});
