import type { Meta, StoryObj } from '@storybook/react';
import { MovieCard } from './MovieCard';

const meta: Meta<typeof MovieCard> = {
  title: 'Components/Movies/MovieCard',
  component: MovieCard,
  tags: ['autodocs'],
  argTypes: {
    onViewDetails: { action: 'onViewDetails clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    title: 'Interstellar',
    posterUrl:
      'https://images.unsplash.com/photo-1536440136628-849c177e76a1?q=80&w=600&auto=format&fit=crop',
    genre: 'Sci-Fi / Drama',
    clasification: 'B15',
    duration: '169 min',
    description:
      'Un equipo de exploradores viaja a través de un agujero de gusano en el espacio en un intento por asegurar la supervivencia de la humanidad.',
  },
};

export const MarvelMovie: Story = {
  args: {
    title: 'Spider-Man: No Way Home',
    posterUrl:
      'https://images.unsplash.com/photo-1635805737707-575885ab0820?q=80&w=600&auto=format&fit=crop',
    genre: 'Acción / Aventura',
    clasification: 'B',
    duration: '148 min',
    description:
      'Tras descubrirse la identidad de Spider-Man, Peter pide ayuda al Doctor Strange para restaurar su secreto, pero algo sale mal.',
  },
};

export const ShortDescription: Story = {
  args: {
    ...Default.args,
    title: 'Up',
    genre: 'Animación',
    clasification: 'AA',
    duration: '96 min',
    description: 'Un anciano viaja a Sudamérica en su casa flotante.',
  },
};
