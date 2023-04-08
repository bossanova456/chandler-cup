import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

import { useState } from "react";

const UpdateMatchupScoreModal = ({ teams, selectedMatchup, isModalOpen, setIsModalOpen, updateScore }) => {
	const [ selectedFavoredTeamScore, setSelectedFavoredTeamScore ] = useState();
	const [ selectedUnderdogTeamScore, setSelectedUnderdogTeamScore ] = useState();

	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
			<Modal.Header>
				<Modal.Title>Update Score</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<Form>
					<Form.Group className="mb-3" controlId="formNewMatchupLine">
						<Form.Label>{teams[selectedMatchup?.favoredTeamId]?.teamName}</Form.Label>
						<Form.Control type="line" placeholder="Enter score" onChange={e => setSelectedFavoredTeamScore(e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formNewMatchupLine">
						<Form.Label>{teams[selectedMatchup?.underdogTeamId]?.teamName}</Form.Label>
						<Form.Control type="line" placeholder="Enter score" onChange={e => setSelectedUnderdogTeamScore(e.target.value)} />
					</Form.Group>
				</Form>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
					Close
				</Button>
				<Button
					variant="primary"
					onClick={() => updateScore(selectedFavoredTeamScore, selectedUnderdogTeamScore)}
				>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default UpdateMatchupScoreModal;