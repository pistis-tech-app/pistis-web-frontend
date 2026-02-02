import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { VerifyEmailPage } from './VerifyEmailPage';

// Mock the API module
vi.mock('../../services/api', () => ({
	verifyEmailByToken: vi.fn(),
}));

// Import the mocked function after the mock declaration
import { verifyEmailByToken } from '../../services/api';

// Type cast for better TypeScript support
const mockVerifyEmailByToken = verifyEmailByToken as ReturnType<typeof vi.fn>;

describe('VerifyEmailPage', () => {
	const mockToken = 'valid-token-123';

	beforeEach(() => {
		vi.clearAllMocks();

		// Default successful response
		mockVerifyEmailByToken.mockResolvedValue({
			message: 'Correo verificado exitosamente',
		});
	});

	const renderWithToken = (token: string = mockToken) => {
		// Necesitamos MemoryRouter con initialEntries para pasar query params
		return render(
			<MemoryRouter initialEntries={[`/verificar-correo?token=${token}`]}>
				<VerifyEmailPage />
			</MemoryRouter>
		);
	};

	describe('Successful Verification', () => {
		it('should display loading state initially', () => {
			mockVerifyEmailByToken.mockImplementation(() => new Promise(() => {}));

			renderWithToken();

			expect(screen.queryByText(/Verificando/i)).not.toBeNull();
		});

		it('should call verifyEmailByToken with the correct token', async () => {
			const testToken = 'test-token-456';
			renderWithToken(testToken);

			await waitFor(() => {
				expect(mockVerifyEmailByToken).toHaveBeenCalledWith(testToken);
			});
		});

		it('should show success message when verification succeeds', async () => {
			renderWithToken();

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					expect(bodyText.includes('verificado exitosamente') || bodyText.includes('Correo verificado')).toBeTruthy();
				},
				{ timeout: 2000 }
			);
		});

		it('should display close instruction on success', async () => {
			renderWithToken();

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					// El mensaje dice "Ya puedes cerrar esta ventana"
					expect(bodyText.includes('cerrar esta ventana') || bodyText.includes('continuar usando')).toBeTruthy();
				},
				{ timeout: 2000 }
			);
		});
	});

	describe('Failed Verification', () => {
		it('should show error when token is missing', async () => {
			mockVerifyEmailByToken.mockRejectedValue(new Error('Token requerido'));

			render(
				<MemoryRouter initialEntries={['/verificar-correo']}>
					<VerifyEmailPage />
				</MemoryRouter>
			);

			await waitFor(() => {
				const bodyText = document.body.textContent || '';
				expect(bodyText.toLowerCase().includes('error') || bodyText.toLowerCase().includes('inválido')).toBeTruthy();
			});
		});

		it('should show error message on verification failure', async () => {
			mockVerifyEmailByToken.mockRejectedValue(new Error('Token inválido o expirado'));

			renderWithToken();

			await waitFor(() => {
				const bodyText = document.body.textContent || '';
				expect(bodyText.toLowerCase().includes('error') || bodyText.toLowerCase().includes('inválido')).toBeTruthy();
			});
		});

		it('should display error details when provided', async () => {
			mockVerifyEmailByToken.mockRejectedValue(new Error('Este correo ya ha sido verificado'));

			renderWithToken();

			await waitFor(() => {
				const bodyText = document.body.textContent || '';
				expect(bodyText.includes('verificado')).toBeTruthy();
			});
		});
	});

	describe('Navigation', () => {
		it('should have a link to home page', async () => {
			renderWithToken();

			await waitFor(() => {
				const links = screen.getAllByRole('link');
				expect(links.length).toBeGreaterThan(0);
			});
		});
	});
});
