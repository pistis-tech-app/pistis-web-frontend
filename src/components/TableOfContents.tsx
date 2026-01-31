/**
 * Componente de Tabla de Contenidos para páginas legales
 * Muestra un menú lateral de navegación sticky con scroll suave
 */

import { useEffect, useState } from 'react';

export interface TocItem {
	id: string;
	title: string;
	level: number; // Level 1 para h2, Level 2 para h3, Level 3 para h4
}

interface TableOfContentsProps {
	items: TocItem[];
}

export function TableOfContents({ items }: TableOfContentsProps) {
	const [activeId, setActiveId] = useState<string>('');

	useEffect(() => {
		const handleScroll = () => {
			// Obtener la posición del scroll con offset para el header
			const scrollPosition = window.scrollY + 150;

			// Encontrar la sección activa (la que está más cerca del top)
			let currentSection = '';
			let minDistance = Infinity;

			items.forEach((item) => {
				const element = document.getElementById(item.id);
				if (element) {
					const elementTop = element.getBoundingClientRect().top + window.scrollY;
					const distance = Math.abs(scrollPosition - elementTop);

					// Si el elemento está por encima o en la posición del scroll
					if (elementTop <= scrollPosition + 10 && distance < minDistance) {
						minDistance = distance;
						currentSection = item.id;
					}
				}
			});

			if (currentSection && currentSection !== activeId) {
				setActiveId(currentSection);
			}
		};

		// Ejecutar al montar y al hacer scroll
		handleScroll();
		window.addEventListener('scroll', handleScroll, { passive: true });

		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, [items, activeId]);

	const handleClick = (e: React.MouseEvent<HTMLAnchorElement>, id: string) => {
		e.preventDefault();
		const element = document.getElementById(id);
		if (element) {
			const offset = 100; // Offset para el sticky header
			const elementPosition = element.getBoundingClientRect().top + window.scrollY;
			const offsetPosition = elementPosition - offset;

			window.scrollTo({
				top: offsetPosition,
				behavior: 'smooth',
			});

			// Actualizar la URL sin hacer scroll adicional
			window.history.pushState(null, '', `#${id}`);
		}
	};

	return (
		<nav className="hidden lg:block sticky top-24 h-fit max-h-[calc(100vh-8rem)] overflow-y-auto">
			<div className="bg-white rounded-lg shadow-sm border border-gray-200 p-6">
				<h2 className="text-sm font-semibold text-gray-900 mb-4 uppercase tracking-wide">Contenido</h2>
				<ul className="space-y-2">
					{items.map((item) => {
						const isActive = activeId === item.id;
						const isLevel2 = item.level === 2;
						const isLevel3 = item.level === 3;

						// Determinar el margen según el nivel
						const marginClass = isLevel3 ? 'ml-8' : isLevel2 ? 'ml-4' : '';

						// Determinar el tamaño de texto según el nivel
						const textSizeClass = isLevel3 ? 'text-xs' : isLevel2 ? 'text-xs' : 'text-sm';

						return (
							<li key={item.id} className={marginClass}>
								<a
									href={`#${item.id}`}
									onClick={(e) => handleClick(e, item.id)}
									className={`
                    block py-1.5 px-3 rounded-md transition-all duration-200 ${textSizeClass}
                    ${
											isActive
												? 'bg-blue-50 text-blue-700 font-semibold border-l-2 border-blue-600 -ml-0.5'
												: 'text-gray-600 hover:text-blue-600 hover:bg-gray-50'
										}
                  `}
								>
									{item.title}
								</a>
							</li>
						);
					})}
				</ul>
			</div>

			{/* Scroll to top button */}
			<button
				onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
				className="mt-4 w-full bg-white hover:bg-gray-50 text-gray-700 rounded-lg shadow-sm border border-gray-200 px-4 py-2.5 text-sm font-medium transition-colors duration-200 flex items-center justify-center gap-2"
			>
				<svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
					<path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" />
				</svg>
				Volver arriba
			</button>
		</nav>
	);
}
