import Container from 'react-bootstrap/Container'
import { Image } from 'react-bootstrap'

const HomePage = () => {

	return (
		<Container
			fluid
			className='home'
		>
			<Image fluid className='logo' src='/src/assets/icons/logo.png' />

			<p className='logo-text'>Curious Conversations</p>
		</Container>
	)
}

export default HomePage
