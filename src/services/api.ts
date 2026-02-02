/**
 * API service for Pistis web frontend
 * Connects to backend API or mock server for testing
 */

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:3001';

/**
 * Request account deletion
 * POST /user/delete-request
 */
export async function requestAccountDeletion(email: string): Promise<void> {
	const response = await fetch(`${API_BASE_URL}/user/delete-request`, {
		method: 'POST',
		headers: {
			'Content-Type': 'application/json',
		},
		body: JSON.stringify({ mail: email }),
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Error al solicitar la eliminación de cuenta');
	}

	// Response: { success: true, debug_link?: string }
	await response.json();
}

/**
 * Get delete request details
 * GET /user/delete-request?user_id=xxx
 */
export async function getDeleteRequestDetails(userId: string): Promise<{ description: string }> {
	const response = await fetch(`${API_BASE_URL}/user/delete-request?user_id=${userId}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Error al obtener los detalles de la solicitud');
	}

	// Response: { description: string }
	return response.json();
}

/**
 * Confirm account deletion
 * GET /user/delete-request?user_id=xxx&action=true
 */
export async function confirmAccountDeletion(userId: string): Promise<{ message: string }> {
	const response = await fetch(`${API_BASE_URL}/user/delete-request?user_id=${userId}&action=true`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Error al confirmar la eliminación');
	}

	// Response: { message: string }
	return response.json();
}

/**
 * Verify email by token
 * GET /auth/verify-email/:token
 */
export async function verifyEmailByToken(token: string): Promise<{ message: string }> {
	const response = await fetch(`${API_BASE_URL}/auth/verify-email/${token}`, {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json',
		},
	});

	if (!response.ok) {
		const error = await response.json();
		throw new Error(error.error || 'Error al verificar el correo');
	}

	// Response: { message: string }
	return response.json();
}
