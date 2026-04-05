import { render, screen, fireEvent } from '@testing-library/react';
import { MovieCard, MovieCardProps } from './MovieCard';
import { MantineProvider } from '@mantine/core';
import { MovieClassification, MovieGenre } from '@/schemas/movie';

// Helper para envolver el componente en el provider de Mantine
const renderWithProvider = (ui: React.ReactElement) => {
  return render(<MantineProvider>{ui}</MantineProvider>);
};

describe('MovieCard Component', () => {
  const mockProps: MovieCardProps = {
    id: 2,
    title: 'Interstellar',
    posterUrl: 'https://test-url.com/poster.jpg',
    genre: MovieGenre.CIENCIA_FICCION,
    durationMin: 169,
    description: 'Un viaje a través de un agujero de gusano.',
    classification: MovieClassification.B15,
    onViewDetails: jest.fn(), // Usando el estándar de Jest
  };

  it('debe renderizar toda la información de la película', () => {
    renderWithProvider(<MovieCard {...mockProps} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.genre)).toBeInTheDocument();
    expect(screen.getByText(mockProps.durationMin)).toBeInTheDocument();
    expect(screen.getByText(mockProps.classification)).toBeInTheDocument();
    expect(screen.getByText(mockProps.description)).toBeInTheDocument();
  });

  it('debe mostrar el póster con el alt text correcto', () => {
    renderWithProvider(<MovieCard {...mockProps} />);

    const image = screen.getByAltText(mockProps.title);
    expect(image).toHaveAttribute('src', mockProps.posterUrl);
  });

  it('debe llamar a onViewDetails cuando se presiona el botón', () => {
    renderWithProvider(<MovieCard {...mockProps} />);

    const button = screen.getByRole('link', { name: /Ver detalles/i });
    fireEvent.click(button);

    expect(mockProps.onViewDetails).toHaveBeenCalledTimes(1);
  });
});
