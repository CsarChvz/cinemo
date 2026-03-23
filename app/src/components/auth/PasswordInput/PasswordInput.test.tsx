import { render, screen } from '@/test-utils';
import { PasswordInput } from './PasswordInput';

describe('PasswordInput', () => {

  it('debe mostrar el mensaje de error cuando se le pasa la prop error', () => {
    const errorMsg = 'Contraseña incorrecta';
    render(<PasswordInput error={errorMsg} />);
    expect(screen.getByText(errorMsg)).toBeInTheDocument();
  });
});
