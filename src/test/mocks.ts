import { vi } from 'vitest';

/**
 * API mocks for testing
 */

export interface ApiMocks {
	requestAccountDeletion: ReturnType<typeof vi.fn>;
	getDeleteRequestDetails: ReturnType<typeof vi.fn>;
	confirmAccountDeletion: ReturnType<typeof vi.fn>;
	verifyEmailByToken: ReturnType<typeof vi.fn>;
}

export function createApiMocks(): ApiMocks {
	return {
		requestAccountDeletion: vi.fn(),
		getDeleteRequestDetails: vi.fn(),
		confirmAccountDeletion: vi.fn(),
		verifyEmailByToken: vi.fn(),
	};
}

export function setupDefaultApiMocks(mocks: ApiMocks) {
	// Default successful responses
	mocks.requestAccountDeletion.mockResolvedValue(undefined);

	mocks.getDeleteRequestDetails.mockResolvedValue({
		description: 'Datos que serán eliminados:\n• Tu perfil de usuario\n• Historial de actividad',
	});

	mocks.confirmAccountDeletion.mockResolvedValue({
		message: 'El proceso de eliminación ha sido iniciado.',
	});

	mocks.verifyEmailByToken.mockResolvedValue({
		message: 'Correo verificado exitosamente',
	});
}

export function resetApiMocks(mocks: ApiMocks) {
	mocks.requestAccountDeletion.mockReset();
	mocks.getDeleteRequestDetails.mockReset();
	mocks.confirmAccountDeletion.mockReset();
	mocks.verifyEmailByToken.mockReset();
}
