// hooks/useUserLikedQuestions.js
import { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';
import { doc, onSnapshot } from 'firebase/firestore';

const useUserLikedQuestions = () => {
	const { currentUser } = useAuthContext();
	const [likedQuestions, setLikedQuestions] = useState([]);

	useEffect(() => {
		if (!currentUser) return;

		const userDocRef = doc(db, 'users', currentUser.uid);
		const unsubscribe = onSnapshot(userDocRef, (snapshot) => {
		setLikedQuestions(snapshot.data().likedQuestions || []);
		});

		return () => unsubscribe();
	}, [currentUser]);

	return { likedQuestions };
};

export default useUserLikedQuestions;
