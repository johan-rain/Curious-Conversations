import React from 'react'
import useGetCollection from '../hooks/useGetCollection'


function QuestionList() {
	const { data, loading } = useGetCollection()

	if (loading) {
		return <p>Loading...</p>
	}

	return (
		<div>
			{data.map(question => (
				<p key={question.id}>{question.text}</p>
			))}
		</div>
	)
}

export default QuestionList