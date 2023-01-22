import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import useGetCollection from '../hooks/useGetCollection';

const useHandleLikes = () => {
    const [error, setError] = useState(null);
    const { data } = useGetCollection();
    const questionId = data && data[0] ? data[0].id : null;

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
		console.log("questionId: ", questionId);
		console.log("path to collection: ", db.collection('Questions'));

        try {
            // get question's doc reference
            const questionRef = db.collection('Questions').doc(questionId);
            // update the isLiked field
            await questionRef.update({
                isLiked: true,
            });
            // get user's doc reference
            const docRef = db.collection('users').doc(auth.currentUser.uid);
            // update the likedQuestions field by adding the questionId
            await docRef.update({
                likedQuestions: db.FieldValue.arrayUnion(questionId),
            });
        } catch (err) {
			console.log("Error: ", err.message);
            setError(err.message);
        }
    };

    const unlikeQuestion = async (questionId) => {
        if (error || !auth.currentUser) {
            return;
        }
        try {
             // get question's doc reference
            const questionRef = db.collection('Questions').doc(questionId);
             // update the isLiked field
            await questionRef.update({
                isLiked: false,
            });
            // get user's doc reference
            const docRef = db.collection('users').doc(auth.currentUser.uid);
            // update the likedQuestions field by removing the questionId
            await docRef.update({
                likedQuestions: db.FieldValue.arrayRemove(questionId),
            });
        } catch (err) {
            setError(err.message);
        }
    };

    return { likeQuestion, unlikeQuestion, error };
};

export default useHandleLikes;
