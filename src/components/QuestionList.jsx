import React, { useState } from 'react'
import useGetCollection from '../hooks/useGetCollection'

function QuestionList() {
	const { data, loading } = useGetCollection()
	const [currentQuestion, setCurrentQuestion] = useState(0)

	if (loading) {
	return <p>Loading...</p>
	}

	const handleNextQuestion = () => {
		setCurrentQuestion(Math.floor(Math.random() * data.length))
	}

	return (
		<div className='questions'>
			<p>{data[currentQuestion].text}</p>
			<button className='questions-btn' onClick={handleNextQuestion}>Next Question</button>
		</div>
	)
}

export default QuestionList
