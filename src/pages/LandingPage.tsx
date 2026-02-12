/**
 * Landing Page de Pistis
 */

import { Layout } from '../components/Layout';
import { usePageTitle } from '../hooks';

const FEATURES = [
	{
		icon: (
			<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75 11.25 15 15 9.75m-3-7.036A11.959 11.959 0 0 1 3.598 6 11.99 11.99 0 0 0 3 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285Z" />
			</svg>
		),
		title: 'Seguro',
		description: 'Transacciones protegidas y verificadas dentro de tu comunidad.',
	},
	{
		icon: (
			<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 0 0 3.741-.479 3 3 0 0 0-4.682-2.72m.94 3.198.001.031c0 .225-.012.447-.037.666A11.944 11.944 0 0 1 12 21c-2.17 0-4.207-.576-5.963-1.584A6.062 6.062 0 0 1 6 18.719m12 0a5.971 5.971 0 0 0-.941-3.197m0 0A5.995 5.995 0 0 0 12 12.75a5.995 5.995 0 0 0-5.058 2.772m0 0a3 3 0 0 0-4.681 2.72 8.986 8.986 0 0 0 3.74.477m.94-3.197a5.971 5.971 0 0 0-.94 3.197M15 6.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Zm6 3a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Zm-13.5 0a2.25 2.25 0 1 1-4.5 0 2.25 2.25 0 0 1 4.5 0Z" />
			</svg>
		),
		title: 'Comunidad',
		description: 'Conecta con los miembros de tu organización de forma directa.',
	},
	{
		icon: (
			<svg className="w-7 h-7" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor">
				<path strokeLinecap="round" strokeLinejoin="round" d="M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 0 1 3 19.875v-6.75ZM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V8.625ZM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 0 1-1.125-1.125V4.125Z" />
			</svg>
		),
		title: 'Medible',
		description: 'Resultados claros y métricas de confianza para cada interacción.',
	},
];

export function LandingPage() {
	usePageTitle('Pistis - El sistema de confianza para comunidades cerradas');

	return (
		<Layout variant="full" contentClassName="py-0" showHeader={false}>
			{/* Hero section */}
			<div className="relative overflow-hidden bg-gradient-to-br from-indigo-50 via-white to-purple-50">
				{/* Decorative blurred circles */}
				<div className="absolute -top-24 -left-24 w-96 h-96 bg-indigo-200/40 rounded-full blur-3xl pointer-events-none" />
				<div className="absolute -bottom-24 -right-24 w-96 h-96 bg-purple-200/40 rounded-full blur-3xl pointer-events-none" />

				<div className="relative container mx-auto px-4 max-w-4xl py-20 md:py-28">
					<div className="space-y-12">
						{/* Logo */}
						<section className="text-center">
							<img
								src="/pistis-logo.png"
								alt="Pistis"
								className="h-24 md:h-32 mx-auto mb-4 hover:scale-105 transition-transform duration-300"
							/>
						</section>

						{/* Badge + Heading */}
						<section className="text-center space-y-6">
							<span className="inline-block bg-indigo-100 text-indigo-700 text-sm font-semibold px-4 py-1.5 rounded-full">
								Disponible en Android e iOS
							</span>
							<h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
								El sistema de confianza para{' '}
								<span className="text-indigo-600">comunidades cerradas</span>
							</h1>
							<p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto leading-relaxed">
								Una app para que los miembros de una organización puedan ofrecer, pedir y cumplir servicios de
								forma simple, segura y medible.
							</p>
						</section>

						{/* Download buttons */}
						<section className="text-center space-y-4">
							<div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
								<a
									href="https://play.google.com"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-200 font-medium text-lg"
								>
									<svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
										<path d="M3,20.5V3.5C3,2.91 3.34,2.39 3.84,2.15L13.69,12L3.84,21.85C3.34,21.6 3,21.09 3,20.5M16.81,15.12L6.05,21.34L14.54,12.85L16.81,15.12M20.16,10.81C20.5,11.08 20.75,11.5 20.75,12C20.75,12.5 20.5,12.92 20.16,13.19L17.89,14.5L15.39,12L17.89,9.5L20.16,10.81M6.05,2.66L16.81,8.88L14.54,11.15L6.05,2.66Z" />
									</svg>
									Descargar para Android
								</a>
								<a
									href="https://apps.apple.com"
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-3 bg-gray-900 text-white px-8 py-4 rounded-xl hover:bg-gray-800 hover:shadow-lg transition-all duration-200 font-medium text-lg"
								>
									<svg className="w-7 h-7" viewBox="0 0 24 24" fill="currentColor">
										<path d="M18.71,19.5C17.88,20.74 17,21.95 15.66,21.97C14.32,22 13.89,21.18 12.37,21.18C10.84,21.18 10.37,21.95 9.1,22C7.79,22.05 6.8,20.68 5.96,19.47C4.25,17 2.94,12.45 4.7,9.39C5.57,7.87 7.13,6.91 8.82,6.88C10.1,6.86 11.32,7.75 12.11,7.75C12.89,7.75 14.37,6.68 15.92,6.84C16.57,6.87 18.39,7.1 19.56,8.82C19.47,8.88 17.39,10.1 17.41,12.63C17.44,15.65 20.06,16.66 20.09,16.67C20.06,16.74 19.67,18.11 18.71,19.5M13,3.5C13.73,2.67 14.94,2.04 15.94,2C16.07,3.17 15.6,4.35 14.9,5.19C14.21,6.04 13.07,6.7 11.95,6.61C11.8,5.46 12.36,4.26 13,3.5Z" />
									</svg>
									Descargar para iOS
								</a>
							</div>
						</section>
					</div>
				</div>
			</div>

			{/* Features section */}
			<div className="bg-white border-t border-gray-100">
				<div className="container mx-auto px-4 max-w-4xl py-16 md:py-20">
					<div className="grid grid-cols-1 md:grid-cols-3 gap-8">
						{FEATURES.map((feature) => (
							<div
								key={feature.title}
								className="text-center p-6 rounded-2xl hover:bg-gray-50 transition-colors duration-200"
							>
								<div className="inline-flex items-center justify-center w-14 h-14 bg-indigo-100 text-indigo-600 rounded-xl mb-4">
									{feature.icon}
								</div>
								<h3 className="text-lg font-semibold text-gray-900 mb-2">{feature.title}</h3>
								<p className="text-gray-600 leading-relaxed">{feature.description}</p>
							</div>
						))}
					</div>
				</div>
			</div>
		</Layout>
	);
}
