import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';

const useHandleLikes = () => {
    const [error, setError] = useState(null);
    const [questionId, setQuestionId] = useState(null);

    useEffect(() => {
        if (!questionId) {
            setError("Invalid questionId");
        } else {
            setError(null);
        }
    }, [questionId]);

    const likeQuestion = async (questionId) => {
        if (error || !auth.currentUser) {
            return;
        }

        try {
            // Get the question document reference
            const questionDocRef = db.doc(`Questions/${questionId}`);
            // Update the isLiked field
            await questionDocRef.update({ isLiked: true });
            // Get the user's document reference
            const userDocRef = db.doc(`users/${auth.currentUser.uid}`);
            // Add the liked question to the user's likedQuestions field
            await userDocRef.update({
                likedQuestions: db.FieldValue.arrayUnion(questionId)
            });
        } catch (err) {
            console.error('Error liking question: ', err);
        }
    };

    const unlikeQuestion = async (questionId) => {
        if (error || !auth.currentUser) {
            return;
        }

        try {
            // Get the question document reference
            const questionDocRef = db.doc(`Questions/${questionId}`);
            // Update the isLiked field
            await questionDocRef.update({ isLiked: false });
            // Get the user's document reference
            const userDocRef = db.doc(`users/${auth.currentUser.uid}`);
            // Remove the unliked question from the user's likedQuestions field
            await userDocRef.update({
                likedQuestions: db.FieldValue.arrayRemove(questionId)
            });
        } catch (err) {
            console.error('Error unliking question: ', err);
        }
    };

    return { likeQuestion, unlikeQuestion, error };
};

export default useHandleLikes;
