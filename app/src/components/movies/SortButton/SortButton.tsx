import { SortOrder } from '@/interfaces/filter.interface';
import { ActionIcon, Tooltip } from '@mantine/core';
import {
  IconSortDescending,
  IconSortAscending,
  IconArrowsSort,
} from '@tabler/icons-react';


export interface SortButtonProps {
  value: SortOrder;
  onChange: (value: SortOrder) => void;
}

export function SortButton({ value, onChange }: SortButtonProps) {
  // Lógica para el ciclo: default -> asc -> desc -> default
  const handleSort = () => {
    if (value ===  SortOrder.DEFAULT) onChange(SortOrder.ASCENDING);
    else if (value === SortOrder.ASCENDING) onChange(SortOrder.DESCENDING);
    else onChange(SortOrder.DEFAULT);
  };

  const config = {
    default: {
      icon: <IconArrowsSort size={18} />,
      color: 'gray',
      label: 'Orden predeterminado',
    },
    asc: {
      icon: <IconSortAscending size={18} />,
      color: 'blue',
      label: 'Orden ascendente',
    },
    desc: {
      icon: <IconSortDescending size={18} />,
      color: 'blue',
      label: 'Orden descendente',
    },
  };

  const current = config[value];

  return (
    <Tooltip label={current.label} withArrow>
      <ActionIcon
        variant={value === 'default' ? 'default' : 'light'}
        color={current.color}
        onClick={handleSort}
        size="lg"
        radius="md"
        aria-label={current.label}
      >
        {current.icon}
      </ActionIcon>
    </Tooltip>
  );
}
