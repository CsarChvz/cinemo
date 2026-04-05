import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { GenreFilter } from './GenreFilter';
import { MovieGenre } from '@/schemas/movie';

const meta: Meta<typeof GenreFilter> = {
  title: 'Components/Movies/Filters/GenreFilter',
  component: GenreFilter,
  tags: ['autodocs'],
};

export default meta;

export const Interactive: StoryObj<typeof GenreFilter> = {
  render: () => {
    const [selected, setSelected] = useState<MovieGenre[]>([]);
    return (
      <div style={{ padding: '2rem' }}>
        <GenreFilter value={selected} onApply={setSelected} />
        <div style={{ marginTop: '1rem' }}>
          <strong>Seleccionados:</strong> {selected.join(', ') || 'Ninguno'}
        </div>
      </div>
    );
  },
};
