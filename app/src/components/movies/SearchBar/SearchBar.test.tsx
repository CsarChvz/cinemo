import { render, screen, fireEvent } from '@testing-library/react';
import { SearchBar } from './SearchBar';
import { MantineProvider } from '@mantine/core';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('SearchBar Component', () => {
  it('debe renderizar el input con el placeholder correcto', () => {
    renderWithProvider(<SearchBar placeholder="Buscar cine" />);
    const input = screen.getByPlaceholderText(/Buscar cine/i);
    expect(input).toBeInTheDocument();
  });

  it('debe permitir escribir texto y disparar el evento onChange', () => {
    const handleChange = jest.fn();
    renderWithProvider(<SearchBar onChange={handleChange} />);

    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'Batman' } });

    expect(handleChange).toHaveBeenCalled();
  });


  it('debe mostrar el mensaje de error cuando la prop error está presente', () => {
    renderWithProvider(<SearchBar error="Campo requerido" />);
    expect(screen.getByText(/Campo requerido/i)).toBeInTheDocument();
  });
});
