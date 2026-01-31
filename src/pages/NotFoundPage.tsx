/**
 * Página 404 - No Encontrada
 */

import { Link } from 'react-router-dom';
import { Layout } from '../components/Layout';
import { usePageTitle } from '../hooks';

export function NotFoundPage() {
	usePageTitle('Página no encontrada - Pistis');

	return (
		<Layout variant="gradient" contentClassName="text-center">
			{/* Número 404 animado */}
			<div className="mb-8 relative">
				<div className="absolute inset-0 flex items-center justify-center">
					<div className="w-64 h-64 bg-blue-100 rounded-full blur-3xl opacity-30 animate-pulse-slow"></div>
				</div>
				<h1 className="text-[12rem] md:text-[16rem] font-black text-transparent bg-clip-text bg-linear-to-r from-blue-600 to-purple-600 leading-none animate-float relative">
					404
				</h1>
			</div>

			{/* Mensaje */}
			<div className="space-y-4 animate-fade-in-delay-1">
				<h2 className="text-3xl md:text-4xl font-bold text-gray-900">¡Oops! Página no encontrada</h2>
				<p className="text-lg md:text-xl text-gray-600 max-w-md mx-auto">
					Parece que esta página se ha perdido en el camino. No te preocupes, podemos llevarte de regreso.
				</p>
			</div>

			{/* Botones de acción */}
			<div className="mt-12 flex flex-col sm:flex-row gap-4 justify-center animate-fade-in-delay-2">
				<Link
					to="/"
					className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-linear-to-r from-blue-600 to-blue-700 text-white rounded-xl font-semibold hover:from-blue-700 hover:to-blue-800 transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
				>
					<svg
						className="w-5 h-5 transform group-hover:-translate-x-1 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
					</svg>
					Volver al inicio
				</Link>

				<a
					href="mailto:soporte@pistis.app"
					className="group inline-flex items-center justify-center gap-2 px-8 py-4 bg-white text-gray-700 rounded-xl font-semibold border-2 border-gray-200 hover:border-blue-600 hover:text-blue-600 transition-all duration-300 shadow-sm hover:shadow-md"
				>
					<svg
						className="w-5 h-5 transform group-hover:scale-110 transition-transform"
						fill="none"
						stroke="currentColor"
						viewBox="0 0 24 24"
					>
						<path
							strokeLinecap="round"
							strokeLinejoin="round"
							strokeWidth={2}
							d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
						/>
					</svg>
					Contactar soporte
				</a>
			</div>

			{/* Links rápidos */}
			<div className="mt-16 animate-fade-in-delay-3">
				<p className="text-sm text-gray-500 mb-4">¿Buscabas alguna de estas páginas?</p>
				<div className="flex flex-wrap justify-center gap-3">
					<Link
						to="/delete-account"
						className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						Eliminar cuenta
					</Link>
					<Link
						to="/terms-conditions"
						className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						Términos y condiciones
					</Link>
					<Link
						to="/privacy-policy"
						className="px-4 py-2 text-sm text-gray-600 hover:text-blue-600 hover:bg-blue-50 rounded-lg transition-colors"
					>
						Política de privacidad
					</Link>
				</div>
			</div>
		</Layout>
	);
}
