import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert, Form, Row, Col, Modal } from 'react-bootstrap';
import { db } from '../firebase/index';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
	const [pendingQuestions, setPendingQuestions] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);
	const [questions, setQuestions] = useState([]);
	const [newQuestion, setNewQuestion] = useState({ text: '', category: '' });
	const [editingQuestion, setEditingQuestion] = useState(null);
	const [showModal, setShowModal] = useState(false);
	const [selectedCategory, setSelectedCategory] = useState('');

	// Add new function to fetch all questions
	const fetchQuestions = async () => {
		setLoading(true);
		try {
			const querySnapshot = await getDocs(collection(db, 'Questions'));
			const fetchedQuestions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setQuestions(fetchedQuestions);
		} catch (error) {
			setError('Failed to fetch questions.');
		}
		setLoading(false);
	};

	// Add useEffect to fetch all questions
	useEffect(() => {
		fetchQuestions();
	}, []);

	// Render a new function to render the category buttons
	const renderCategoryButtons = () => {
		// Define your categories here
		const categories = ['Icebreakers', 'Relationship', 'Deeper'];
	
		return categories.map((category) => (
			<Button
				key={category}
				className="me-2 mb-3"
				variant={selectedCategory === category ? 'primary' : 'outline-primary'}
				onClick={() => setSelectedCategory(category)}
			>
				{category}
			</Button>
		));
	};

	// Add new function to handle input change for new and edited questions
	const handleInputChange = (e, setQuestion) => {
		const { name, value } = e.target;
		setQuestion((prevQuestion) => ({ ...prevQuestion, [name]: value }));
	};

	// Add new function to handle adding a new question
	const handleAddQuestion = async () => {
		try {
			await addDoc(collection(db, 'Questions'), newQuestion);
			setNewQuestion({ text: '', category: '' });
			fetchQuestions();
		} catch (error) {
			setError('Failed to add question.');
		}
	};

	// Add new function to handle updating an existing question
	const handleUpdateQuestion = async () => {
		try {
			await updateDoc(doc(db, 'Questions', editingQuestion.id), {
				text: editingQuestion.text,
				category: editingQuestion.category,
			});
			setEditingQuestion(null);
			setShowModal(false);
			fetchQuestions();
		} catch (error) {
			setError('Failed to update question.');
		}
	};

	// Add new function to open the edit modal and set the editing question
	const openEditModal = (question) => {
		setEditingQuestion(question);
		setShowModal(true);
	};

	const fetchPendingQuestions = async () => {
		setLoading(true);
		try {
			const querySnapshot = await getDocs(collection(db, 'pending_questions'));
			const fetchedQuestions = querySnapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
			setPendingQuestions(fetchedQuestions);
		} catch (error) {
			setError('Failed to fetch pending questions.');
		}
		setLoading(false);
	};

	useEffect(() => {
		fetchPendingQuestions();
	}, []);

	const approveQuestion = async (question) => {
		try {
			// Add question to the main collection
			await addDoc(collection(db, 'Questions'), {
				text: question.text,
				category: question.category,
			});
			// Remove the question from pending_questions
			await deleteDoc(doc(db, 'pending_questions', question.id));
			// Update the state
			setPendingQuestions(pendingQuestions.filter((q) => q.id !== question.id));
		} catch (error) {
			setError('Failed to approve question.');
		}
	};

	const rejectQuestion = async (questionId) => {
		try {
			// Remove the question from pending_questions
			await deleteDoc(doc(db, 'pending_questions', questionId));
			// Update the state
			setPendingQuestions(pendingQuestions.filter((q) => q.id !== questionId));
		} catch (error) {
			setError('Failed to reject question.');
		}
	};

	return (
		<Container className="py-3">
			<h2 className="text-center mb-4">Admin Page</h2>
			<h3 className="text-center mb-4">
				{pendingQuestions.length > 0 ? 'Submitted Questions' : 'No submitted questions at this time'}
			</h3>
			{error && <Alert variant="danger">{error}</Alert>}
			{loading ? (<p>Loading...</p>) 
				: (
				<Row>
					{pendingQuestions.map((question) => (
						<Col key={question.id} xs={12} md={6} lg={4} className="mb-3">
							<Card>
								<Card.Body>
									<Card.Title>{question.text}</Card.Title>
									<Card.Subtitle className="mb-2 text-muted">{question.category}</Card.Subtitle>
									<Button variant="success" className="me-2" onClick={() => approveQuestion(question)}>
										Approve
									</Button>
									<Button variant="danger" onClick={() => rejectQuestion(question.id)}>
										Reject
									</Button>
								</Card.Body>
							</Card>
						</Col>
					))}
				</Row>
			)}
			<h3 className="text-center mb-4">All Questions</h3>
			<Form>
				<Form.Group as={Row} className="mb-3">
					<Col sm={8} className='mb-3'>
						<Form.Control
							type="text"
							name="text"
							value={newQuestion.text}
							onChange={(e) => handleInputChange(e, setNewQuestion)}
							placeholder="Add new question"
						/>
					</Col>

					<Col sm={3} className='mb-3'>
						<Form.Control
							as="select"
							name="category"
							value={newQuestion.category}
							onChange={(e) => handleInputChange(e, setNewQuestion)}>
								<option value="Icebreakers">Icebreakers</option>
								<option value="Relationship">Relationship</option>
								<option value="Deeper">Deeper</option>
						</Form.Control>
					</Col>

					<Col sm={1}>
						<Button variant="primary" onClick={handleAddQuestion}>
							Add
						</Button>
					</Col>
				</Form.Group>
			</Form>

			<div className="d-flex justify-content-center mb-3">
				{renderCategoryButtons()}
			</div>
			
			<Row>
			{questions
				.filter((question) => question.category === selectedCategory)
				.map((question) => (
					<Col key={question.id} xs={12} md={6} lg={4} className="mb-3">
					<Card className='card-container'>
					<Card.Body className='card-content'>
						<Card.Title>{question.text}</Card.Title>
						<Card.Subtitle className="mb-2 text-muted">{question.category}</Card.Subtitle>
						<Button variant="warning" className="me-2" onClick={() => openEditModal(question)}>
						Edit
						</Button>
					</Card.Body>
					</Card>
				</Col>
				))}
			</Row>

			<Modal show={showModal} onHide={() => setShowModal(false)}>
				<Modal.Header closeButton>
					<Modal.Title>Edit Question</Modal.Title>
				</Modal.Header>
				<Modal.Body>
					{editingQuestion && (
						<Form>
							<Form.Group className="mb-3">
								<Form.Label>Question Text</Form.Label>
								<Form.Control
								type="text"
								name="text"
								value={editingQuestion.text}
								onChange={(e) => handleInputChange(e, setEditingQuestion)}
								/>
								</Form.Group>
								<Form.Group className="mb-3">
									<Form.Label>Category</Form.Label>
									<Form.Control
									as="select"
									name="category"
									value={editingQuestion.category}
									onChange={(e) => handleInputChange(e, setEditingQuestion)}
									>
										<option value="Icebreakers">Icebreakers</option>
										<option value="Relationship">Relationship</option>
										<option value="Deeper">Deeper</option>
									</Form.Control>
								</Form.Group>
						</Form>
					)}
				</Modal.Body>
				<Modal.Footer>
					<Button variant="secondary" onClick={() => setShowModal(false)}>
						Close
					</Button>
					<Button variant="primary" onClick={handleUpdateQuestion}>
						Save Changes
					</Button>
				</Modal.Footer>
			</Modal>
		</Container>
	);
};

export default AdminPage;
