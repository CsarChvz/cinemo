'use client';

import { useEffect } from 'react';
import { useHotkeys, useDisclosure, useFloatingWindow } from '@mantine/hooks';
import { notifications } from '@mantine/notifications';
import {
  Paper,
  Group,
  ActionIcon,
  Text,
  Badge,
  Tooltip,
  rem,
  Portal,
  Stack,
  Divider,
} from '@mantine/core';
import {
  IconCode,
  IconSettingsAutomation,
  IconGripVertical,
} from '@tabler/icons-react';

export interface ImplementationDevToolsProps {
  isManual: boolean;
  onChange: (value: boolean) => void;
}

export function ImplementationDevTools({
  isManual,
  onChange,
}: ImplementationDevToolsProps) {
  // 1. Hook para la ventana flotante (Posición inicial: bottom-left)
  const floatingWindow = useFloatingWindow({
    constrainToViewport: true,
    constrainOffset: 20,
    excludeDragHandleSelector: 'button', // Los botones no disparan el drag
    initialPosition: { bottom: 20, left: 20 },
  });

  const toggleMode = () => {
    const nextValue = !isManual;
    localStorage.setItem('manual-implementation', JSON.stringify(nextValue));

    notifications.show({
      title: nextValue ? 'Modo Manual Activo 🛠️' : 'Modo Automático Activo ✨',
      message: nextValue
        ? 'Usando algoritmos aprendidos en clase "Estructura De Datos - Prof. Irving Mendoza".'
        : 'Usando métodos nativos de JS.',
      color: nextValue ? 'orange' : 'blue',
      icon: nextValue ? (
        <IconCode size={18} />
      ) : (
        <IconSettingsAutomation size={18} />
      ),
      autoClose: 2000,
    });

    onChange(nextValue);
  };

  // Shortcut mod + M
  useHotkeys([['mod + M', toggleMode]]);

  return (
    <Portal>
      <Paper
        ref={floatingWindow.ref}
        withBorder
        shadow={floatingWindow.isDragging ? 'xl' : 'md'}
        p="xs"
        radius="md"
        pos="fixed"
        style={{
          zIndex: 400,
          cursor: 'grab',
          transition: 'box-shadow 150ms ease, transform 100ms ease',
          backgroundColor: 'var(--mantine-color-body)',
          transform: floatingWindow.isDragging ? 'scale(1.02)' : 'scale(1)',
          touchAction: 'none', // Importante para móviles
        }}
      >
        <Group gap="xs" wrap="nowrap">
          {/* Manija para arrastrar */}
          <IconGripVertical
            size={18}
            style={{ color: 'var(--mantine-color-gray-5)' }}
          />

          <Divider orientation="vertical" />

          <Stack gap={2}>
            <Text
              size="10px"
              fw={800}
              c="dimmed"
              style={{ letterSpacing: 0.5 }}
            >
              ENGINE
            </Text>
            <Badge
              variant="dot"
              size="sm"
              color={isManual ? 'orange' : 'blue'}
              styles={{ label: { textTransform: 'none' } }}
            >
              {isManual ? 'Manual' : 'Auto'}
            </Badge>
          </Stack>

          <Tooltip label="Cambiar modo (Ctrl + M)" withArrow position="top">
            <ActionIcon
              onClick={toggleMode}
              variant="light"
              color={isManual ? 'orange' : 'blue'}
              size="lg"
              radius="md"
            >
              {isManual ? (
                <IconCode size={20} />
              ) : (
                <IconSettingsAutomation size={20} />
              )}
            </ActionIcon>
          </Tooltip>
        </Group>
      </Paper>
    </Portal>
  );
}
