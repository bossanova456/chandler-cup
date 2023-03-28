import MatchupTableRow from "./MatchupTableRow";

import { pickData } from "../PickData";

import { useEffect, useState } from "react";

const getMatchupPick = (matchupId) => {
	return pickData[0].weeklyPicks.filter(week => week.weekNum === 0)[0]
		.matchUps.filter(matchup => matchup.matchUpId === matchupId)[0]
		.pick;
}

const MatchupTable = () => {
	const [ matchups, setMatchups ] = useState([]);
	const [ picks, setPicks ] = useState({});
	const [ year, setYear ] = useState('');
	const [ week, setWeek ] = useState('01');
	const [ currentSeason, setCurrentSeason ] = useState({});

	useEffect(() => {
		fetch('http://192.168.1.51:3001/currentSeason')
			.then(response => response.json())
			.then(data => {
				setCurrentSeason(data);
				setYear(data.year);
				setWeek(data.week);
			});
	}, []);

	// Should use current year data from call
	useEffect(() => {
		fetch('http://192.168.1.51:3001/matchups/year/' + year + '/week/' + week)
			.then(response => response.json())
			.then(data => {
				setMatchups(data);
			}, () => {
				console.error("Error: could not get matchup data (year: " + year + ", week: " + week + ")");
			});

		fetch('http://192.168.1.51:3001/picks/year/' + year + '/week/' + week)
			.then(response => response.json())
			.then(data => {
				setPicks(data);
			}, () => {
				console.error("Error: pick data not found (year: " + year + ", week: " + week + ")");
			});
	}, [ year, week ]);

	// Should use current year data from call
	useEffect(() => {
		
	}, [ year, week ]);
	
	return (
		<>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Favored</th>
						<th>Underdog</th>
						<th>Line</th>
						<th>Outcome</th>
					</tr>
				</thead>
				<tbody>
					{
						matchups.map((matchup, i) => {
							return <MatchupTableRow 
										key={"" + i}
										matchup={matchup}
										userPick={getMatchupPick(matchup.favoredTeamId + matchup.underdogTeamId)}
									/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;