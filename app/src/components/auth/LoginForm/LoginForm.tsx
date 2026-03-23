'use client';

import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Divider,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import classes from '../AuthForms.module.css'; // Importamos el CSS
import Link from 'next/link';

export function LoginForm() {
  const form = useForm({
    initialValues: { email: '', password: '' },
    validate: {
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
      password: (v) => (v.length < 6 ? 'Mínimo 6 caracteres' : null),
    },
  });

  return (
    <Paper p={40} radius="xl" className={classes.glassContainer}>
      <Stack gap="xl">
        <Stack gap={5} ta="center">
          <Title order={2} className={classes.title}>
            Bienvenido
          </Title>
          <Text c="dimmed" size="sm">
            Ingresa a tu cuenta de Cinemo
          </Text>
        </Stack>

        <form onSubmit={form.onSubmit((v) => console.log(v))}>
          <Stack gap="md">
            <TextInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              variant="filled"
              {...form.getInputProps('email')}
              classNames={{
                input: classes.inputField,
                label: classes.labelCustom,
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
            component={Link}
            href="/register"
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
