import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";

const AddWeekModal = ({ isModalOpen, setIsModalOpen, weeks, addWeek }) => {
	const [ newWeek, setNewWeek ] = useState('');

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
			<Modal.Header>
				<Modal.Title>Add Week</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<Form>
					<Form.Group className="mb-3" controlId="formAddWeek">
						<Form.Label>Week Number</Form.Label>
						<Form.Control type="addWeek" placeholder="Enter new week number" onChange={e => setNewWeek(e.target.value)} />
					</Form.Group>
				</Form>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
					Close
				</Button>
				<Button
					variant="primary"
					disabled={newWeek.length === 0 || weeks.includes(newWeek.length === 1 ? "0" + newWeek : newWeek)}
					onClick={() => {
						addWeek(newWeek.length === 1 ? "0" + newWeek : newWeek);
						setIsModalOpen(false);
					}}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default AddWeekModal;