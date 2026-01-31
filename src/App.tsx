import { BrowserRouter, Route, Routes } from 'react-router-dom';
import {
	CheckEmailPage,
	ConfirmDeletePage,
	DeleteAccountPage,
	LandingPage,
	NotFoundPage,
	PrivacyPage,
	SuccessPage,
	TermsPage,
	VerifyEmailPage,
} from './pages';

function App() {
	return (
		<BrowserRouter basename="/">
			<Routes>
				<Route path="/" element={<LandingPage />} />
				<Route path="/verify-email" element={<VerifyEmailPage />} />
				<Route path="/terms-conditions" element={<TermsPage />} />
				<Route path="/privacy-policy" element={<PrivacyPage />} />
				<Route path="/delete-account" element={<DeleteAccountPage />} />
				<Route path="/check-email" element={<CheckEmailPage />} />
				<Route path="/user/delete-request" element={<ConfirmDeletePage />} />
				<Route path="/success" element={<SuccessPage />} />
				<Route path="*" element={<NotFoundPage />} />
			</Routes>
		</BrowserRouter>
	);
}

export default App;
