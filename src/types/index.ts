export interface DeleteRequestResponse {
	description: string;
}

export interface ConfirmDeleteResponse {
	message: string;
}

export interface VerifyEmailResponse {
	message: string;
}

export interface ApiError {
	message: string;
	status?: number;
}

export interface RequestDeletionResponse {
	success: boolean;
}
