import { useEffect } from 'react';

/**
 * Hook para actualizar el título de la página
 * @param title - El título que se mostrará en la pestaña del navegador
 */
export function usePageTitle(title: string) {
	useEffect(() => {
		const previousTitle = document.title;
		document.title = title;

		return () => {
			document.title = previousTitle;
		};
	}, [title]);
}
