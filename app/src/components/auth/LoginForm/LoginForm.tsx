'use client';

import { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Divider,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import classes from '../AuthForms.module.css';
import Link from 'next/link';
import { signIn } from 'next-auth/react';
import { IconAlertCircle, IconUser } from '@tabler/icons-react';
import { useRouter } from 'next/navigation';

export function LoginForm() {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    // 🔥 Cambiado de email a username
    initialValues: { username: '', password: '' },
    validate: {
      username: (v) =>
        v.trim().length < 3 ? 'Nombre de usuario muy corto' : null,
      password: (v) => (v.length < 6 ? 'Mínimo 6 caracteres' : null),
    },
  });

  const handleLogin = async (values: typeof form.values) => {
    setLoading(true);
    setError(null);

    try {
      // 🔥 Enviamos 'username' explícitamente a NextAuth
      const result = await signIn('credentials', {
        username: values.username,
        password: values.password,
        redirect: false,
      });

      if (result?.error) {
        setError('Usuario o contraseña incorrectos.');
        setLoading(false);
      } else {
        router.push('/');
        router.refresh();
      }
    } catch (err) {
      setError('Ocurrió un error inesperado.');
      setLoading(false);
    }
  };

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

        {error && (
          <Alert
            variant="light"
            color="red"
            title="Error de acceso"
            icon={<IconAlertCircle />}
          >
            {error}
          </Alert>
        )}

        <form onSubmit={form.onSubmit(handleLogin)}>
          <Stack gap="md">
            <TextInput
              label="Nombre de usuario"
              placeholder="Tu usuario"
              variant="filled"
              leftSection={<IconUser size={16} />}
              {...form.getInputProps('username')}
              disabled={loading}
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
              loading={loading}
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
