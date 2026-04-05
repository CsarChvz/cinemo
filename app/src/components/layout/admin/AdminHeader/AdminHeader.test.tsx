import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom'; // Importante para los matchers como toBeInTheDocument
import { AdminHeader } from './AdminHeader';
import { MantineProvider } from '@mantine/core';

// Helper para envolver en el provider de Mantine (evita errores de tema)
const renderWithProvider = (ui: React.ReactNode) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('AdminHeader Component', () => {
  const defaultProps = {
    opened: false,
    onToggle: jest.fn(), // Usamos jest.fn() en lugar de vi.fn()
  };

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('debe renderizar el logo y el texto ADMIN', () => {
    renderWithProvider(<AdminHeader {...defaultProps} />);

    // Verificamos que ambos textos existan en el documento
    expect(screen.getByText(/CINEMO/i)).toBeInTheDocument();
    expect(screen.getByText(/ADMIN/i)).toBeInTheDocument();
  });

  it('debe ejecutar onToggle al hacer clic en el botón Burger', () => {
    renderWithProvider(<AdminHeader {...defaultProps} />);

    // El Burger de Mantine renderiza un elemento con rol 'button'
    const burger = screen.getByRole('button');
    fireEvent.click(burger);

    expect(defaultProps.onToggle).toHaveBeenCalledTimes(1);
  });

  it('debe pasar el estado "opened" correctamente al Burger', () => {
    // Renderizamos con opened en true
    renderWithProvider(<AdminHeader {...defaultProps} opened={true} />);

    const burger = screen.getByRole('button');

    // Mantine usa data-opened para controlar el estado visual del icono
    expect(burger).toHaveAttribute('data-opened', 'true');
  });
});
