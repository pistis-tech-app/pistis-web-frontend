/**
 * Página de verificación de email mediante token
 */

import { useEffect, useState, useRef } from 'react';
import { useSearchParams, Link } from 'react-router-dom';
import { Layout } from '../../components/Layout';
import { LoadingSpinner } from '../../components/LoadingSpinner';
import { verifyEmailByToken } from '../../services/api';
import { usePageTitle } from '../../hooks';

type VerificationState = 'loading' | 'success' | 'error' | 'already-verified';

export function VerifyEmailPage() {
	usePageTitle('Verificar correo - Pistis');

	const [searchParams] = useSearchParams();
	const [state, setState] = useState<VerificationState>('loading');
	const [errorMessage, setErrorMessage] = useState('');
	const token = searchParams.get('token');
	const hasVerified = useRef(false);

	useEffect(() => {
		// Evitar doble llamada en React StrictMode (desarrollo)
		if (hasVerified.current) return;

		const verifyEmail = async () => {
			if (!token) {
				setState('error');
				setErrorMessage('Token de verificación no proporcionado. Por favor, usa el enlace completo del correo.');
				return;
			}

			hasVerified.current = true;

			try {
				await verifyEmailByToken(token);
				setState('success');
			} catch (err) {
				const message = err instanceof Error ? err.message : 'Error desconocido';

				if (message.includes('ya ha sido verificado')) {
					setState('already-verified');
				} else {
					setState('error');
					setErrorMessage(message);
				}
			}
		};

		verifyEmail();
	}, [token]);

	return (
		<Layout>
			<div className="bg-white rounded-lg shadow-lg border border-gray-200 p-8">
				{state === 'loading' && (
					<div className="text-center">
						<LoadingSpinner />
						<h2 className="text-xl font-semibold text-gray-900 mt-4 mb-2">Verificando tu correo...</h2>
						<p className="text-gray-600">Por favor, espera un momento mientras confirmamos tu correo electrónico.</p>
					</div>
				)}

				{state === 'success' && (
					<div className="text-center">
						{/* Success Icon */}
						<div className="mb-4">
							<div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto">
								<svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
								</svg>
							</div>
						</div>

						<h2 className="text-2xl font-bold text-gray-900 mb-2">¡Correo verificado exitosamente!</h2>
						<p className="text-gray-600 mb-6">
							Tu cuenta de Pistis ha sido verificada. Ya puedes cerrar esta ventana y continuar usando la aplicación
							móvil.
						</p>

						<div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-6">
							<p className="text-sm text-blue-800">
								<strong>¿Qué hacer ahora?</strong>
								<br />
								Abre la aplicación Pistis en tu dispositivo móvil y disfruta de todos los beneficios de compartir viajes
								con tu comunidad.
							</p>
						</div>

						<Link
							to="/"
							className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
						>
							Ir al inicio
						</Link>
					</div>
				)}

				{state === 'already-verified' && (
					<div className="text-center">
						{/* Info Icon */}
						<div className="mb-4">
							<div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto">
								<svg className="w-8 h-8 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path
										strokeLinecap="round"
										strokeLinejoin="round"
										strokeWidth={2}
										d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
									/>
								</svg>
							</div>
						</div>

						<h2 className="text-2xl font-bold text-gray-900 mb-2">Correo ya verificado</h2>
						<p className="text-gray-600 mb-6">
							Este correo electrónico ya ha sido verificado anteriormente. Puedes continuar usando tu cuenta de Pistis
							normalmente.
						</p>

						<Link
							to="/"
							className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
						>
							Ir al inicio
						</Link>
					</div>
				)}

				{state === 'error' && (
					<div className="text-center">
						{/* Error Icon */}
						<div className="mb-4">
							<div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto">
								<svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
									<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
								</svg>
							</div>
						</div>

						<h2 className="text-2xl font-bold text-gray-900 mb-2">Error al verificar</h2>
						<p className="text-gray-600 mb-6">{errorMessage}</p>

						<div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
							<p className="text-sm text-yellow-800">
								<strong>¿Necesitas ayuda?</strong>
								<br />
								Si el problema persiste, por favor contacta al soporte de Pistis desde la aplicación móvil.
							</p>
						</div>

						<Link
							to="/"
							className="inline-block px-6 py-3 bg-blue-600 text-white rounded-full font-semibold hover:bg-blue-700 transition-colors"
						>
							Ir al inicio
						</Link>
					</div>
				)}
			</div>
		</Layout>
	);
}
