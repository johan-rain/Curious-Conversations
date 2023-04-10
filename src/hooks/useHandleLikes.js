import { useState } from 'react';
import { db } from '../firebase';
import { updateDoc, doc, arrayUnion, arrayRemove } from 'firebase/firestore';

const useHandleLikes = () => {
	const [error, setError] = useState(null);

	const likeQuestion = async (questionId, userId) => {
		if (!questionId || !userId) {
		setError("Invalid questionId or userId");
		return;
		}

		try {
		// Get the user's document reference
		const userDocRef = doc(db, 'users', userId);
		// Add the liked question to the user's likedQuestions field
		await updateDoc(userDocRef, {
			likedQuestions: arrayUnion(questionId)
		});
		} catch (err) {
		console.error('Error liking question: ', err);
		}
	};

	const unlikeQuestion = async (questionId, userId) => {
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
		} catch (err) {
		console.error('Error unliking question: ', err);
		}
	};

	return { likeQuestion, unlikeQuestion, error };
};

export default useHandleLikes;
