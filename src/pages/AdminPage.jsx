import React, { useState, useEffect } from 'react';
import { Container, Card, Button, Alert, Form, Row, Col } from 'react-bootstrap';
import { db } from '../firebase/index';
import { collection, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

const AdminPage = () => {
	const [pendingQuestions, setPendingQuestions] = useState([]);
	const [error, setError] = useState(null);
	const [loading, setLoading] = useState(true);

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
		{error && <Alert variant="danger">{error}</Alert>}
		{loading ? (
			<p>Loading...</p>
		) : (
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
		</Container>
	);
};

export default AdminPage;
