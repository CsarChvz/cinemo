import { render, screen, userEvent, waitFor } from '@/test-utils';
import { RegisterForm } from './RegisterForm';

describe('RegisterForm', () => {
  it('debe renderizar todos los campos correctamente', () => {
    render(<RegisterForm />);

    expect(screen.getByLabelText(/Nombre/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Apellido/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Correo electrónico/i)).toBeInTheDocument();
    // El PasswordInput internamente tiene el label "Contraseña"
    expect(screen.getByText(/Contraseña/i)).toBeInTheDocument();
  });

  it('debe mostrar mensajes de error al intentar enviar el formulario vacío', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    const submitBtn = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitBtn);

    // Verificamos las validaciones de useForm
    expect(screen.getByText(/nombre muy corto/i)).toBeInTheDocument();
    expect(screen.getByText(/apellido muy corto/i)).toBeInTheDocument();
    expect(screen.getByText(/email inválido/i)).toBeInTheDocument();
    expect(screen.getByText(/mínimo 6 caracteres/i)).toBeInTheDocument();
  });

  it('no debe mostrar errores cuando los datos son válidos', async () => {
    const user = userEvent.setup();
    render(<RegisterForm />);

    // Llenamos los campos
    await user.type(screen.getByLabelText(/Nombre/i), 'Cesar');
    await user.type(screen.getByLabelText(/Apellido/i), 'Chavez');
    await user.type(
      screen.getByLabelText(/Correo electrónico/i),
      'cesar@cinemo.com'
    );

    // Buscamos el input de contraseña por su placeholder o id
    const passwordInput = screen.getByPlaceholderText(/Tu contraseña/i);
    await user.type(passwordInput, 'password123');

    const submitBtn = screen.getByRole('button', { name: /crear cuenta/i });
    await user.click(submitBtn);

    // Verificamos que no haya mensajes de error en pantalla
    expect(screen.queryByText(/nombre muy corto/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/email inválido/i)).not.toBeInTheDocument();
  });
});
