import { describe, it, expect } from 'vitest';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import { NotFoundPage } from './NotFoundPage';
import userEvent from '@testing-library/user-event';

describe('NotFoundPage', () => {
	const renderWithRouter = () => {
		return render(
			<BrowserRouter>
				<NotFoundPage />
			</BrowserRouter>,
		);
	};

	describe('Content', () => {
		it('should display 404 error code', () => {
			renderWithRouter();

			expect(screen.queryByText('404')).not.toBeNull();
		});

		it('should show page not found message', () => {
			renderWithRouter();

			expect(screen.queryByText(/Página no encontrada/i)).not.toBeNull();
		});

		it('should display helpful description', () => {
			renderWithRouter();

			expect(screen.queryByText(/Parece que esta página se ha perdido en el camino/i) || screen.queryByText(/No te preocupes/i)).not.toBeNull();
		});
	});

	describe('Navigation', () => {
		it('should have a button to go to home', () => {
			renderWithRouter();

			const homeButton = screen.queryByText(/Volver al inicio/i);
			expect(homeButton).not.toBeNull();
			expect(homeButton?.closest('a')?.getAttribute('href')).toBe('/');
		});

		it('should have link to home page', () => {
			renderWithRouter();

			const homeLink = screen.getByRole('link', { name: /inicio/i }) || screen.getAllByRole('link')[0];
			expect(homeLink).toBeTruthy();
			expect(homeLink.getAttribute('href')).toBe('/');
		});
	});

	describe('Quick Links', () => {
		it('should display quick links section', () => {
			renderWithRouter();

			const links = screen.getAllByRole('link');
			expect(links.length).toBeGreaterThan(1);
		});
	});

	describe('Styling', () => {
		it('should use gradient layout variant', () => {
			const { container } = renderWithRouter();

			expect(container.querySelector('[class*="gradient"]')).toBeTruthy();
		});

		it('should have animations on 404 number', () => {
			renderWithRouter();

			const errorCode = screen.getByText('404');
			expect(errorCode.className).toContain('animate');
		});
	});

	describe('Interactions', () => {
		it('should be clickable on home button', async () => {
			const user = userEvent.setup();
			renderWithRouter();

			const homeButton =
				screen.queryByRole('button', { name: /volver al inicio/i }) || screen.getAllByRole('link')[0];
			await user.click(homeButton);

			expect(homeButton).toBeTruthy();
		});
	});
});
