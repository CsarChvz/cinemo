import { HeaderProps } from "@/interfaces/components.interface";
import { Group, Burger, Text } from "@mantine/core";


export function AdminHeader({onToggle, opened}: HeaderProps) {
  return (
    <Group h="100%" px="md">
      <Burger opened={opened} onClick={onToggle} hiddenFrom="sm" size="sm" />
      <Text fw={900} size="xl" c="blue.6" style={{ letterSpacing: '1px' }}>
        CINEMO{' '}
        <Text span fw={300} c="dimmed">
          ADMIN
        </Text>
      </Text>
    </Group>
  );
}