import { useEffect, useState } from 'react'
import { collection, getDocs } from 'firebase/firestore'
import { db } from '../firebase'

const useGetCollection = () => {
	const [data, setData] = useState([])
	const [loading, setLoading] = useState(true)

	const getData = async () => {
		//set loading state to true
		setLoading(true)
		// get reference to collection 'questions'
		const ref = collection(db, 'Questions')
		//get the document snapshot from the collection
		const snapshot = await getDocs(ref)
		//map over the snapshot's documents
		const docs = snapshot.docs.map(doc => {
			//returning a new object for each document that includes the `id` and all of the document's data
			return {
				id: doc.id,
				...doc.data(),
			}
		})
		//set the state with the new docs
		setData(docs)
		setLoading(false)
	}
	//useEffect to invoke the `getData` function once when the component is first rendered
	useEffect(() => {
		getData()
	}, [])
	//return an object that contains the data, loading state, and the `getData` function
	return {
		data,
		loading,
		getData,
	}
}

export default useGetCollection
