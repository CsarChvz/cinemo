import { IconArrowRight, IconSearch } from '@tabler/icons-react';
import { ActionIcon, TextInput, TextInputProps } from '@mantine/core';


export interface SearchBarProps extends TextInputProps {
  onSearch?: () => void; 
}

export function SearchBar({ onSearch, ...others }: SearchBarProps) {
  return (
    <TextInput
      radius="xl"
      size="md"
      placeholder="Buscar películas..."
      rightSectionWidth={42}
      leftSection={<IconSearch size={18} stroke={1.5} />}
      {...others}
    />
  );
}
