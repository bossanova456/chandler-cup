import MatchupTableRow from "./MatchupTableRow";

import { useEffect, useState } from "react";

const MatchupTable = () => {
	const [ teams, setTeams ] = useState({});
	const [ matchups, setMatchups ] = useState([]);
	const [ picks, setPicks ] = useState({});
	const [ unsavedPicks, setUnsavedPicks ] = useState({});
	const [ year, setYear ] = useState('');
	const [ week, setWeek ] = useState('01');
	const [ currentSeason, setCurrentSeason ] = useState({});
	const [ currentUser, setCurrentUser ] = useState('sharon');

	const updateUnsavedPicks = (matchupId, pick) => {
		const unsavedPicksCopy = {...unsavedPicks};
		unsavedPicksCopy[currentUser][matchupId] = pick;
		setUnsavedPicks(unsavedPicksCopy);
	}

	const savePicks = () => {
		const unsavedPicksMatchupKeys = Object.keys(unsavedPicks[currentUser]);

		unsavedPicksMatchupKeys.map(unsavedPickMatchup => {
			// Use values for current user, current year, and current week
			fetch('http://localhost:3001/picks/year/' + year + '/week/' + week + '/matchup/' + unsavedPickMatchup + '/user/' + currentUser, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(unsavedPicks[currentUser][unsavedPickMatchup])
			})
				.then(data => {
					console.log(data);
				}, (err) => {
					console.error(err);
				})
		})
	}

	useEffect(() => {
		fetch('http://localhost:3001/teams', {
			cache: "default"
		})
			.then(response => response.json())
			.then(data => {
				setTeams(data);
			});
	}, []);

	useEffect(() => {
		fetch('http://localhost:3001/currentSeason', {
			cache: "default"
		})
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
					setPicks(data);
					setUnsavedPicks(data);
				}, () => {
					console.error("Error: pick data not found (year: " + year + ", week: " + week + ")");
				});
		}
	}, [ year, week ]);
	
	return (
		<>
			<button onClick={savePicks}>Save Picks</button>
			<table className="table table-hover">
				<thead>
					<tr>
						<th>Favored</th>
						<th>Underdog</th>
						<th>Line</th>
						<th>Outcome</th>
						<th>Pick</th>
						<th>Set Pick</th>
					</tr>
				</thead>
				<tbody>
					{
						matchups.map((matchup, i) => {
							return <MatchupTableRow 
										key={"" + i}
										matchup={matchup}
										userPick={unsavedPicks[currentUser] ? unsavedPicks[currentUser][matchup.favoredTeamId + matchup.underdogTeamId] : {}}
										favoredTeam={teams[matchup.favoredTeamId]}
										underdogTeam={teams[matchup.underdogTeamId]}
										updateUnsavedPicks={updateUnsavedPicks}
									/>
						})
					}
				</tbody>
			</table>
		</>
	)
}

export default MatchupTable;