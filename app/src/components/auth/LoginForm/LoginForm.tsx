'use client';

import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Divider,
  Center,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordInput } from '../PasswordInput/PasswordInput';

export function LoginForm() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
      password: (v) => (v.length < 6 ? 'Mínimo 6 caracteres' : null),
    },
  });

  return (
    <Paper
      p={40}
      radius="xl"
      withBorder
      style={{
        backgroundColor: 'rgba(255, 255, 255, 0.03)',
        backdropFilter: 'blur(16px)',
        borderColor: 'rgba(255, 255, 255, 0.1)',
        width: '100%',
        maxWidth: 420,
      }}
    >
      <Stack gap="xl">
        <Stack gap={5} ta="center">
          <Title order={2} c="white" fw={900} lts={1}>
            Bienvenido
          </Title>
          <Text c="dimmed" size="sm">
            Ingresa a tu cuenta de Cinemo
          </Text>
        </Stack>

        <form onSubmit={form.onSubmit((v) => console.log(v))}>
          <Stack gap="md">
            <TextInput
              label={
                <Text c="gray.3" size="sm" fw={500}>
                  Correo electrónico
                </Text>
              }
              placeholder="tu@email.com"
              variant="filled"
              {...form.getInputProps('email')}
              styles={{
                input: {
                  backgroundColor: 'rgba(0, 0, 0, 0.3)',
                  borderColor: 'rgba(255, 255, 255, 0.1)',
                  color: 'white',
                },
              }}
            />

            <PasswordInput {...form.getInputProps('password')} />

            <Button
              type="submit"
              fullWidth
              size="md"
              mt="xl"
              variant="gradient"
              gradient={{ from: 'blue.6', to: 'cyan.6', deg: 90 }}
              radius="md"
            >
              Iniciar Sesión
            </Button>
          </Stack>
        </form>

        <Divider label="O continúa con" labelPosition="center" c="gray.7" />

        <Text ta="center" size="sm" c="gray.5">
          ¿No tienes cuenta?{' '}
          <Text
            component="span"
            c="blue.4"
            fw={700}
            style={{ cursor: 'pointer' }}
          >
            Regístrate
          </Text>
        </Text>
      </Stack>
    </Paper>
  );
}
