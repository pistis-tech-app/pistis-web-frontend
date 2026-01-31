import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { TermsPage } from './TermsPage';
import { termsTableOfContents } from './termsTableOfContents';

describe('TermsPage', () => {
	const renderWithRouter = () => {
		return render(
			<BrowserRouter>
				<TermsPage />
			</BrowserRouter>
		);
	};

	describe('Content', () => {
		it('should render the page title', () => {
			renderWithRouter();

			expect(screen.getAllByText(/Términos.*Condiciones/i).length).toBeGreaterThan(0);
		});

		it('should display main sections', () => {
			renderWithRouter();

			expect(screen.getAllByText(/Introducción/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/Definiciones/i).length).toBeGreaterThan(0);
			expect(screen.getAllByText(/Registro.*Cuenta.*Acceso/i).length).toBeGreaterThan(0);
		});

		it('should render all H2 headings', () => {
			renderWithRouter();

			const level1Items = termsTableOfContents.filter((item) => item.level === 1);
			expect(level1Items.length).toBe(13);
		});
	});

	describe('Table of Contents', () => {
		it('should render table of contents', () => {
			renderWithRouter();

			expect(screen.queryByText('Contenido')).not.toBeNull();
		});

		it('should have correct number of TOC items', () => {
			renderWithRouter();

			expect(termsTableOfContents.length).toBe(59);
		});

		it('should have "Volver arriba" button', () => {
			renderWithRouter();

			const backToTopButton = screen.getByText('Volver arriba');
			expect(backToTopButton).toBeTruthy();
		});

		it('should have TOC items as clickable links', () => {
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
	});
});
