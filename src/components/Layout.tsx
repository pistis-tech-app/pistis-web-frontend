import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';

interface LayoutProps {
	children: ReactNode;
	variant?: 'default' | 'wide' | 'full' | 'gradient';
	containerClassName?: string;
	contentClassName?: string;
	showHeader?: boolean;
}

export function Layout({
	children,
	variant = 'default',
	containerClassName = '',
	contentClassName = '',
	showHeader = true,
}: LayoutProps) {
	// Background styles based on variant
	const bgStyles = {
		default: 'bg-gray-50',
		wide: 'bg-gray-50',
		full: 'bg-white',
		gradient: 'bg-gradient-to-br from-blue-50 via-white to-purple-50',
	};

	// Header styles based on variant
	const headerStyles = {
		default: 'bg-[rgb(249,249,255)] py-4',
		wide: 'bg-white border-b border-gray-200 py-4',
		full: 'bg-white border-b border-gray-200 py-4',
		gradient: 'bg-white/80 backdrop-blur-sm border-b border-gray-200 py-4 sticky top-0 z-10',
	};

	// Footer styles based on variant
	const footerStyles = {
		default: 'py-4',
		wide: 'border-t border-gray-200 py-8',
		full: 'border-t border-gray-200 py-8',
		gradient: 'border-t border-gray-200 py-6 bg-white/50 backdrop-blur-sm',
	};

	// Main content wrapper styles
	const mainWrapperStyles = {
		default: 'flex-1 flex items-center justify-center p-4',
		wide: 'flex-1 p-4',
		full: 'flex-1',
		gradient: 'flex-1 flex items-center justify-center p-4',
	};

	// Content container styles
	const contentStyles = {
		default: 'w-full max-w-md',
		wide: 'w-full max-w-7xl mx-auto',
		full: 'w-full',
		gradient: 'w-full max-w-2xl',
	};

	return (
		<div className={`min-h-screen flex flex-col ${bgStyles[variant]} ${containerClassName}`}>
			{showHeader && (
				<header className={headerStyles[variant]}>
					<div className="container mx-auto px-4 flex items-center justify-center">
						<Link to="/">
							<img
								src="/pistis-logo.png"
								alt="Pistis"
								className="h-10 cursor-pointer hover:opacity-80 transition-opacity"
							/>
						</Link>
					</div>
				</header>
			)}

			<main className={mainWrapperStyles[variant]}>
				<div className={`${contentStyles[variant]} ${contentClassName}`}>{children}</div>
			</main>

			<footer className={`text-center text-sm text-gray-600 ${footerStyles[variant]}`}>
				<div className="container mx-auto px-4">
					<p className="mb-2">&copy; {new Date().getFullYear()} Pistis Group S.A.S. Todos los derechos reservados.</p>
					<div className="flex justify-center gap-4">
						<Link to="/terms-conditions" className="hover:text-blue-600 transition-colors underline">
							Términos y Condiciones
						</Link>
						<Link to="/privacy-policy" className="hover:text-blue-600 transition-colors underline">
							Política de Privacidad
						</Link>
					</div>
				</div>
			</footer>
		</div>
	);
}
