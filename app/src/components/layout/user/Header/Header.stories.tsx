import type { Meta, StoryObj } from '@storybook/nextjs';
import { Header } from './Header';
import { useDisclosure } from '@mantine/hooks';


const meta: Meta<typeof Header> = {
  title: 'Components/MainLayout/Header',
  component: Header,
  parameters: {
    layout: 'fullscreen',
  },
};


export default meta;

type Story = StoryObj<typeof Header>;

export const Desktop: Story = {
    args: {
        opened: false,
        onToggle: () => console.log("Toggle Clicked")
    }
}


export const MobileOpened: Story = {
  args: {
    opened: true,
    onToggle: () => console.log('Toggle clicked'),
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1', 
    },
  },
};


export const Interactive: Story = {
    render: (args) => {
      // eslint-disable-next-line react-hooks/rules-of-hooks
      const [opened, { toggle }] = useDisclosure(false);
      return <Header {...args} opened={opened} onToggle={toggle} />;
    }
}