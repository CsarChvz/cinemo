import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ClasificationFilter } from './ClasificationFilter';
import { MovieClasification } from '@/interfaces/movie.interface';

const meta: Meta<typeof ClasificationFilter> = {
  title: 'Components/Movies/Filters/ClasificationFilter',
  component: ClasificationFilter,
  tags: ['autodocs'],
};

export default meta;

export const Interactive: StoryObj<typeof ClasificationFilter> = {
  render: () => {
    const [selected, setSelected] = useState<MovieClasification[]>([]);
    return (
      <div style={{ padding: '2rem' }}>
        <ClasificationFilter value={selected} onApply={setSelected} />
        <div style={{ marginTop: '1rem' }}>
          <strong>Seleccionados:</strong> {selected.join(', ') || 'Ninguno'}
        </div>
      </div>
    );
  },
};
