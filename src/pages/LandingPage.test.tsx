import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { LandingPage } from './LandingPage';

describe('LandingPage', () => {
	const renderWithRouter = () => {
		return render(
			<BrowserRouter>
				<LandingPage />
			</BrowserRouter>
		);
	};

	describe('Content', () => {
		it('should render the main heading', () => {
			renderWithRouter();

			const heading = screen.getByRole('heading', { level: 1 });
			expect(heading.textContent).toContain('sistema de confianza');
		});

		it('should display the Pistis logo', () => {
			renderWithRouter();

			const logo = screen.getByAltText('Pistis');
			expect(logo).toBeTruthy();
			expect(logo.getAttribute('src')).toContain('pistis-logo.png');
		});

		it('should show the main description', () => {
			renderWithRouter();

			expect(screen.queryByText(/Una app para que los miembros de una organización/i)).not.toBeNull();
		});
	});

	describe('Download Buttons', () => {
		it('should have Android download button', () => {
			renderWithRouter();

			const androidButton = screen.getByText(/Descargar para Android/i);
			expect(androidButton).toBeTruthy();
		});

		it('should have iOS download button', () => {
			renderWithRouter();

			const iosButton = screen.getByText(/Descargar para iOS/i);
			expect(iosButton).toBeTruthy();
		});

		it('should have correct links for app stores', () => {
			renderWithRouter();

			const androidLink = screen.getByText(/Descargar para Android/i).closest('a');
			const iosLink = screen.getByText(/Descargar para iOS/i).closest('a');

			expect(androidLink?.getAttribute('href')).toContain('play.google.com');
			expect(iosLink?.getAttribute('href')).toContain('apps.apple.com');
		});

		it('should open links in new tab', () => {
			renderWithRouter();

			const androidLink = screen.getByText(/Descargar para Android/i).closest('a');
			const iosLink = screen.getByText(/Descargar para iOS/i).closest('a');

			expect(androidLink?.getAttribute('target')).toBe('_blank');
			expect(iosLink?.getAttribute('target')).toBe('_blank');
			expect(androidLink?.getAttribute('rel')).toContain('noopener');
			expect(iosLink?.getAttribute('rel')).toContain('noreferrer');
		});
	});

	describe('Layout', () => {
		it('should not render header (showHeader=false)', () => {
			renderWithRouter();

			const logos = screen.getAllByAltText('Pistis');
			expect(logos.length).toBeGreaterThan(0);
		});

		it('should render footer with legal links', () => {
			renderWithRouter();

			expect(screen.queryByText(/Términos y Condiciones/i)).not.toBeNull();
			expect(screen.queryByText(/Política de Privacidad/i)).not.toBeNull();
		});
	});
});
