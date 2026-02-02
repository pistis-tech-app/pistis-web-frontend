import { vi } from 'vitest';
import type { ConfirmDeleteResponse, DeleteRequestResponse, VerifyEmailResponse } from '../../types';

/**
 * Mock responses que coinciden EXACTAMENTE con lo que devuelve el backend NestJS
 */
export const mockApiResponses = {
	// Backend devuelve: { message: string }
	verifyEmailSuccess: {
		message: 'Correo verificado exitosamente',
	} as VerifyEmailResponse,

	// Backend lanza ConflictException con este mensaje
	verifyEmailAlreadyVerified: {
		message: 'Este correo ya ha sido verificado',
	} as VerifyEmailResponse,

	// Backend devuelve: { description: string }
	// description contiene el texto completo de datos a eliminar
	deleteRequestDetails: {
		description: `Datos que serán eliminados:
• Tu perfil de usuario (nombre, foto, información personal)
• Tu historial de viajes
• Tus métodos de pago registrados
• Tus vehículos registrados
• Tus calificaciones y comentarios
• Tu membresía en comunidades

Datos que se conservarán por requerimientos legales:
• Registros de transacciones financieras (por 5 años)
• Información necesaria para auditorías

Una vez confirmada la eliminación, este proceso no puede ser revertido.`,
	} as DeleteRequestResponse,

	// Backend devuelve: { message: string }
	confirmDeleteSuccess: {
		message: 'Tu cuenta ha sido eliminada exitosamente',
	} as ConfirmDeleteResponse,
};

/**
 * Mock functions para el API
 */
export const createApiMocks = () => ({
	verifyEmailByToken: vi.fn(),
	requestAccountDeletion: vi.fn(),
	getDeleteRequestDetails: vi.fn(),
	confirmAccountDeletion: vi.fn(),
});

/**
 * Configuración de mocks por defecto con respuestas reales del backend
 */
export const setupDefaultApiMocks = (mocks: ReturnType<typeof createApiMocks>) => {
	// verifyEmailByToken devuelve: { message: string }
	mocks.verifyEmailByToken.mockResolvedValue(mockApiResponses.verifyEmailSuccess);

	// getDeleteRequestDetails devuelve: { description: string }
	mocks.getDeleteRequestDetails.mockResolvedValue(mockApiResponses.deleteRequestDetails);

	// confirmAccountDeletion devuelve: { message: string }
	mocks.confirmAccountDeletion.mockResolvedValue(mockApiResponses.confirmDeleteSuccess);

	// requestAccountDeletion devuelve: { success: boolean }
	mocks.requestAccountDeletion.mockResolvedValue(undefined);
};

/**
 * Resetea todos los mocks
 */
export const resetApiMocks = (mocks: ReturnType<typeof createApiMocks>) => {
	Object.values(mocks).forEach((mock) => mock.mockReset());
};
