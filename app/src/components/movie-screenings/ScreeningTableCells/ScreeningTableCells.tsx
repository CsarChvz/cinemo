import { Group, Stack, Text, ActionIcon } from '@mantine/core';
import {
  IconCalendar,
  IconClock,
  IconEye,
  IconEdit,
  IconTrash,
} from '@tabler/icons-react';
import dayjs from 'dayjs';

export const DateTimeCell = ({ date }: { date: Date | string }) => (
  <Stack gap={0}>
    <Group gap={4} wrap="nowrap">
      <IconCalendar size={14} color="gray" />
      <Text size="sm">{dayjs(date).format('DD/MM/YYYY')}</Text>
    </Group>
    <Group gap={4} wrap="nowrap">
      <IconClock size={14} color="blue" />
      <Text size="xs" c="dimmed" fw={700}>
        {dayjs(date).format('hh:mm A')}
      </Text>
    </Group>
  </Stack>
);

export const ActionButtons = () => (
  <Group gap={4} justify="right" wrap="nowrap">
    <ActionIcon size="sm" variant="subtle" color="green">
      <IconEye size={16} />
    </ActionIcon>
    <ActionIcon size="sm" variant="subtle" color="blue">
      <IconEdit size={16} />
    </ActionIcon>
    <ActionIcon size="sm" variant="subtle" color="red">
      <IconTrash size={16} />
    </ActionIcon>
  </Group>
);
