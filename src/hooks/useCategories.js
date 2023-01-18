import { useEffect, useState } from 'react';
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(true);

    const getCategories = async () => {
        //set loading state to true
        setLoading(true);
        // get reference to collection 'Questions'
        const ref = collection(db, 'Questions')
        //get the document snapshot from the collection
        const snapshot = await getDocs(ref)
        //map over the snapshot's documents and get unique categories
        const docs = [...new Set(snapshot.docs.map(doc => doc.data().category))]
        //set the state with the new categories
        setCategories(docs);
        setLoading(false);
    }

    useEffect(() => {
        getCategories();
    }, []);

    return {
        categories,
        loading,
        getCategories,
    };
}

export default useCategories;
