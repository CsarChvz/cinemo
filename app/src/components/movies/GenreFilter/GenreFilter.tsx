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
import { MovieGenre } from '@/schemas/movie';

export interface GenreFilterProps {
  value: MovieGenre[];
  onApply: (values: MovieGenre[]) => void;
}

export function GenreFilter({ value, onApply }: GenreFilterProps) {
  const [opened, setOpened] = useState(false);
  const [tempSelected, setTempSelected] = useState<MovieGenre[]>(value);

  const handleToggle = (genre: MovieGenre) => {
    setTempSelected((current) =>
      current.includes(genre)
        ? current.filter((g) => g !== genre)
        : [...current, genre]
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
          Géneros {value.length > 0 && `(${value.length})`}
        </Button>
      </Popover.Target>

      <Popover.Dropdown p="xs">
        <Text fw={700} fz="sm" mb="xs">
          Seleccionar Géneros
        </Text>
        <ScrollArea.Autosize mah={250} type="auto">
          <Stack gap="xs">
            {Object.values(MovieGenre).map((genre) => (
              <Checkbox
                key={genre}
                label={genre}
                checked={tempSelected.includes(genre)}
                onChange={() => handleToggle(genre)}
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
