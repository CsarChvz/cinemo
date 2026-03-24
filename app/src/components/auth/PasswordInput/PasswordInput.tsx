'use client';

import { Anchor, Group, PasswordInput as MantinePasswordInput, Text, Stack } from '@mantine/core';

interface ForgotPasswordInputProps {
  value?: string;
  onChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  error?: React.ReactNode;
}

export function PasswordInput({
  value,
  onChange,
  error,
}: ForgotPasswordInputProps) {
  return (
    <Stack gap={5}>
      <Group justify="space-between">
        <Text
          component="label"
          htmlFor="password-input"
          size="sm"
          fw={500}
          c="gray.3"
        >
          Contraseña
        </Text>

      </Group>

      <MantinePasswordInput
        id="password-input"
        placeholder="Tu contraseña"
        value={value}
        onChange={onChange}
        error={error}
        variant="filled"
        styles={{
          input: {
            backgroundColor: 'rgba(0, 0, 0, 0.3)',
            borderColor: 'rgba(255, 255, 255, 0.1)',
            color: 'white',
          },
        }}
      />
    </Stack>
  );
}
