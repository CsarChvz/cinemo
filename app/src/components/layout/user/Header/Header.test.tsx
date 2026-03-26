import { render, screen, userEvent } from '@/test-utils';
import { Header } from './Header';

describe('Header Component', () => {
  const defaultProps = {
    opened: false,
    onToggle: jest.fn(),
  };

  it('debe renderizar el logo de CINEMO', () => {
    render(<Header {...defaultProps} />);
    expect(screen.getByText(/CINEMO/i)).toBeInTheDocument();
  });

  it('debe llamar a onToggle cuando se hace click en el burger', async () => {
    render(<Header {...defaultProps} />);
    const burger = screen.getByRole('burger' in screen ? 'burger' : 'button', {
      name: /toggle navigation/i,
    });
    await userEvent.click(burger);
    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });
});
