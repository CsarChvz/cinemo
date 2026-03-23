import type { Meta, StoryObj } from '@storybook/react';
import { SearchBar } from './SearchBar';

const meta: Meta<typeof SearchBar> = {
  title: 'Components/Movies/SearchBar',
  component: SearchBar,
  tags: ['autodocs'],
  argTypes: {
    onChange: { action: 'text changed' },
    onSearch: { action: 'search button clicked' },
  },
};

export default meta;
type Story = StoryObj<typeof SearchBar>;

export const Default: Story = {
  args: {
    placeholder: 'Buscar películas...',
    description: 'Escribe el nombre de la película que deseas filtrar',
  },
};

export const WithValue: Story = {
  args: {
    value: 'Interstellar',
  },
};

export const WithError: Story = {
  args: {
    error: 'No se encontraron resultados para esta búsqueda',
  },
};

export const Disabled: Story = {
  args: {
    disabled: true,
    placeholder: 'Búsqueda deshabilitada temporalmente',
  },
};
