import MatchupTableRow from "./MatchupTableRow";

import { useEffect, useState } from "react";

const MatchupTable = () => {
	const [ teams, setTeams ] = useState({});
	const [ matchups, setMatchups ] = useState([]);
	const [ picks, setPicks ] = useState({});
	const [ year, setYear ] = useState('');
	const [ week, setWeek ] = useState('01');
	const [ currentSeason, setCurrentSeason ] = useState({});
	const [ currentUser, setCurrentUser ] = useState('sharon');

	useEffect(() => {
		fetch('http://192.168.1.51:3001/teams')
			.then(response => response.json())
			.then(data => {
				console.log("Teams: " + JSON.stringify(data));
				setTeams(data);
			});
	}, []);

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
		if (year && week) {
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
					console.log("Picks: " + JSON.stringify(data));
					setPicks(data);
				}, () => {
					console.error("Error: pick data not found (year: " + year + ", week: " + week + ")");
				});
		}
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
						<th>Pick</th>
					</tr>
				</thead>
				<tbody>
					{
						matchups.map((matchup, i) => {
							return <MatchupTableRow 
										key={"" + i}
										matchup={matchup}
										userPick={picks[currentUser] ? picks[currentUser][matchup.favoredTeamId + matchup.underdogTeamId] : {}}
										favoredTeam={teams[matchup.favoredTeamId]}
										underdogTeam={teams[matchup.underdogTeamId]}
									/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;