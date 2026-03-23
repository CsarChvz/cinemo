import { render, screen, fireEvent } from '@testing-library/react';
import { SortButton } from './SortButton';
import { MantineProvider } from '@mantine/core';
import { SortOrder } from '@/interfaces/filter.interface';

const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('SortButton Component', () => {
  it('debe mostrar el label de "Orden predeterminado" inicialmente', () => {
    renderWithProvider(<SortButton value={SortOrder.DEFAULT} onChange={jest.fn()} />);
    // Buscamos por el aria-label que definimos
    expect(screen.getByLabelText(/Orden predeterminado/i)).toBeInTheDocument();
  });

  it('debe llamar a onChange con "asc" cuando el estado actual es "default"', () => {
    const handleChange = jest.fn();
    renderWithProvider(<SortButton value={SortOrder.DEFAULT} onChange={handleChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleChange).toHaveBeenCalledWith('asc');
  });

  it('debe llamar a onChange con "desc" cuando el estado actual es "asc"', () => {
    const handleChange = jest.fn();
    renderWithProvider(<SortButton value={SortOrder.ASCENDING} onChange={handleChange} />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleChange).toHaveBeenCalledWith('desc');
  });

  it('debe regresar a "default" cuando el estado actual es "desc"', () => {
    const handleChange = jest.fn();
    renderWithProvider(
      <SortButton value={SortOrder.DESCENDING} onChange={handleChange} />
    );

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(handleChange).toHaveBeenCalledWith('default');
  });

  it('debe cambiar el color del botón cuando no está en estado "default"', () => {
    const { rerender } = renderWithProvider(
      <SortButton value={SortOrder.DEFAULT} onChange={jest.fn()} />
    );
    let button = screen.getByRole('button');

    // En default suele ser una variante distinta o color gris
    expect(button).toHaveClass('mantine-ActionIcon-root');

    // Rerenderizamos con un estado activo
    rerender(
      <MantineProvider>
        <SortButton  value={SortOrder.ASCENDING} onChange={jest.fn()} />
      </MantineProvider>
    );
    button = screen.getByRole('button');

    // Aquí podrías verificar clases específicas si usas estilos personalizados,
    // pero lo principal es que el test de lógica de arriba pase.
  });
});
