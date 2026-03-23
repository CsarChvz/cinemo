import {render, screen, userEvent} from '@/test-utils';

import { MovieCard } from './MovieCard';
import type {MovieCardProps} from './MovieCard'
describe('Movie Card Component', ()=>{
    const defaultProps: MovieCardProps = {
      title: 'Batman',
      year: 2022,
      genre: 'Accion',
      posterUrl: 'test.jpg',
      onViewDetails: jest.fn(),
    };

    it('debe renderizar el titulo y el genero correctamente', ()=>{
        render(<MovieCard {...defaultProps}/>);
        expect(screen.getByText('Batman')).toBeInTheDocument();
        expect(screen.getByText('Accion')).toBeInTheDocument();
    });

    it('debe llamar a onViewDetails cuando se hace click en el botón', async () => {
      render(<MovieCard {...defaultProps} />);
      const button = screen.getByRole('button', { name: /ver detalles/i });

      await userEvent.click(button);
      expect(defaultProps.onViewDetails).toHaveBeenCalledTimes(1);
    });
})