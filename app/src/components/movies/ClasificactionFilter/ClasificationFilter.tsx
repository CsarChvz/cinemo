import { useState } from 'react';
import {
  Popover,
  Button,
  ActionIcon,
  Checkbox,
  Stack,
  Group,
  Text,
  ScrollArea,
} from '@mantine/core';
import { IconFilter, IconCheck, IconX } from '@tabler/icons-react';
import { MovieClasification } from '@/interfaces/movie.interface';
export interface ClasificationFilterProps {
  value: MovieClasification[];
  onApply: (values: MovieClasification[]) => void;
}

export function ClasificationFilter({
  value,
  onApply,
}: ClasificationFilterProps) {
  const [opened, setOpened] = useState(false);
  const [tempSelected, setTempSelected] = useState<MovieClasification[]>(value);

  const handleToggle = (clasification: MovieClasification) => {
    setTempSelected((current) =>
      current.includes(clasification)
        ? current.filter((g) => g !== clasification)
        : [...current, clasification]
    );
  };

  const handleApply = () => {
    onApply(tempSelected);
    setOpened(false);
  };

  const handleClear = () => {
    setTempSelected([]);
    onApply([]);
    setOpened(false);
  };

  return (
    <Popover
      opened={opened}
      onChange={setOpened}
      width={250}
      position="bottom-start"
      withArrow
      shadow="md"
    >
      <Popover.Target>
        <Button
          variant="default"
          onClick={() => setOpened((o) => !o)}
          leftSection={<IconFilter size={16} />}
          color={value.length > 0 ? 'blue' : 'gray'}
        >
          Clasificaciones {value.length > 0 && `(${value.length})`}
        </Button>
      </Popover.Target>

      <Popover.Dropdown p="xs">
        <Text fw={700} fz="sm" mb="xs">
          Seleccionar Clasificaciones
        </Text>
        <ScrollArea.Autosize mah={250} type="auto">
          <Stack gap="xs">
            {Object.values(MovieClasification).map((clasification) => (
              <Checkbox
                key={clasification}
                label={clasification}
                checked={tempSelected.includes(clasification)}
                onChange={() => handleToggle(clasification)}
              />
            ))}
          </Stack>
        </ScrollArea.Autosize>

        <Group justify="space-between" mt="md">
          <Button
            variant="subtle"
            color="red"
            size="xs"
            onClick={handleClear}
            leftSection={<IconX size={14} />}
          >
            Limpiar
          </Button>
          <Button
            size="xs"
            onClick={handleApply}
            leftSection={<IconCheck size={14} />}
          >
            Aplicar
          </Button>
        </Group>
      </Popover.Dropdown>
    </Popover>
  );
}
