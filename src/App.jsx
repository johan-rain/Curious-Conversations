import { Routes, Route } from 'react-router-dom'
import Navigation from './pages/partials/Navigation'
import RequireAuth from './components/RequireAuth'
import ForgotPasswordPage from './pages/ForgotPasswordPage'
import HomePage from './pages/HomePage'
import LoginPage from './pages/LoginPage'
import LogoutPage from './pages/LogoutPage'
import NotFound from './pages/NotFound'
import SignupPage from './pages/SignupPage'
import UpdateProfilePage from './pages/UpdateProfilePage'
import LikedQuestions from './pages/LikedQuestions'
import SubmitQuestion from './pages/SubmitQuestions'
import AdminPage from './pages/AdminPage'
import './assets/scss/App.scss'

function App() {
	return (
		<div id="App">
			<Navigation />

			<Routes>
				<Route path="*" element={<NotFound />} />
				<Route path="/" element={<HomePage />} />
				<Route path="/forgot-password" element={<ForgotPasswordPage />} />
				<Route path="/login" element={<LoginPage />} />
				<Route path="/logout" element={<LogoutPage />} />
				<Route path="/signup" element={<SignupPage />} />

				<Route path="/update-profile" element={
					<RequireAuth>
						<UpdateProfilePage />
					</RequireAuth>
				} />
				<Route path="/liked-questions" element={
					<RequireAuth>
						<LikedQuestions />
					</RequireAuth>
				} />
				<Route path="/submit-question" element={
					<RequireAuth>
						<SubmitQuestion />
					</RequireAuth>
				} />
				<Route path="/admin" element={
					<RequireAuth>
						<AdminPage />
					</RequireAuth>
				} />
			</Routes>
		</div>
	)
}

export default App
