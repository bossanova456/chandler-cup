import MatchupTable from "./MatchupTable";
import AddMatchupModal from "./AddMatchupModal";
import AddWeekModal from "./AddWeekModal";
import UpdateMatchupScoreModal from "./UpdateMatchupScoreModal";

import { useState, useEffect } from "react";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const BACKEND_PORT = process.env.REACT_APP_BACKEND_PORT;

const MatchupContainer = () => {

	const [ teams, setTeams ] = useState({});
	const [ savedMatchups, setSavedMatchups ] = useState([]);
	const [ picks, setPicks ] = useState({});
	const [ savedPicks, setSavedPicks ] = useState({});
	const [ unsavedPicks, setUnsavedPicks ] = useState({});
	const [ year, setYear ] = useState('');
	const [ currentWeek, setCurrentWeek ] = useState('01');
	const [ currentSeason, setCurrentSeason ] = useState({});
	const [ currentUser, setCurrentUser ] = useState('sharon');
	const [ schedule, setSchedule ] = useState({});
	const [ weekStart, setWeekStart ] = useState();
	const [ weekEnd, setWeekEnd ] = useState();
	const [ matchupWeeks, setMatchupWeeks ] = useState([]);

	const [ selectedMatchupId, setSelectedMatchupId ] = useState('');
	const [ selectedMatchup, setSelectedMatchup ] = useState({});

	const [ addMatchupModalOpen, setAddMatchupModalOpen ] = useState(false);
	const [ updateMatchupScoreModalOpen, setUpdateMatchupScoreModalOpen ] = useState(false);
	const [ addWeekModalOpen, setAddweekModalOpen ] = useState(false);

	///////////////////////////////////////////////////////////////////

	const writeMatchupData = (matchupId, matchupData) => {
		fetch(BACKEND_URL + ':' + BACKEND_PORT + '/matchups/year/' + year + '/week/' + currentWeek + '/matchup/' + matchupId, {
			method: "POST",
			headers: {'Content-Type': 'application/json'},
			body: JSON.stringify(matchupData[matchupId])
		})
			.then(() => {
				setSavedMatchups(matchupData);
			}, (err) => {
				console.error(err);
			})
	}

	const addMatchup = (matchupId, matchup) => {
		const matchupDataCopy = {...savedMatchups};
		matchupDataCopy[matchupId] = matchup;

		writeMatchupData(matchupId, matchupDataCopy);
	}

	const selectMatchup = (matchupId) => {
		setSelectedMatchupId(matchupId);
		setSelectedMatchup(savedMatchups[matchupId])
		setUpdateMatchupScoreModalOpen(true);
	}

	///////////////////////////////////////////////////////////////////

	const updateScore = (favoredTeamScore, underdogTeamScore) => {
		const updatedScoreMatchupData = { ...savedMatchups };

		updatedScoreMatchupData[selectedMatchupId].favoredScore = favoredTeamScore;
		updatedScoreMatchupData[selectedMatchupId].underdogScore = underdogTeamScore;

		writeMatchupData(selectedMatchupId, updatedScoreMatchupData);
		setUpdateMatchupScoreModalOpen(false);
	}

	///////////////////////////////////////////////////////////////////

	const updateUnsavedPicks = (matchupId, pick) => {
		const unsavedPicksCopy = {...savedPicks};
		unsavedPicksCopy[currentUser][matchupId] = pick;
		setSavedPicks(unsavedPicksCopy);
	}

	const savePicks = () => {
		const unsavedPicksMatchupKeys = Object.keys(savedPicks[currentUser]);

		unsavedPicksMatchupKeys.map(unsavedPickMatchup => {
			// Use values for current user, current year, and current week
			fetch(BACKEND_URL + ':' + BACKEND_PORT + '/picks/year/' + year + '/week/' + currentWeek + '/matchup/' + unsavedPickMatchup + '/user/' + currentUser, {
				method: "POST",
				headers: {'Content-Type': 'application/json'},
				body: JSON.stringify(savedPicks[currentUser][unsavedPickMatchup])
			})
				.then(() => {
					console.log('Save pick: SUCCESS');
				}, (err) => {
					console.error(err);
				})
		})
	}

	///////////////////////////////////////////////////////////////////

	const addWeek = (newWeek) => {
		console.log("Entering Add Week method");

		fetch(BACKEND_URL + ':' + BACKEND_PORT + '/matchups/year/' + year + '/addWeek/' + newWeek, {
			method: "POST",
		})
			.then(() => {
				setMatchupWeeks([...matchupWeeks, newWeek]);
			}, (err) => {
				console.error(err);
			})
	}

	///////////////////////////////////////////////////////////////////

	// Get matchup weeks
	useEffect(() => {
		if (year) {
			fetch(BACKEND_URL + ':' + BACKEND_PORT + '/matchups/year/' + year + '/weeks', {
				cache: 'default'
			})
				.then(response => response.json())
				.then(weekData => {
					setMatchupWeeks(weekData);
				}, (err) => {
					console.error(err);
				})
		}
	}, [ year ])

	// Get schedule
	useEffect(() => {
		if (year) {
			fetch(BACKEND_URL + ':' + BACKEND_PORT + '/schedule/year/' + year, {
				cache: 'default'
			})
				.then(response => response.json())
				.then(scheduleData => {
					setSchedule(scheduleData);

					if (currentWeek) {
						setWeekStart(new Date(scheduleData[currentWeek]));
						setWeekEnd(new Date(new Date(scheduleData[currentWeek]).setDate(new Date(scheduleData[currentWeek]).getDate() + 7)));
					}
				}, err => {
					console.error(err);
				})
		}
	}, [ year, currentWeek ]);

	// Get teams
	useEffect(() => {
		fetch(BACKEND_URL + ':' + BACKEND_PORT + '/teams', {
			cache: "default"
		})
			.then(response => response.json())
			.then(data => {
				setTeams(data);
			});
	}, []);

	// Get current season
	useEffect(() => {
		fetch(BACKEND_URL + ':' + BACKEND_PORT + '/currentSeason', {
			cache: "default"
		})
			.then(response => response.json())
			.then(data => {
				setCurrentSeason(data);
				setYear(data.year);
				setCurrentWeek(data.week);
			});
	}, []);

	// Should use current year data from call
	useEffect(() => {
		if (year && currentWeek) {
			// Get matchups
			fetch(BACKEND_URL + ':' + BACKEND_PORT + '/matchups/year/' + year + '/week/' + currentWeek)
				.then(response => response.json())
				.then(data => {
					setSavedMatchups(data);
				}, () => {
					console.error("Error: could not get matchup data (year: " + year + ", week: " + currentWeek + ")");
				});

			// Get picks
			fetch(BACKEND_URL + ':' + BACKEND_PORT + '/picks/year/' + year + '/week/' + currentWeek)
				.then(response => response.json())
				.then(data => {
					setPicks(data);
					setSavedPicks(data);
				}, () => {
					console.error("Error: pick data not found (year: " + year + ", week: " + currentWeek + ")");
				});
		}
	}, [ year, currentWeek ]);

	return (
		<>
			<Button onClick={savePicks}>Save Picks</Button>
			<Button onClick={() => setAddMatchupModalOpen(true)}>Add Matchup</Button>
			<Button onClick={() => setAddweekModalOpen(true)}>Add Week</Button>
			
			<Dropdown>
					<Dropdown.Toggle variant="success" id="select-week-dropdown">
						Select Week
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{matchupWeeks.sort((a, b) => {
							if (parseInt(a) > parseInt(b)) return 1;
							if (parseInt(a) < parseInt(b)) return -1;
							return 0;
						}).map(week => {
							return <Dropdown.Item
								key={week} href={"#/" + week}
								onClick={() => setCurrentWeek((week.length === 1 ? "0" : "") + week)}
							>
								{week}
							</Dropdown.Item>
						})}
					</Dropdown.Menu>
				</Dropdown>

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

			<AddWeekModal
				isModalOpen={addWeekModalOpen}
				setIsModalOpen={setAddweekModalOpen}
				weeks={matchupWeeks}
				addWeek={addWeek}
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