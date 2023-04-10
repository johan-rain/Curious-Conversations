import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { getDoc, doc, getDocs, query, collection, where, updateDoc, arrayRemove } from 'firebase/firestore';
import { Container, Form, Button, Card, Alert,} from 'react-bootstrap'

const LikedQuestions = () => {
	const { currentUser } = useAuthContext();
	const [likedQuestions, setLikedQuestions] = useState([]);
	const [error, setError] = useState(null);

	const fetchLikedQuestions = async () => {
		try {
			// Get the user's document
			const userDoc = await getDoc(doc(db, 'users', currentUser.uid));
			const userData = userDoc.data();
	
			// Check if the user has liked any questions
			if (userData && userData.likedQuestions && userData.likedQuestions.length > 0) {
				// Fetch the liked questions
				const likedQuestionDocs = await getDocs(query(collection(db, 'Questions'), where('__name__', 'in', userData.likedQuestions)));
				const fetchedLikedQuestions = likedQuestionDocs.docs.map((doc) => ({ id: doc.id, ...doc.data() }));
				setLikedQuestions(fetchedLikedQuestions);
			} else {
				setLikedQuestions([]);
			}
		} catch (error) {
			console.error('Error fetching liked questions:', error);
		}
	};
	
	useEffect(() => {
		if (!currentUser) return;
	
		fetchLikedQuestions();
	}, [currentUser]);

	const unlikeQuestion = async (questionId, userId, fetchLikedQuestions) => {
		if (!questionId || !userId) {
			setError("Invalid questionId or userId");
			return;
		}

		try {
			// Get the user's document reference
			const userDocRef = doc(db, 'users', userId);
			// Remove the unliked question from the user's likedQuestions field
			await updateDoc(userDocRef, {
				likedQuestions: arrayRemove(questionId)
			});
			await fetchLikedQuestions();
		} catch (err) {
			console.error('Error unliking question: ', err);
		}
	};

	return (
		<div>
			<h2 className="text-center mb-4">Liked Questions</h2>
			{likedQuestions.length > 0 ? (
				<div className="d-flex flex-wrap justify-content-center">
					{likedQuestions.map((question) => (
						<Card key={question.id} className="m-3" style={{ width: '18rem' }}>
							<Card.Body>
								<Card.Title>{question.category}</Card.Title>
								<Card.Text>{question.text}</Card.Text>
								<Button variant="outline-danger" className="mt-3" onClick={() => unlikeQuestion(question.id, currentUser.uid, fetchLikedQuestions)}>
									Unlike
								</Button>
							</Card.Body>
						</Card>
					))}
				</div>
			) : (
				<p>No liked questions found.</p>
			)}
		</div>
	);
};

export default LikedQuestions;
