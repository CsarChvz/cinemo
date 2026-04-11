'use client';

import { useState } from 'react';
import {
  TextInput,
  Button,
  Paper,
  Title,
  Text,
  Stack,
  Alert,
} from '@mantine/core';
import { useForm } from '@mantine/form';
import { PasswordInput } from '../PasswordInput/PasswordInput';
import Link from 'next/link';
import classes from '../AuthForms.module.css';
import {
  IconAlertCircle,
  IconUser,
  IconAt,
  IconSignature,
} from '@tabler/icons-react';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { api } from '@/trpc-folder/trpc-adaptadores/react';

export function RegisterForm() {
  const router = useRouter();
  const [error, setError] = useState<string | null>(null);

  const form = useForm({
    initialValues: {
      name: '',
      username: '',
      email: '',
      password: '',
    },
    validate: {
      name: (v) => (v.trim().length < 3 ? 'Nombre muy corto' : null),
      username: (v) => (v.trim().length < 3 ? 'Username muy corto' : null),
      email: (v) => (/^\S+@\S+$/.test(v) ? null : 'Email inválido'),
      password: (v) => (v.length < 6 ? 'Mínimo 6 caracteres' : null),
    },
  });

  // Usamos la mutación de tRPC en lugar de fetch manual
  const registerMutation = api.auth.register.useMutation({
    onSuccess: async (_data, variables) => {
      // Si el registro en Java fue exitoso, hacemos login automático en NextAuth
      const loginResult = await signIn('credentials', {
        username: variables.username,
        password: variables.password,
        redirect: false,
      });

      if (loginResult?.error) {
        // Si falla el auto-login (raro, pero posible), mandamos a login manual
        router.push('/login');
      } else {
        router.push('/');
        router.refresh();
      }
    },
    onError: (err) => {
      setError(err.message || 'Error al crear la cuenta');
    },
  });

  const handleSubmit = (values: typeof form.values) => {
    setError(null);
    // Ejecutamos la mutación pasando los valores y el rol por defecto
    registerMutation.mutate({
      ...values,
      role: 'USER',
    });
  };

  const inputStyles = {
    input: classes.inputField,
    label: classes.labelCustom,
  };

  return (
    <Paper
      p={40}
      radius="xl"
      className={classes.glassContainer}
      style={{ maxWidth: 500, width: '100%' }}
    >
      <Stack gap="xl">
        <Stack gap={5} ta="center">
          <Title order={2} className={classes.title}>
            Crea tu cuenta
          </Title>
          <Text c="dimmed" size="sm">
            Únete a la comunidad de Cinemo hoy mismo
          </Text>
        </Stack>

        {error && (
          <Alert
            variant="light"
            color="red"
            title="Ups!"
            icon={<IconAlertCircle />}
          >
            {error}
          </Alert>
        )}

        {/* Usamos form.onSubmit de Mantine con nuestra función */}
        <form onSubmit={form.onSubmit(handleSubmit)}>
          <Stack gap="md">
            <TextInput
              label="Nombre completo"
              placeholder="Ej. César Chávez"
              variant="filled"
              leftSection={<IconSignature size={16} />}
              classNames={inputStyles}
              disabled={registerMutation.isPending}
              {...form.getInputProps('name')}
            />

            <TextInput
              label="Nombre de usuario"
              placeholder="TuUsuario123"
              variant="filled"
              leftSection={<IconUser size={16} />}
              classNames={inputStyles}
              disabled={registerMutation.isPending}
              {...form.getInputProps('username')}
            />

            <TextInput
              label="Correo electrónico"
              placeholder="tu@email.com"
              variant="filled"
              leftSection={<IconAt size={16} />}
              classNames={inputStyles}
              disabled={registerMutation.isPending}
              {...form.getInputProps('email')}
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
              loading={registerMutation.isPending}
            >
              Crear cuenta
            </Button>
          </Stack>
        </form>

        <Text ta="center" size="sm" c="gray.5">
          ¿Ya tienes una cuenta?{' '}
          <Text
            component={Link}
            href="/login"
            c="blue.4"
            fw={700}
            style={{ textDecoration: 'none' }}
          >
            Inicia sesión
          </Text>
        </Text>
      </Stack>
    </Paper>
  );
}
