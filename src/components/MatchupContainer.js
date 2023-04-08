import MatchupTable from "./MatchupTable";
import AddMatchupModal from "./AddMatchupModal";
import UpdateMatchupScoreModal from "./UpdateMatchupScoreModal";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";

const MatchupContainer = () => {
	const [ teams, setTeams ] = useState({});
	const [ savedMatchups, setSavedMatchups ] = useState([]);
	const [ picks, setPicks ] = useState({});
	const [ savedPicks, setSavedPicks ] = useState({});
	const [ unsavedPicks, setUnsavedPicks ] = useState({});
	const [ year, setYear ] = useState('');
	const [ week, setWeek ] = useState('01');
	const [ currentSeason, setCurrentSeason ] = useState({});
	const [ currentUser, setCurrentUser ] = useState('sharon');
	const [ schedule, setSchedule ] = useState({});
	const [ weekStart, setWeekStart ] = useState();
	const [ weekEnd, setWeekEnd ] = useState();

	const [ selectedMatchupId, setSelectedMatchupId ] = useState('');
	const [ selectedMatchup, setSelectedMatchup ] = useState({});

	const [ addMatchupModalOpen, setAddMatchupModalOpen ] = useState(false);
	const [ updateMatchupScoreModalOpen, setUpdateMatchupScoreModalOpen ] = useState(false);

	///////////////////////////////////////////////////////////////////

	const writeMatchupData = (matchupId, matchupData) => {
		fetch('http://192.168.1.51:3001/matchups/year/' + year + '/week/' + week + '/matchup/' + matchupId, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(matchupData[matchupId])
		})
			.then(data => {
				setSavedMatchups(matchupData);
			}, (err) => {
				console.error(err);
			})
	}

	const addMatchup = (matchupId, matchup) => {
		console.log("Add Matchup function entered - matchupId: " + matchupId + " | " + JSON.stringify(matchup));

		const matchupDataCopy = {...savedMatchups};
		matchupDataCopy[matchupId] = matchup;

		writeMatchupData(matchupId, matchupDataCopy);
	}

	const selectMatchup = (matchupId) => {
		setSelectedMatchupId(matchupId);
		setSelectedMatchup(savedMatchups[matchupId])
		setUpdateMatchupScoreModalOpen(true);
	}

	const updateScore = (favoredTeamScore, underdogTeamScore) => {
		console.log("Entering update score method: " + selectedMatchupId + " | " + favoredTeamScore + " | " + underdogTeamScore);

		const updatedScoreMatchupData = { ...savedMatchups };

		updatedScoreMatchupData[selectedMatchupId].favoredScore = favoredTeamScore;
		updatedScoreMatchupData[selectedMatchupId].underdogScore = underdogTeamScore;

		writeMatchupData(selectedMatchupId, updatedScoreMatchupData);
		setUpdateMatchupScoreModalOpen(false);
	}

	const updateUnsavedPicks = (matchupId, pick) => {
		const unsavedPicksCopy = {...savedPicks};
		unsavedPicksCopy[currentUser][matchupId] = pick;
		setSavedPicks(unsavedPicksCopy);
	}

	const savePicks = () => {
		const unsavedPicksMatchupKeys = Object.keys(savedPicks[currentUser]);

		unsavedPicksMatchupKeys.map(unsavedPickMatchup => {
			// Use values for current user, current year, and current week
			fetch('http://192.168.1.51:3001/picks/year/' + year + '/week/' + week + '/matchup/' + unsavedPickMatchup + '/user/' + currentUser, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(savedPicks[currentUser][unsavedPickMatchup])
			})
				.then(data => {
					console.log('Save pick: SUCCESS');
				}, (err) => {
					console.error(err);
				})
		})
	}

	// Get schedule
	useEffect(() => {
		if (year) {
			fetch('http://192.168.1.51:3001/schedule/year/' + year, {
				cache: 'default'
			})
				.then(response => response.json())
				.then(scheduleData => {
					setSchedule(scheduleData);

					if (week) {
						setWeekStart(new Date(scheduleData[week]));
						setWeekEnd(new Date(new Date(scheduleData[week]).setDate(new Date(scheduleData[week]).getDate() + 7)));
					}
				}, err => {
					console.error(err);
				})
		}
	}, [ year, week ]);

	// Get teams
	useEffect(() => {
		fetch('http://192.168.1.51:3001/teams', {
			cache: "default"
		})
			.then(response => response.json())
			.then(data => {
				setTeams(data);
			});
	}, []);

	useEffect(() => {
		fetch('http://192.168.1.51:3001/currentSeason', {
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
			// Get matchups
			fetch('http://192.168.1.51:3001/matchups/year/' + year + '/week/' + week)
				.then(response => response.json())
				.then(data => {
					setSavedMatchups(data);
				}, () => {
					console.error("Error: could not get matchup data (year: " + year + ", week: " + week + ")");
				});

			// Get picks
			fetch('http://192.168.1.51:3001/picks/year/' + year + '/week/' + week)
				.then(response => response.json())
				.then(data => {
					setPicks(data);
					setSavedPicks(data);
				}, () => {
					console.error("Error: pick data not found (year: " + year + ", week: " + week + ")");
				});
		}
	}, [ year, week ]);

	return (
		<>
			<Button onClick={savePicks}>Save Picks</Button>
			<Button onClick={() => setAddMatchupModalOpen(true)}>Add Matchup</Button>

			<AddMatchupModal
				isModalOpen={addMatchupModalOpen}
				setIsModalOpen={setAddMatchupModalOpen}
				teams={teams}
				weekStart={weekStart}
				weekEnd={weekEnd}
				addMatchup={addMatchup}
			/>

			<UpdateMatchupScoreModal
				isModalOpen={updateMatchupScoreModalOpen}
				setIsModalOpen={setUpdateMatchupScoreModalOpen}
				teams={teams}
				selectedMatchupId={selectedMatchupId}
				selectedMatchup={selectedMatchup}
				updateScore={updateScore}
			/>

			<MatchupTable 
				matchups={savedMatchups}
				teams={teams}
				unsavedPicks={savedPicks}
				user={currentUser}
				updateUnsavedPicks={updateUnsavedPicks}
				selectMatchup={selectMatchup}
			/>
		</>
	);
}

export default MatchupContainer;