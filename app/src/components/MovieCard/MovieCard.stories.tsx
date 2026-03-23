import type { Meta, StoryObj } from '@storybook/nextjs';
import { MovieCard } from './MovieCard';

const meta: Meta<typeof MovieCard> = {
  title: 'Components/MovieCard',
  component: MovieCard,
};

export default meta;

type Story = StoryObj<typeof MovieCard>;

export const Default: Story = {
  args: {
    title: 'Inception',
    year: 2010,
    genre: 'Sci-Fi',
    posterUrl:
      'https://images.unsplash.com/photo-1440404653325-ab127d49abc1?w=800',
  },
};

export const LongTitle: Story = {
  args: {
    ...Default.args,
    title:
      'Una película con un título absurdamente largo para probar el diseño',
  },
};