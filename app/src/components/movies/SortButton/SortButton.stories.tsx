import type { Meta, StoryObj } from '@storybook/react';
import { SortButton } from './SortButton';
import { useState } from 'react';
import { SortOrder } from '@/interfaces/filter.interface';

const meta: Meta<typeof SortButton> = {
  title: 'Components/Movies/SortButton',
  component: SortButton,
  tags: ['autodocs'],
};

export default meta;
type Story = StoryObj<typeof SortButton>;

export const Interactive: Story = {
  render: () => {
    const [sort, setSort] = useState<SortOrder>(SortOrder.DEFAULT);
    return <SortButton value={sort} onChange={setSort} />;
  },
};

export const Default: Story = {
  args: {
    value: SortOrder.DEFAULT,
  },
};

export const Ascending: Story = {
  args: {
    value: SortOrder.ASCENDING,
  },
};

export const Descending: Story = {
  args: {
    value: SortOrder.DESCENDING,
  },
};
