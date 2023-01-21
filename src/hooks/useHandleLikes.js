import { useEffect, useState } from 'react';
import { auth, db } from '../firebase';
import useGetCollection from '../hooks/useGetCollection';

const useHandleLikes = () => {
    const [error, setError] = useState(null);
    const { data, loading } = useGetCollection();
    const questionId = data && data[0] ? data[0].id : null;

    useEffect(() => {
        if (!questionId) {
            setError("Invalid questionId");
        } else {
            setError(null);
        }
    }, [questionId]);

    const likeQuestion = async () => {
        if (error || !auth.currentUser) {
            return;
        }
        try {
            // get user's doc reference
            const docRef = db.collection('users').doc(auth.currentUser.uid);
            // update the likedQuestions field by adding the questionId
            await docRef.update({
                likedQuestions: db.FieldValue.arrayUnion(questionId),
            });
        } catch (err) {
            setError(err.message);
        }
    };

    const unlikeQuestion = async () => {
        if (error || !auth.currentUser) {
            return;
        }
        try {
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
