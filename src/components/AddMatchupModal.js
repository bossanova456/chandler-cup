import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Dropdown from "react-bootstrap/Dropdown";
import Form from "react-bootstrap/Form";
import DateTimePicker from 'react-datetime-picker';

import { useState } from "react";

import 'react-datetime-picker/dist/DateTimePicker.css';

const AddMatchupModal = ({ isModalOpen, setIsModalOpen, teams, weekStart, addMatchup }) => {
	const [ selectedFavoredTeamId, setSelectedFavoredTeamId ] = useState('');
	const [ selectedUnderdogTeamId, setSelectedUnderdogTeamId ] = useState('');
	const [ selectedLine, setSelectedLine ] = useState();
	const [ date, setDate ] = useState(new Date(new Date(weekStart)));

	const weekEnd = new Date(new Date(weekStart).setDate(new Date(weekStart).getDate() + 7));
	console.log("week end: " + weekEnd.toLocaleString());

	const addMatchupButtonClick = () => {
		if (setSelectedFavoredTeamId !== '' && setSelectedUnderdogTeamId !== '' && selectedLine && date) {	
			addMatchup("" + selectedFavoredTeamId + selectedUnderdogTeamId,
				{
					"favoredTeamId": selectedFavoredTeamId,
					"underdogTeamId": selectedUnderdogTeamId,
					"line": selectedLine >= 0 ? selectedLine : -selectedLine,
					"game_start_ts": date.toString(),
					"favoredScore": 0,
					"underdogScore": 0,
					"isFinal": false
				}
			);

			setSelectedFavoredTeamId('');
			setSelectedUnderdogTeamId('');
			setSelectedLine();
			setIsModalOpen(false);
		} else {
			console.error("Missing required selections");
		}
	}

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
			<Modal.Header>
				<Modal.Title>Add Matchup</Modal.Title>
			</Modal.Header>
			<Modal.Body>
				Favored team
				<Dropdown>
					<Dropdown.Toggle variant="success" id="favored-dropdown">
						{selectedFavoredTeamId === '' ? "Select team" : teams[selectedFavoredTeamId].teamName}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{Object.keys(teams).map(teamId => {
							return <Dropdown.Item
								key={teamId} href={"#/" + teamId}
								onClick={() => setSelectedFavoredTeamId(teamId)}
							>
								{teams[teamId].teamName}
							</Dropdown.Item>
						})}
					</Dropdown.Menu>
				</Dropdown>
				
				Underdog team
				<Dropdown>
					<Dropdown.Toggle variant="success" id="underdog-dropdown">
						{selectedUnderdogTeamId === '' ? "Select team" : teams[selectedUnderdogTeamId].teamName}
					</Dropdown.Toggle>

					<Dropdown.Menu>
						{Object.keys(teams).map(teamId => {
							return <Dropdown.Item
								key={teamId} href={"#/" + teamId}
								onClick={() => setSelectedUnderdogTeamId(teamId)}
							>
								{teams[teamId].teamName}
							</Dropdown.Item>
						})}
					</Dropdown.Menu>
				</Dropdown>

				<Form>
					<Form.Group className="mb-3" controlId="formNewMatchupLine">
						<Form.Label>Line</Form.Label>
						<Form.Control type="line" placeholder="Enter line" onChange={e => setSelectedLine(e.target.value)} />
					</Form.Group>
				</Form>

				<DateTimePicker
					className="react-datetime-picker"
					minDate={new Date(weekStart)}
					maxDate={weekEnd}
					onChange={(d) => setDate(d)}
					value={date}
				/>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
					Close
				</Button>
				<Button variant="primary" disabled={setSelectedFavoredTeamId === '' || setSelectedUnderdogTeamId === '' || !selectedLine || !date} onClick={() => addMatchupButtonClick()}>
					Add
				</Button>
			</Modal.Footer>
		</Modal>
	);
}

export default AddMatchupModal;