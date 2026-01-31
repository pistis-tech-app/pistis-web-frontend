import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { PrivacyPage } from './PrivacyPage';
import { privacyTableOfContents } from './privacyTableOfContents';

describe('PrivacyPage', () => {
	const renderWithRouter = () => {
		return render(
			<BrowserRouter>
				<PrivacyPage />
			</BrowserRouter>
		);
	};

	describe('Content', () => {
		it('should render the page title', () => {
			renderWithRouter();

			expect(screen.queryByText('Política de Privacidad')).not.toBeNull();
		});

		it('should display main sections', () => {
			renderWithRouter();

			expect(screen.getAllByText(/Tratamiento.*Datos.*Personales/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/Identificación.*Responsable/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/Derechos.*Titulares/i).length).toBeGreaterThan(0);
		});

		it('should render all main headings', () => {
			renderWithRouter();

			const level1Items = privacyTableOfContents.filter((item) => item.level === 1);
			expect(level1Items.length).toBe(9);
		});

		it('should have UPPERCASE special sections', () => {
			renderWithRouter();

			expect(screen.queryByText('AVISO DE PRIVACIDAD DE PISTIS GROUP S.A.S.')).not.toBeNull();
			expect(screen.queryByText('EJERCICIO DE DERECHOS')).not.toBeNull();
		});
	});

	describe('Table of Contents', () => {
		it('should render table of contents', () => {
			renderWithRouter();

			expect(screen.queryByText('Contenido')).not.toBeNull();
		});

		it('should have correct number of TOC items', () => {
			renderWithRouter();

			expect(privacyTableOfContents.length).toBeGreaterThanOrEqual(15);
		});

		it('should have back to top button', () => {
			renderWithRouter();

			const backToTopButton = screen.getByText('Volver arriba');
			expect(backToTopButton).toBeTruthy();
		});

		it('should have clickable TOC links', () => {
			renderWithRouter();

			const tocLinks = screen.getAllByRole('link').filter((link) => link.getAttribute('href')?.startsWith('#'));
			expect(tocLinks.length).toBeGreaterThan(0);
		});
	});

	describe('Structure', () => {
		it('should have proper heading hierarchy', () => {
			renderWithRouter();

			const h2s = screen.getAllByRole('heading', { level: 2 });
			const h3s = screen.getAllByRole('heading', { level: 3 });

			expect(h2s.length).toBeGreaterThan(0);
			expect(h3s.length).toBeGreaterThan(0);
		});

		it('should use wide layout variant', () => {
			const { container } = renderWithRouter();

			expect(container.querySelector('[class*="max-w-7xl"]')).toBeTruthy();
		});

		it('should have sidebar and main content layout', () => {
			const { container } = renderWithRouter();

			expect(container.querySelector('[class*="flex"]')).toBeTruthy();
		});
	});

	describe('Capitalization', () => {
		it('should ensure all h1, h2, h3 headings are capitalized', () => {
			renderWithRouter();

			const headings = document.querySelectorAll('h1, h2, h3');

			headings.forEach((heading) => {
				const text = heading.textContent || '';

				const words = text.split(/\s+/);

				words.forEach((word) => {
					if (word.length > 0) {
						const firstChar = word.charAt(0);
						expect(firstChar).toEqual(firstChar.toUpperCase());
					}
				});
			});
		});

		it('should maintain UPPERCASE for special sections', () => {
			renderWithRouter();

			const avisoHeading = screen.getByText('AVISO DE PRIVACIDAD DE PISTIS GROUP S.A.S.');
			const ejercicioHeading = screen.getByText('EJERCICIO DE DERECHOS');

			expect(avisoHeading).toBeTruthy();
			expect(ejercicioHeading).toBeTruthy();
		});
	});

	describe('Contact Information', () => {
		it('should have contact details for data requests', () => {
			renderWithRouter();

			const bodyText = document.body.textContent || '';
			expect(
				bodyText.includes('@') ||
					bodyText.toLowerCase().includes('correo') ||
					bodyText.toLowerCase().includes('contacto')
			).toBeTruthy();
		});
	});
});
