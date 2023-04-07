import React, { useState } from 'react';
import { Container, Form, Button, Card, Alert } from 'react-bootstrap';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../firebase/index';
import { collection, addDoc } from 'firebase/firestore';

const SubmitQuestion = () => {
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(false);
	const [question, setQuestion] = useState('');
	const [category, setCategory] = useState('Icebreakers');
	const { currentUser } = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();

		if (!currentUser) {
		setError('Please log in to submit a question.');
		return;
		}

		setError(null);
		setLoading(true);

		try {
			const pendingQuestionsRef = collection(db, 'pending_questions');
			await addDoc(pendingQuestionsRef, {
				text: question,
				category: category,
				userId: currentUser.uid,
			});

		setQuestion('');
		setCategory('Icebreakers');
		setLoading(false);
		} catch (err) {
		setError('Failed to submit question.');
		setLoading(false);
		console.error('Error adding question:', err);
		}
	};

	return (
		<Container className="py-3 center-y">
		<Card>
			<Card.Body>
			<Card.Title className="mb-2 text-center">Submit Question</Card.Title>

			{error && <Alert variant="danger">{error}</Alert>}

			<Form onSubmit={handleSubmit}>
				<Form.Group controlId="question" className="mb-2">
				<Form.Label>Question</Form.Label>
				<Form.Control
					as="textarea"
					rows={3}
					value={question}
					onChange={(e) => setQuestion(e.target.value)}
					required
				/>
				</Form.Group>

				<Form.Group controlId="category" className="mb-2">
				<Form.Label>Category</Form.Label>
				<Form.Select
					value={category}
					onChange={(e) => setCategory(e.target.value)}
					required
				>
					<option value="Icebreakers">Icebreakers</option>
					<option value="Relationship">Relationship</option>
					<option value="Deeper">Deeper</option>
				</Form.Select>
				</Form.Group>

				<Button disabled={loading} type="submit">
				Submit Question
				</Button>
			</Form>
			</Card.Body>
		</Card>
		</Container>
	);
};

export default SubmitQuestion;
