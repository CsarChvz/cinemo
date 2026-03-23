import { render, screen, userEvent } from '@/test-utils';
import { LoginForm } from './LoginForm';

describe('LoginForm', () => {
  it('debe renderizar los elementos básicos del login', () => {
    render(<LoginForm />);

    expect(screen.getByText(/Bienvenido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Tu contraseña/i)).toBeInTheDocument();
    expect(
      screen.getByRole('button', { name: /iniciar sesión/i })
    ).toBeInTheDocument();
  });

  it('debe mostrar errores de validación si los campos están vacíos al enviar', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const submitBtn = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitBtn);

    // Verificamos que los mensajes de useForm de Mantine aparezcan
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/mínimo 6 caracteres/i)).toBeInTheDocument();
  });

  it('debe permitir escribir y validar correctamente los campos', async () => {
    const user = userEvent.setup();
    render(<LoginForm />);

    const emailInput = screen.getByLabelText(/Correo electrónico/i);
    const passwordInput = screen.getByPlaceholderText(/Tu contraseña/i);

    // Simulamos la escritura
    await user.type(emailInput, 'cesar@cinemo.com');
    await user.type(passwordInput, '123456');

    expect(emailInput).toHaveValue('cesar@cinemo.com');
    expect(passwordInput).toHaveValue('123456');

    // Al hacer click de nuevo, no deberían existir mensajes de error
    const submitBtn = screen.getByRole('button', { name: /iniciar sesión/i });
    await user.click(submitBtn);

    expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/mínimo 6 caracteres/i)).not.toBeInTheDocument();
  });

  it('debe navegar o mostrar link de registro', () => {
    render(<LoginForm />);
    const registerLink = screen.getByText(/Regístrate/i);
    expect(registerLink).toBeInTheDocument();
  });
});
