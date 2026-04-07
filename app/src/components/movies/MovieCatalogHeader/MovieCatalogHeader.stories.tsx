import type { Meta, StoryObj } from '@storybook/react';
import { MovieCatalogHeader } from './MovieCatalogHeader';
import { MantineProvider, Container } from '@mantine/core';
import { MovieGenre, MovieClassification } from '@/schemas/movie';
import { SortOrder } from '@/interfaces/filter.interface';

const meta: Meta<typeof MovieCatalogHeader> = {
  title: 'Components/Movies/MovieCatalogHeader',
  component: MovieCatalogHeader,
  decorators: [
    (Story) => (
      <MantineProvider>
        <Container size="lg" py="xl">
          <Story />
        </Container>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof MovieCatalogHeader>;

export const Default: Story = {
  args: {
    search: '',
    sort: SortOrder.DESCENDING,
    genres: [],
    clasifications: [],
    onSearchChange: (val) => console.log('Buscando:', val),
    onSortChange: (sort) => console.log('Ordenando por:', sort),
    onGenresChange: (g) => console.log('Géneros seleccionados:', g),
    onClasificationsChange: (c) => console.log('Clasificaciones:', c),
  },
};

export const ConFiltrosActivos: Story = {
  args: {
    ...Default.args,
    search: 'Spider-Man',
    genres: [MovieGenre.ACCION, MovieGenre.ANIMACION],
    clasifications: [MovieClassification.A],
  },
};

export const VistaMobile: Story = {
  args: {
    ...Default.args,
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
  },
};
