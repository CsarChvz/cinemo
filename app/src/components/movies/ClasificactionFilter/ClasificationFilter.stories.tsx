import type { Meta, StoryObj } from '@storybook/react';
import { useState } from 'react';
import { ClassificationFilter } from './ClasificationFilter';
import { MovieClassification } from '@/schemas/movie';

const meta: Meta<typeof ClassificationFilter> = {
  title: 'Components/Movies/Filters/ClasificationFilter',
  component: ClassificationFilter,
  tags: ['autodocs'],
};

export default meta;

export const Interactive: StoryObj<typeof ClassificationFilter> = {
  render: () => {
    const [selected, setSelected] = useState<MovieClassification[]>([]);
    return (
      <div style={{ padding: '2rem' }}>
        <ClassificationFilter value={selected} onApply={setSelected} />
        <div style={{ marginTop: '1rem' }}>
          <strong>Seleccionados:</strong> {selected.join(', ') || 'Ninguno'}
        </div>
      </div>
    );
  },
};
