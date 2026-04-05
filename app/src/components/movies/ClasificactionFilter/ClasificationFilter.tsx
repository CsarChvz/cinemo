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
import { MovieClassification } from '@/schemas/movie';
export interface classificationFilterProps {
  value: MovieClassification[];
  onApply: (values: MovieClassification[]) => void;
}

export function ClassificationFilter({
  value,
  onApply,
}: classificationFilterProps) {
  const [opened, setOpened] = useState(false);
  const [tempSelected, setTempSelected] =
    useState<MovieClassification[]>(value);

  const handleToggle = (classification: MovieClassification) => {
    setTempSelected((current) =>
      current.includes(classification)
        ? current.filter((g) => g !== classification)
        : [...current, classification]
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
            {Object.values(MovieClassification).map((classification) => (
              <Checkbox
                key={classification}
                label={classification}
                checked={tempSelected.includes(classification)}
                onChange={() => handleToggle(classification)}
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
