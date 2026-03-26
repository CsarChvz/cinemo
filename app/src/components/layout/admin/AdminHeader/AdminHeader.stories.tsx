import type { Meta, StoryObj } from '@storybook/react';
import { AdminHeader } from './AdminHeader';
import { MantineProvider } from '@mantine/core';

const meta: Meta<typeof AdminHeader> = {
  title: 'Components/Common/Admin/AdminHeader',
  component: AdminHeader,
  decorators: [
    (Story) => (
      <MantineProvider>
        <div style={{ height: '60px', borderBottom: '1px solid #eee' }}>
          <Story />
        </div>
      </MantineProvider>
    ),
  ],
};

export default meta;
type Story = StoryObj<typeof AdminHeader>;

export const Desktop: Story = {
  args: {
    opened: false,
    onToggle: () => console.log('Toggle clicked'),
  },
};

export const MobileOpened: Story = {
  args: {
    opened: true,
    onToggle: () => console.log('Toggle clicked'),
  },
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
