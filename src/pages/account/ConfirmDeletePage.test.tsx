import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { ConfirmDeletePage } from './ConfirmDeletePage';

// Mock the API module
vi.mock('../../services/api', () => ({
	getDeleteRequestDetails: vi.fn(),
	confirmAccountDeletion: vi.fn(),
}));

// Import the mocked functions after the mock declaration
import { getDeleteRequestDetails, confirmAccountDeletion } from '../../services/api';

// Type cast for better TypeScript support
const mockGetDeleteRequestDetails = getDeleteRequestDetails as ReturnType<typeof vi.fn>;
const mockConfirmAccountDeletion = confirmAccountDeletion as ReturnType<typeof vi.fn>;

const renderWithUserId = (userId: string = 'test-user-123') => {
	return render(
		<MemoryRouter initialEntries={[`/confirm-delete?user_id=${userId}`]}>
			<ConfirmDeletePage />
		</MemoryRouter>
	);
};

describe('ConfirmDeletePage', () => {
	beforeEach(() => {
		vi.clearAllMocks();

		mockGetDeleteRequestDetails.mockResolvedValue({
			description: 'Datos que serán eliminados:\n• Tu perfil de usuario\n• Historial de actividad',
		});

		mockConfirmAccountDeletion.mockResolvedValue({
			message: 'El proceso de eliminación ha sido iniciado.',
		});
	});

	describe('Initial Render', () => {
		it('should render the confirmation form', async () => {
			renderWithUserId();

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					expect(bodyText.includes('Confirmar') || bodyText.includes('elimina')).toBeTruthy();
				},
				{ timeout: 3000 }
			);
		});

		it('should display the description from backend', async () => {
			renderWithUserId('user-123');

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					expect(
						bodyText.includes('perfil de usuario') || bodyText.includes('Datos que serán eliminados')
					).toBeTruthy();
				},
				{ timeout: 3000 }
			);
		});

		it('should show loading state initially', () => {
			mockGetDeleteRequestDetails.mockImplementation(() => new Promise(() => {}));

			renderWithUserId();

			expect(screen.queryByText(/Cargando/i) || screen.queryByText(/Loading/i)).not.toBeNull();
		});

		it('should show error when user_id is missing', async () => {
			render(
				<MemoryRouter initialEntries={['/confirm-delete']}>
					<ConfirmDeletePage />
				</MemoryRouter>
			);

			await waitFor(() => {
				const bodyText = document.body.textContent || '';
				expect(
					bodyText.toLowerCase().includes('error') || bodyText.toLowerCase().includes('identificador')
				).toBeTruthy();
			});
		});
	});

	describe('Form Submission', () => {
		it('should call confirmAccountDeletion on confirm click', async () => {
			const user = userEvent.setup();

			renderWithUserId();

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					expect(bodyText.includes('perfil de usuario')).toBeTruthy();
				},
				{ timeout: 3000 }
			);

			const confirmButton = screen.queryByRole('button', { name: /Confirmar/i });
			if (confirmButton) {
				await user.click(confirmButton);

				await waitFor(
					() => {
						expect(mockConfirmAccountDeletion).toHaveBeenCalledWith('test-user-123');
					},
					{ timeout: 2000 }
				);
			} else {
				throw new Error('Confirm button not found');
			}
		});

		it('should show error message on failed deletion', async () => {
			const user = userEvent.setup();
			mockConfirmAccountDeletion.mockRejectedValue(new Error('Error al eliminar la cuenta'));

			renderWithUserId();

			await waitFor(
				() => {
					const bodyText = document.body.textContent || '';
					expect(bodyText.includes('perfil')).toBeTruthy();
				},
				{ timeout: 3000 }
			);

			const confirmButton = screen.queryByRole('button', { name: /Confirmar/i });
			if (confirmButton) {
				await user.click(confirmButton);

				await waitFor(
					() => {
						const bodyText = document.body.textContent || '';
						expect(bodyText.toLowerCase().includes('error')).toBeTruthy();
					},
					{ timeout: 2000 }
				);
			}
		});
	});

	describe('Cancel Action', () => {
		it('should have a cancel button', async () => {
			renderWithUserId();

			await waitFor(
				() => {
					const cancelButton = screen.queryByText(/Cancelar/i) || screen.queryByText(/Volver/i);
					expect(cancelButton).not.toBeNull();
				},
				{ timeout: 3000 }
			);
		});
	});
});
