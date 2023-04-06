import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import Form from "react-bootstrap/Form";

const UpdateMatchupScoreModal = ({ teams, isModalOpen, setIsModalOpen }) => {
	return (
		<Modal show={isModalOpen} onHide={() => setIsModalOpen(false)}>
			<Modal.Header>
				<Modal.Title>Update Score</Modal.Title>
			</Modal.Header>
			<Modal.Body>

				<Form>
					<Form.Group className="mb-3" controlId="formNewMatchupLine">
						<Form.Label>Favored Score</Form.Label>
						<Form.Control type="line" placeholder="Enter score" onChange={e => console.log("Entering favored score: " + e.target.value)} />
					</Form.Group>
					<Form.Group className="mb-3" controlId="formNewMatchupLine">
						<Form.Label>Underdog Score</Form.Label>
						<Form.Control type="line" placeholder="Enter score" onChange={e => console.log("Entering underdog score: " + e.target.value)} />
					</Form.Group>
				</Form>

			</Modal.Body>
			<Modal.Footer>
				<Button variant="secondary" onClick={() => setIsModalOpen(false)}>
					Close
				</Button>
				<Button variant="primary" disabled={false} onClick={() => console.log("Clicked score submit button")}>
					Submit
				</Button>
			</Modal.Footer>
		</Modal>
	)
}

export default UpdateMatchupScoreModal;