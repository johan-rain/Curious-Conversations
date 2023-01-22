import React, { useState, useEffect } from 'react';
import { useAuthContext } from '../contexts/AuthContext';
import { db } from '../firebase';

const LikedQuestions = () => {
	const { currentUser } = useAuthContext();
	const [likedQuestions, setLikedQuestions] = useState([]);

	// useEffect(() => {
	// 	if (!currentUser) return;

	// 	const unsubscribe = db.collection("users")
	// 		.doc(currentUser.uid)
	// 		.onSnapshot(snapshot => {
	// 		setLikedQuestions(snapshot.data().likedQuestions);
	// 		});
	// 	return () => unsubscribe();
	// }, [currentUser]);

	return (
		<div>
			{/* <h2>Liked Questions</h2>
			{likedQuestions.map(question => (
				<div key={question.id}>
					<p>{question.text}</p>
				</div>
			))} */}
			<h1 className='text-center'>This feature will come in the future</h1>
		</div>
	);
	};

export default LikedQuestions;
