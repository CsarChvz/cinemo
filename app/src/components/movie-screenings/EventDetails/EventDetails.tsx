import { Badge, Box, Button, Group, Stack, Text, ThemeIcon } from "@mantine/core";
import { ScheduleEventData } from "@mantine/schedule";
import { IconMovie, IconClock, IconArmchair } from "@tabler/icons-react";
import dayjs from "dayjs";

export function EventDetails({ event }: { event: ScheduleEventData }) {
  return (
    <Stack gap="xs">
      <Group justify="space-between" align="flex-start" wrap="nowrap">
        <Box style={{ flex: 1 }}>
          <Text fw={700} size="sm" lh={1.2} mb={4}>
            {event.title}
          </Text>
          <Badge color={event.color} variant="light" size="xs">
            Sala: {event.payload?.roomName}
          </Badge>
        </Box>
        <ThemeIcon variant="light" color={event.color} size="lg" radius="md">
          <IconMovie size={20} />
        </ThemeIcon>
      </Group>

      <Group gap="xl" mt="xs">
        <Stack gap={2}>
          <Text size="xs" c="dimmed" fw={500} lts={0.5}>
            HORARIO
          </Text>
          <Group gap={4}>
            <IconClock size={14} />
            <Text size="xs" fw={700}>
              {dayjs(event.start).format('h:mm A')} -{' '}
              {dayjs(event.end).format('h:mm A')}
            </Text>
          </Group>
        </Stack>

        <Stack gap={2}>
          <Text size="xs" c="dimmed" fw={500} lts={0.5}>
            DISPONIBLES
          </Text>
          <Group gap={4}>
            <IconArmchair size={14} />
            <Text size="xs" fw={700}>
              {event.payload?.tickets} asientos
            </Text>
          </Group>
        </Stack>
      </Group>

    </Stack>
  );
}
