import { describe, it, expect } from 'vitest';
import { render, screen, waitFor, fireEvent } from '../../test/test-utils';
import userEvent from '@testing-library/user-event';
import { DeleteAccountPage } from './DeleteAccountPage';

describe('DeleteAccountPage', () => {
	it('should render the form correctly', () => {
		render(<DeleteAccountPage />);

		expect(screen.getByText('Eliminar cuenta')).toBeTruthy();
		expect(screen.getByLabelText('Correo electrónico')).toBeTruthy();
		expect(screen.getByRole('button', { name: /solicitar eliminación/i })).toBeTruthy();
	});

	it('should render email input with correct placeholder', () => {
		render(<DeleteAccountPage />);

		const emailInput = screen.getByPlaceholderText('tu@email.com');
		expect(emailInput).toBeTruthy();
	});

	it('should show error when submitting empty email', async () => {
		const user = userEvent.setup();
		render(<DeleteAccountPage />);

		const submitButton = screen.getByRole('button', { name: /solicitar eliminación/i });
		await user.click(submitButton);

		expect(screen.getByText('Por favor, ingresa tu correo electrónico.')).toBeTruthy();
	});

	it('should show error for invalid email format', async () => {
		render(<DeleteAccountPage />);

		const emailInput = screen.getByLabelText('Correo electrónico');
		fireEvent.change(emailInput, { target: { value: 'invalid-email' } });

		const form = emailInput.closest('form')!;
		fireEvent.submit(form);

		await waitFor(() => {
			expect(screen.getByText('Por favor, ingresa un correo electrónico válido.')).toBeTruthy();
		});
	});

	it('should allow typing in email input', async () => {
		const user = userEvent.setup();
		render(<DeleteAccountPage />);

		const emailInput = screen.getByLabelText('Correo electrónico') as HTMLInputElement;
		await user.type(emailInput, 'test@example.com');

		expect(emailInput.value).toBe('test@example.com');
	});
});
